
(function() {
	'use strict';

	/**
	 * Simple requestAnimationFrame fill
	 */
	var raf;
	if (!window.requestAnimationFrame) {
		raf = function(cb) { cb(); }
	} else {
		raf = window.requestAnimationFrame;
	}

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
	Mig.extend('create', function(tag, attrs, children) {
		var el = document.createElement(tag);

		if (attrs && attrs instanceof Array) {
			children = attrs;
			attrs = {};
		} else {
			attrs = attrs || {};
			children = children || [];
		}

		_setDomAttrs(attrs, el);

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

	function _setDomAttrs(attrs, el) {
		var attr;
		for (attr in attrs) {
			if (attr !== 'tag' && attrs.hasOwnProperty(attr)) {
				el.setAttribute(attr, attrs[attr])
			}
		}
	}

	/**
	 * Simple dynamic view rendering system
	 * Build updatable DOM components in a similar way to React when using React.createElement
	 * Register your dynamic elements with Mig.watch and update with Mig.update using the string name identifier
	*/


	var observables = {};
	/**
	 * Watching function to create a dynamic dom element
	 * @param {String} name - a unique name identifier for your component
	 * @param {Object} attrs - key value pairs of attributes to go on the element
	 *                       use attrs.tag for a specific DOM element, defaults to <span>
	 * @param {String} data - string representation of data. This can be HTML or plain text
	 * @returns {DOMElement}
	 */
	Mig.extend('watch', function(name, attrs, data) {
		if (observables[name]) {
			throw new TypeError('[Mig.watch] cannot create duplicate of -'+name+'- observable. Use Mig.update(\''+name+'\') if you want to change something on this element or use a unique identifier to create a new one');
		}
		return _createObservable(name, attrs, data);
	});

	//creates the element using Mig.create
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
		var el = Mig.create(tag, attrs, [data]);

		_setObservable(name, attrs, data, el);

		return el;
	}

	//set/update an existing observable
	function _setObservable(name, attrs, data, el) {
		observables[name] = {
			attrs : attrs,
			data : data,
			domEl : el
		};
	}

	/**
	 * Updating function. Will match the name to a registered observable and update the
	 * attributes and data with the supplied values. Will only update if attributes or data has chagned
	 * @param {String} name - name of observable
	 * @param {Object} attrs - key value pairs of element attributes to update
	 * @param {String} data - new data to apply to element
	 */
	Mig.extend('update', function(name, attrs, data) {
		var hasData = data;
		if (typeof attrs === 'string') {
			data = attrs;
			attrs = false;
			hasData = true;
		}
		var oldObservable = observables[name];
		if (oldObservable) {
			if (attrs) {
				attrs = _updateAttributes(oldObservable.attrs, attrs);
			} else {
				attrs = oldObservable.attrs
			}

			if (!hasData) {
				data = oldObservable.data;
			}
		}

		m('[data-watch='+name+']').forEach(function(el) {
			if (!oldObservable) { return; }
			if (hasData && data !== oldObservable.data) {
				raf(function() {
					if (_isHTML(data)) {
						// TODO: think of some internal sanitising in case of XSS injections from user provided data
						el.innerHTML = data;
					} else {
						el.textContent = data;
					}
					_setObservable(name, attrs, data, el);
				});
			}
			if (attrs) {
				_setDomAttrs(attrs, oldObservable.domEl);
			}
		});
	});

	/**
	 * Combine old and new attributes.
	 * @param  {Object} oldAttributes [description]
	 * @param  {Object} newAttributes [description]
	 * @return {Object} combined attributes with new attributes replacing old ones if they exist
	 */
	function _updateAttributes(oldAttributes, newAttributes) {
		return Object.assign(oldAttributes, newAttributes);
	}

	//simple html detect
	function _isHTML(str) {
		return /.+?<\\?.+[\s+?.+?]?>/g.test(str);
	}

}());
