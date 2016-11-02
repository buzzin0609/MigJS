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
Mig.extend('ajax', function(args) {

    args = args || {};

    var url = args.url;
    var type = args.type || 'GET';
    var beforeSend = args.beforeSend || false;
    var success = args.success || false;
    var error = args.error || false;
    var data = args.data || false;

	//serialise the data object if it exists into a query string
    var queryString = '?';
    if (type === 'POST') {
        queryString = '';
    }
    if (data) {
        for (var query in data) {
            if (data.hasOwnProperty(query)) {
                queryString += query + '=' + data[query] + '&';
            }
        }
    }

    var request = new XMLHttpRequest();
    if (type === 'GET') {
        request.open('GET', url + queryString, true);
        request.setRequestHeader("X-Requested-With", "XMLHttpRequest");

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                // Success!
                var data = request.responseText;
                if (success) {
                    success(data);
                }
                Mig.on.trigger('ajaxReady');
            } else {
                // We reached our target server, but it returned an error

            }
        };

        if (error) {
            request.onerror = function() {
                error();
            };
        }

        if (beforeSend) {
            beforeSend();
        }
        request.send();

    }

    if (type === 'POST') {
        request.open('POST', url, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.onload = function() {
            var data = request.responseText;
            if (success) {
                success(data);
            }
        };
        if (beforeSend) {
            beforeSend();
        }
        request.send(queryString);
    }


});
