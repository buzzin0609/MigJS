;(function(doc) {
    'use strict';
    Mig.extend('random', function(min, max) {
        return Math.random() * (max - min) + min;
    });
    Mig.extend('randomInt', function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    });
    Mig.extend('addClass', function(a) {
        this.forEach(function(b) {
            b.classList.add.apply(b.classList, a.split(' '));
        });
        return this;
    });
    Mig.extend('removeClass', function(a) {
        this.forEach(function(b) {
            b.classList.remove.apply(b.classList, a.split(' '));
        });
        return this;
    });
    Mig.extend('toggleClass', function(a) {
        this.forEach(function(b) {
            b.classList.toggle.apply(b.classList, a.split(' '));
        });
        return this;
    });
    Mig.extend('css', function(a) {
        this.forEach(function(b) {
            b.style.cssText = a;
        });
    });
    //a = target
    //b, ret = placeholder that will be parent elements.
    Mig.extend('parent', function(a, b) {
        b = [];
        this.forEach(function(c) {
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
    //a = target
    //b, ret = placeholder that will be parent elements.
    Mig.extend('parents', function(a, b, ret) {
        b = [];
        if (a) {
            ret = m(a);
        }
        this.forEach(function(c) {
            var d = c.parentElement;
            if (!a) {
                while(d) {
                    if (b.indexOf(d) === -1) {
                        b.push(d)
                    }
                    d = d.parentElement;
                }
                return;
            } else {
                while(d) {
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

    Mig.extend('position', function() {
        var xPosition = 0;
        var yPosition = 0;
        xPosition += (this[0].offsetLeft - this[0].scrollLeft + this[0].clientLeft);
        yPosition += (this[0].offsetTop - this[0].scrollTop + this[0].clientTop);
        this[0] = this[0].offsetParent;
        return { x: xPosition, y: yPosition }
    });
}(document));
