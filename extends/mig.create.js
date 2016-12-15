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
    attrs = attrs || {};
    children = children || [];

    if (Object.keys(attrs).length) {
        Object.keys(attrs).forEach(function(attr) {
            console.log(el, attr);
            el.setAttribute(attr, attrs[attr]); 
        });
    }
    if (children.length) {
        /**
         * Children array can have a mix of strings and javascript DOM elements. It looks for the string and uses the more optimised insertAdjacentHTML or simple appends the child to the element.
         */
        children.forEach(function(child) {
            if (typeof child === 'string') {
                el.insertAdjacentHTML('beforeEnd', child);
            } else {
                el.appendChild(child);
            }
        }); 
    }
    return el;
});
