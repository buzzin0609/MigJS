;
(function (win, doc) {
    'use strict';
    //polyfill for element.closest
    if (window.Element && !Element.prototype.closest) {
        Element.prototype.closest =
            function (s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i,
                    el = this;
                do {
                    i = matches.length;
                    while (--i >= 0 && matches.item(i) !== el) {};
                } while ((i < 0) && (el = el.parentElement));
                return el;
            };
    }

    /**
     * Delegate an event listener to a set of elements
     * @param {String} a The name of the event
     * @param {String} b CSS selector string of the
     * @param {Function} c Callback to fire when delegate element is clicked
     */
    Mig.extend('delegate', function (a, b, c) {
        var _delegate = function (e, d) {
            return (d = e.target.closest(b)) && c.call(d, e, d);
        };
        this.forEach(function (el) {
            el.addEventListener(a, _delegate);
        });
        return this;
    });
}(window, document));