(function() {
 'use strict';

	 /**
	 * Simple wrapper function to append children elements to passed element/dom selector
	 * @param {String|DOMElement|NodeList} a CSS selector string or a single or multiple DOM elements
	 * @param {Object} componenet a premade component made of dom elements
	 */
	Mig.extend('render', function(component, elOrSelector) {
		var els = m(elOrSelector);

		els.forEach(function(el) {
			el.appendChild(component);
		});
	});
 }());
