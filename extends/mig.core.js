/**
 * Collection of core convenience functions to be used with the main Mig selector engine
 */
;
(function (doc) {
    'use strict';
    /**
     * Generates a random floating point number between the min and max (inclusive)
     */
    Mig.extend('random', function (min, max) {
        return Math.random() * (max - min) + min;
    });
    /**
     * Generates a random integer between the min and max (inclusive)
     */
    Mig.extend('randomInt', function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    });
    /**
     * Get a merged, deduped array
     */
    Mig.extend('unique', function (a, b) {
        var hash = {},
            i;
        for (i = 0; i < a.length; i++) {
            hash[a[i]] = true;
        }
        for (i = 0; i < b.length; i++) {
            hash[b[i]] = true;
        }
        return Object.keys(hash);
    });
    /**
     * Helper to concatenate two className strings
     * @param {Array} a, b Arrays of class strings
     */
    Mig.extend('_addClass', function (a, b) {
        return Mig.unique(a, b);
    });
    /**
     * Helper to concatenate two className strings
     * @param {Array} a array of class strings from the target element
     * @param {Array} b array of class strings to remove
     */
    Mig.extend('_removeClass', function (a, b) {
        return a.filter(function (c) {
            return b.indexOf(c) === -1;
        });
    });
    /**
     * Function to conveniently add classes to a Mig element collection
     * @param {String} a - a list of classes to add separated by a space
     */
    Mig.extend('addClass', function (a) {
        var c = a.split(' ');
        this.forEach(function (b) {
            b.className = Mig._addClass(b.className.split(' '), c).join(' ');
        });
        return this;
    });
    /**
     * function to conveniently remove classes from a Mig element collection
     * @param {String} a - a list of classes to remove separated by a space
     */
    Mig.extend('removeClass', function (a) {
        var c = a.split(' ');
        console.log(c);
        this.forEach(function (b) {
            b.className = Mig._removeClass(b.className.split(' '), c).join(' ');
        });
        return this;
    });
    /**
     * Function to conveniently toggle classes to a Mig element collection
     * @param {String} a - a list of classes to toggle separated by a space
     */
    Mig.extend('toggleClass', function (a) {
        var c = a.split(' ');
        this.forEach(function (b) {
            var toAdd = [];
            var toRemove = [];
            for (var i = 0, l = c.length; i < l; i++) {
                if (b.className.indexOf(c[i]) !== -1) {
                    toRemove.push(c[i]);
                } else {
                    toAdd.push(c[i]);
                }
            }
            var d = Mig._removeClass(b.className.split(' '), toRemove);
            b.className = Mig._addClass(d, toAdd).join(' ');
        });
        return this;
    });
    /**
     * Wrapper function around Element.style.cssText to add a string of CSS to a Mig element collection
     * @param {String} a - string of CSS properties to add to the element.
     */
    Mig.extend('css', function (a) {
        this.forEach(function (b) {
            b.style.cssText = a;
        });
    });
    /**
     * Get the parent element
     * @param {String} a - a dom selector string of the desired parent element - Optional
     * @param {undefined} b - placeholder variable which will be the retainer of parent elements
     * @return {Object} Mig object containing a Mig element collection of the designated parent elements if selector provided or collection of closest parent elements
     */
    Mig.extend('parent', function (a, b) {
        b = [];
        this.forEach(function (c) {
            var d;
            if (!a) {
                d = c.parentElement;
            } else {
                d = c.closest(a);
            }
            if (b.indexOf(d) === -1) {
                b.push(d);
            }
            return;
        });
        b.reverse();
        return m(b);
    });
    /**
     * Get all parent elements
     * FUNCTION NOT COMPLETE
     */
    Mig.extend('parents', function (a, b, ret) {
        b = [];
        if (a) {
            ret = m(a);
        }
        this.forEach(function (c) {
            var d = c.parentElement;
            if (!a) {
                while (d) {
                    if (b.indexOf(d) === -1) {
                        b.push(d);
                    }
                    d = d.parentElement;
                }
                return;
            } else {
                while (d) {
                    if (ret.indexOf(d) !== -1 && b.indexOf(d) === -1) {
                        b.push(d);
                    }
                    d = d.parentElement;
                }
            }
            return;
        });
        b.reverse();
        return m(b);
    });

    /**
     * Function to retrieve element position relative to the window
     * @return {Object} position with x and y coordinates
     */
    Mig.extend('position', function () {
        var xPosition = 0;
        var yPosition = 0;
        xPosition += (this[0].offsetLeft - this[0].scrollLeft + this[0].clientLeft);
        yPosition += (this[0].offsetTop - this[0].scrollTop + this[0].clientTop);
        this[0] = this[0].offsetParent;
        return {
            x: xPosition,
            y: yPosition
        };
    });
}(document));