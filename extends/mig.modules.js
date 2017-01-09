(function() {
"use strict"

    
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
