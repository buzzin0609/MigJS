/**
* Utility to create a DOM element and add chilren elements
* You can have multiple nested calls to the create function from within the children arrays
* @param {String} tag The element tag e.g. h1, div etc
* @param {Object} attrs All the attributes to apply to the tag
* @param {Array} children A mixed array of Strings and elements to add as children
*
* Usage:
*
* var el = Mig.create('h1', { class: 'my-class' }, ['can have plain text', ' mixed text and <span>html</span>', Mig.create('span', {}, ['or another Mig.create instance'])]);
* document.body.appendChild(el);
*/
(function() {
	'use strict';


	Mig.extend('create', function(tag, attrs, children) {
		var el = document.createElement(tag);

		if (attrs && attrs instanceof Array) {
			children = attrs;
			attrs = {};
		} else {
			attrs = attrs || {};
			children = children || [];
		}

		var attr;
		for (attr in attrs) {
			if (attr !== 'tag' && attrs.hasOwnProperty(attr)) {
				el.setAttribute(attr, attrs[attr])
			}
		}

		if (children.length) {
			/**
			* Children array can have a mix of strings and javascript DOM elements. It looks for the string and uses the more optimised insertAdjacentHTML or simple appends the child to the element.
			*/

			children.forEach(function(child) {
				if (typeof child === 'string') {
					el.insertAdjacentHTML('beforeend', child);
				} else {
					el.appendChild(child);
				}
			});
		}
		return el;
	});

	/**
	 * Simple React like view rendering system
	 * Register your dynamic elements with Mig.watch and update with Mig.update using the string name identifier
	 * @type {Object}
	 */
	var observables = {};

	Mig.extend('watch', function(name, attrs, data) {
		if (observables[name]) {
			throw new TypeError('[Mig.watch] cannot create duplicate of -'+name+'- observable. Use Mig.update(\''+name+'\') if you want to change something on this element or use a unique identifier to create a new one');
		}
		return _createObservable(name, attrs, data);
	});

	Mig.extend('update', function(name, attrs, data) {
		if (typeof attrs === 'string') {
			data = attrs;
			attrs = false;
		}

		var oldObservable = observables[name];
		if (oldObservable) {
			if (attrs) {
				var a;
				for (a in oldObservable.attrs) {
					if (!attrs.hasOwnProperty(a) && oldObservable.attrs.hasOwnProperty(a)) {
						attrs[a] = oldObservable.attrs[a];
					}
				}
			} else {
				attrs = oldObservable.attrs
			}

			if (!data) {
				data = oldObservable.data;
			}
		}

		m('[data-watch='+name+']').forEach(function(el) {
			var newEl = _createObservable(name, attrs, data);
			if (newEl.outerHTML !== el.outerHTML) {
				el.outerHTML = newEl.outerHTML;
				return newEl;
			} else {
				return el;
			}
		});
	});


	function _createObservable(name, attrs, data) {
		var key = 'data-watch';

		if (!attrs) {
			attrs = {};
		} else if (typeof attrs === 'string') {
			data = attrs;
			attrs = {};
		}

		if (data === undefined) {
			data = '';
		}

		var tag = attrs.tag && attrs.tag || 'span';
		attrs[key] = name;
		observables[name] = {
			attrs : attrs,
			data : data
		};

		return Mig.create(tag, attrs, [data]);
	}

}());
