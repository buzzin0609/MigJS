(function() {
	"use strict"


	//full list of dependencies
	var depsList = {};

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

	/**
	* Simple dependency injection function
	* @param {String} name Main name of the module to add to dependency list
	* @param {String} deps Space separated list of dependencies
	* @param {Function} cb the callback function to pass the dependencies
	*/
	function _inject(name, deps, cb) {
		var depArray = deps.split(' ');
		var len = depArray.length;
		var i = 0;
		var promises = [];

		//loop over list of dependencies and build the injection list
		for (; i < len; i++) {
			promises.push(
				//handleInjection will always return a promise if the module is already defined or not. Once resolved, it will add to injection array
				_handleInjection(depArray[i])
			);
		}

		//once all dependencies have been resolved, pass them to the callback
		Promise.all(promises).then(function(toInject) {
			depsList[name] = cb.apply(cb, toInject);
		});
	}

	/**
	* Helper function to resolve the dependency injection
	* @param {String} dep the name of the dependency
	*/
	function _handleInjection(dep) {
		if (depsList[dep]) {
			return Promise.resolve(depsList[dep]);
		}

		return new Promise(function(resolve, reject) {
			_await(dep, resolve, reject);
		});
	}

	/**
	 * Function to asynchronously check for dependency.
	 * Uses setTimout to recursively call itself every 250 ms until dependency is found of the checkCount reaches maximum (currently 50 checks which should be around 12.5 seconds)
	 * @param  {String} dep        dependency name
	 * @param  {Function} resolve    Promise resolve function for when dependency is found
	 * @param  {Function} reject     Promise reject function
	 * @param  {Number} checkCount	current amount of ticks
	 */
	function _await(dep, resolve, reject, checkCount) {
		checkCount = checkCount || 0;

		if (depsList[dep]) {
			resolve(depsList[dep]);
		} else if (checkCount > 50) {
			reject(new Error(['Dependency: ', dep, ' not found. Check for circular dependencies and try again.'].join('')));
		} else {
			++checkCount;
			setTimeout(_await.bind(_await, dep, resolve, reject, checkCount), 50);
		}
	}


}());
