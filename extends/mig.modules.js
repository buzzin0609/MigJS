(function() {
"use strict"

    //check for Promise support and add the polyfill if needed
    if (!window.Promise) {
        !function(e){function n(){}function t(e,n){return function(){e.apply(n,arguments)}}function o(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],s(e,this)}function i(e,n){for(;3===e._state;)e=e._value;return 0===e._state?void e._deferreds.push(n):(e._handled=!0,void o._immediateFn(function(){var t=1===e._state?n.onFulfilled:n.onRejected;if(null===t)return void(1===e._state?r:u)(n.promise,e._value);var o;try{o=t(e._value)}catch(i){return void u(n.promise,i)}r(n.promise,o)}))}function r(e,n){try{if(n===e)throw new TypeError("A promise cannot be resolved with itself.");if(n&&("object"==typeof n||"function"==typeof n)){var i=n.then;if(n instanceof o)return e._state=3,e._value=n,void f(e);if("function"==typeof i)return void s(t(i,n),e)}e._state=1,e._value=n,f(e)}catch(r){u(e,r)}}function u(e,n){e._state=2,e._value=n,f(e)}function f(e){2===e._state&&0===e._deferreds.length&&o._immediateFn(function(){e._handled||o._unhandledRejectionFn(e._value)});for(var n=0,t=e._deferreds.length;n<t;n++)i(e,e._deferreds[n]);e._deferreds=null}function c(e,n,t){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof n?n:null,this.promise=t}function s(e,n){var t=!1;try{e(function(e){t||(t=!0,r(n,e))},function(e){t||(t=!0,u(n,e))})}catch(o){if(t)return;t=!0,u(n,o)}}var a=setTimeout;o.prototype["catch"]=function(e){return this.then(null,e)},o.prototype.then=function(e,t){var o=new this.constructor(n);return i(this,new c(e,t,o)),o},o.all=function(e){var n=Array.prototype.slice.call(e);return new o(function(e,t){function o(r,u){try{if(u&&("object"==typeof u||"function"==typeof u)){var f=u.then;if("function"==typeof f)return void f.call(u,function(e){o(r,e)},t)}n[r]=u,0===--i&&e(n)}catch(c){t(c)}}if(0===n.length)return e([]);for(var i=n.length,r=0;r<n.length;r++)o(r,n[r])})},o.resolve=function(e){return e&&"object"==typeof e&&e.constructor===o?e:new o(function(n){n(e)})},o.reject=function(e){return new o(function(n,t){t(e)})},o.race=function(e){return new o(function(n,t){for(var o=0,i=e.length;o<i;o++)e[o].then(n,t)})},o._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){a(e,0)},o._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},o._setImmediateFn=function(e){o._immediateFn=e},o._setUnhandledRejectionFn=function(e){o._unhandledRejectionFn=e},"undefined"!=typeof module&&module.exports?module.exports=o:e.Promise||(e.Promise=o)}(this);
    }

    //full list of dependencies
    var depsList = {};

    /**
     * Helper function to resolve the dependency injection
     * @param {String} dep the name of the dependency
     */
    function _handleInjection(dep) {
        var promise;

        if (depsList[dep]) {
            promise = Promise.resolve(depsList[dep]);
        } else {
            promise = new Promise(function(resolve, reject) {
                _await(dep, resolve, reject);
            });
        }

        return promise;
    }

    function _await(dep, resolve, reject, checkCount) {
        checkCount = checkCount || 0;

        if (depsList[dep]) {
            resolve(depsList[dep]);
        } else if (checkCount > 50) {
            reject(new Error(['Dependency: ', dep, ' not found. Check for circular dependencies and try again.'].join('')));
        } else {
            ++checkCount;
            setTimeout(_await.bind(_await, dep, resolve, reject, checkCount), 250);
        }
    }

    /**
     * Simple dependency injection function
     * @param {String} name Main name of the module to add to dependency list
     * @param {String} deps Space separated list of dependencies
     * @param {Function} cb the callback function to pass the dependencies
     */
    function _inject(name, deps, cb) {
        var depArray = deps.split(' ');
        var len = depArray.length;
        var toInject = [];
        var promises = [];

        //loop over list of dependencies and build the injection list
        for (var i = 0; i < len; i++) {
            promises.push(
                //handleInjection will always return a promise if the module is already defined or not. Once resolve, it will add to injection array
                _handleInjection(depArray[i]).then(function(fn) {
                    toInject.push(fn);
                })
            );
        }

        //once all dependencies have been resolved, pass them to the callback
        Promise.all(promises).then(function() {
            depsList[name] = cb.apply(cb, toInject);
        });
    }

    /**
     * Main public function to add new modules and inject dependencies
     * @param {String} name
     */
    Mig.extend('module', function(name, deps, cb) {
        if (typeof deps === 'function') {
            cb = deps;
            deps = false;
        }

        if (deps) {
            _inject(name, deps, cb);
        } else {
            depsList[name] = cb();
        }
    });

}());
