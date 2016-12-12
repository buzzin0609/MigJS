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
     * Function to conveniently add classes to a Mig element collection
     * @param {String} a - a list of classes to add separated by a space
     */
    Mig.extend('addClass', function (a) {
        var c = a.split(' ');
        this.forEach(function (b) {
            b.className = Mig.unique(b.className.split(' '), c).join(' ');
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
            b.className = b.className.split(' ').filter(function (d) {
                return c.indexOf(d) === -1;
            }).join(' ');
        });
        return this;
    });
    /**
     * Wrapper function around Element.classList.toggle to conveniently toggle classes to a Mig element collection
     * @param {String} a - a list of classes to toggle separated by a space
     */
    Mig.extend('toggleClass', function (a) {
        this.forEach(function (b) {
            b.classList.toggle.apply(b.classList, a.split(' '));
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