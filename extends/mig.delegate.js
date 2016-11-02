;(function(win, doc) {
	'use strict';
    //a = event
    //b = target
    //c = callback
    Mig.extend('delegate', function(a, b, c) {
        var _delegate = function(e, d) {
            return (d = e.target.closest(b)) && c.call(d, e, d);
        };
        this.forEach(function(el) {
            el.addEventListener(a, _delegate);
        });
        return this;
    });
}(window, document));
