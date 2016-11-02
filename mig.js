;(function(win, doc, arr) {
    'use strict';

	/**
	 * Main selector function
	 * @param  {String} b String selector
	 * @param  {undefined} c Placeholder variable to use
	 * @param  {undefined} i Placeholder to use for selector length
	 * @param  {undefined} d Placeholder to use for selector incrementor
	 * @return {mixed}   Mixed return of either single Element, HTMLCollection, or NodeList
	 */
    function _lookup(b, c, i, d) {
        c = b[0];
        i = b.length;
        d = 0;
        while (i--) {
            switch(b[i]) {
                case '.':
                    d++;
                    break;
                case '#':
                    d++;
                    break;
                case ' ' :
                case ':' :
                case '*' :
                case '[' :
                case '>' :
                c = 'q';
                break;
            }
        }
        if (d > 1) {
            c = 'q';
        }
        switch(c) {
            case '#' :
            return [doc.getElementById(b.substr(1))];
            case '.' :
            return doc.getElementsByClassName(b.substr(1));
            default :
            return doc.querySelectorAll(b);
        }
    }

	/**
	 *
	 * @param  {Boolean} thisArg so the elements get pushed to each call of Mig
	 * @param  {Mixed}  els     contains the result of _lookup
	 * @return {Object} Mig instance         Returns an instance of Mig with prototype functions and Array functions
	 */
    function _init(thisArg, els) {
        return arr.push.apply(thisArg, els);
    }

    function Mig(selector, els) {
        els = '' + selector === selector && _lookup(selector) || selector[0] && selector || [selector];
        return _init(this, els);
    }
    win.m = function(a) {
        return new Mig(a);
    };
    Mig.prototype = [];

    Mig.prototype.extend = function(name, fn) {
        Mig.prototype[name] = fn;
    };

    win.Mig = Object.create(Mig.prototype);
}(window, document, []));
