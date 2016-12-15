;(function(win, doc) {
    'use strict';
    var Ease = {
        // no easing, no acceleration
        linear: function (t) { return t },
        // accelerating from zero velocity
        easeInQuad: function (t) { return t*t },
        // decelerating to zero velocity
        easeOutQuad: function (t) { return t*(2-t) },
        // acceleration until halfway, then deceleration
        easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
        // accelerating from zero velocity
        easeInCubic: function (t) { return t*t*t },
        // decelerating to zero velocity
        easeOutCubic: function (t) { return (--t)*t*t+1 },
        // acceleration until halfway, then deceleration
        easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
        // accelerating from zero velocity
        easeInQuart: function (t) { return t*t*t*t },
        // decelerating to zero velocity
        easeOutQuart: function (t) { return 1-(--t)*t*t*t },
        // acceleration until halfway, then deceleration
        easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
        // accelerating from zero velocity
        easeInQuint: function (t) { return t*t*t*t*t },
        // decelerating to zero velocity
        easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
        // acceleration until halfway, then deceleration
        easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
    }
    /**
     * A simple scrolling animation function to a target element
     * @param {Mixed} target a CSS selection string or DOM element
     * @param {Element} scrollEl a DOM element used as the scrolling context. For when you want to scroll inside a div with a scrollbar instead of the document
     * @param {Number} duration the time in milliseconds to scroll
     * @param {String} ease a string for the ease value from any of the above
     */
    Mig.extend('goto', function(target, scrollEl, duration, ease) {
        duration = duration || 1500;
        
        var position = m(target).position().y;
        ease = ease && Ease[ease] || Ease.easeInOutCubic;
        var start = scrollEl && scrollEl.scrollTop || doc.documentElement.scrollTop || doc.body.scrollTop;
        var startTime = new Date().getTime();
        var current;
        var timer = win.setInterval(function() {
            var step = Math.min(1,(new Date().getTime()-startTime)/duration) * 2;
            step = ease(step);
            if (current >= position) {
                clearInterval(timer);
            } else {
                current = start+step*(position-start);
				if (scrollEl) {
					scrollEl.scrollTop = current;
				} else {
					win.scrollTo(0, current);
				}
            }
        }, 25);
    });
}(window, document));
