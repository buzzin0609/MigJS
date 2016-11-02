;(function(win, doc, _) {
	'use strict';
	Mig.extend('on', function(a, b) {
		a = a.split(' ');
		if (this.length && !a[1]) {
			this.forEach(function(c) {
				c.addEventListener(a[0], function(e) {
					b.call(c, e);
				});
			});
		}
		if (a[1]) {
			doc.addEventListener(a[0], function(e, c) {
				(c = e.target.closest(a[1])) && b.call(c, e);
			});
		}
		(_[a[0]] || (_[a[0]] = [])).push(b);
	});
	Mig.on.trigger = function (a, b, c) {
        if (!_[a]) return;
		for (c = -1; _[a][++c];) { _[a][c](b); }
	};

	Mig.extend('one', function(a, b) {
		function handler(e) {
			var el = this;
			b.call(el);
			el.removeEventListener(a, handler)
		}
		this.forEach(function(c) {
			c.addEventListener(a, handler);
		});
	});

	Mig.extend('throttle', function(evName, minScrollTime, fn) {  //use this function to slow down the amount of times your function is fired. Will help for big performance heavy functions
		var scrollTimer, lastScrollFireTime = 0;
		this[0].addEventListener(evName, function() {
		  //  //console.log("normal firing rate");
			var now = new Date().getTime();
			if (!scrollTimer) {
				if (now - lastScrollFireTime > (3 * minScrollTime)) {
					fn(); //fire immediately on first scroll
					lastScrollFireTime = now;
				}
				scrollTimer = setTimeout(function() {
				  //  //console.log("firing two");
				   scrollTimer = null;
				   lastScrollFireTime = new Date().getTime();
				   fn();
			   }, minScrollTime);
			}
		});
		return this;
	});


	if (/c/.test(doc.readyState)) {
		Mig.on.trigger('ready');
		Mig.on.trigger('ajaxReady');
	} else {
		doc.addEventListener('DOMContentLoaded', function() {
			Mig.on.trigger('ready');
			Mig.on.trigger('ajaxReady');
		});
	}
	win.addEventListener('load', function() {
		Mig.on.trigger('load');
		Mig.on.trigger('ajaxLoad');
	});

}(window, document, {}));
