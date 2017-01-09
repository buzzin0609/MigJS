/**
* Ajax function. Similar to jQuery but with fewer options.
* @param {Object} args - object containing all the arguments for the request
*     @param {String} url - url for the ajax request
*     @param {String} type - type of request - default = GET
*     @param {Function} beforeSend - function to fire before the ajax request is sent
*     @param {Function} success - callback for after the request
*     @param {Function} error - callback for when an error occurs
*     @param {Object} data - data to pass with the request
*/
(function() {
	'use strict';

	function Ajax(args) {
		args = args || {};
		var self = this;
		this.url = args.url;
		this.type = args.type || 'GET';
		this.beforeSend = args.beforeSend || false;
		this.success = args.success || false;
		this.error = args.error || false;
		this.data = args.data || false;
		//serialise the data object if it exists into a query string
		this.queryString = '';
		if (this.type !== 'POST' && this.data) {
			this.queryString = buildQueryString(this.queryString, this.data);
		}

		this.request = new XMLHttpRequest();
		var promise;
		if (this.type === 'GET') {
			promise = this.get();
		} else {
			promise = this.post();
		}
		console.log('promise', promise);
		return promise;
	}

	function buildQueryString(queryString, data) {
		var data;
		queryString = '?';
		for (query in data) {
			if (data.hasOwnProperty(query)) {
				queryString += query + '=' + data[query] + '&';
			}
		}
		queryString[queryString.length-1] = '';
		return queryString;
	}

	var ap = Ajax.prototype;

	ap.get = function() {
		var request = this.request;
		var url = this.url;
		var queryString = this.queryString;

		request.open('GET', url + queryString, true);
		request.setRequestHeader("X-Requested-With", "XMLHttpRequest");

		var promise = this.handleRequest(request);
		request.send();
		return promise;
	};

	ap.post = function() {
		var request = this.request;
		var url = this.url;

		request.open('POST', url, true);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

		var promise = this.handleRequest(request);
		//adjust to include form data etc
		request.send(queryString);
		return promise;
	}

	ap.handleRequest = function(request) {
		var success = this.success;
		var error = this.error;
		var beforeSend = this.beforeSend;
		var self = this;

		if (beforeSend) {
			beforeSend();
		}
		return new Promise(function(resolve, reject) {
			request.onload = function() {
				if (request.status >= 200 && request.status < 400) {
					// Success!
					var data = request.responseText;
					if (success) {
						success(data);
						resolve(data);
					}
					Mig.on.trigger('ajaxReady');
				} else {
					// We reached our target server, but it returned an error
					reject(data);
				}
			};

			request.onerror = function(e) {
				if (error) {
					error(e);
				}
				reject(e);
			};
		});


	};

	Mig.extend('ajax', function(args) {
		return new Ajax(args);
	});

	Mig.extend('json', function(args) {
		var currentSuccess = args.success;
		args.success = function(data) {
			if (currentSuccess) {
				currentSuccess(JSON.parse(data));
			}
		}
		return new Ajax(args).then(function(data) {
			return JSON.parse(data);
		});
	});


}());
