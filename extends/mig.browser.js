/**
 * Convenience object that detects browsers and browser versions
 * @return {Object} browser with the browser name in lowercase and version as properties
 */
(function() {
    'use strict';
    var browser = false;
    Mig.extend('browser', function() {
        if (browser) {
            return browser;
        }
        var ua = (navigator.userAgent||navigator.vendor||window.opera).toLowerCase();
        browser = {};
        var version = 999;
        var vendor;
        var isMobile = /mobile/.test(ua);
        var isIpad = /ipad/.test(ua);


		// alert('user string ' + ua + isMobile + isIpad);
        if (isIpad === true || isMobile === true) {
			try {
				version = ua.match(/version\/(\d)/)[1];
			} catch (e) {
				version = 999;
			}

            browser.vendor = 'ipad';
            if (!isIpad) {
                browser.vendor = 'mobile';
            }
            browser.version = version;
			// alert(JSON.stringify(browser));
            return browser;
        }


        var matches;
        var isChrome = ua.match(/chrome\/(([\d|\.]+))/);
        var isFirefox = ua.match(/firefox\/(([\d|\.]+))/);
        var isSafari = /safari/.test(ua);
        var isIE = ua.match(/MSIE (.*?);/i);
        var isIE11 = /rv:11/.test(ua);

        if (isIE || isIE11) {
            vendor = 'ie';
            if (isIE11) {
                version = 11;
            } else {
                version = isIE[1];
            }
        }

        if (isChrome) {
            vendor = 'chrome';
            version = isChrome[1];
        }

        if (isSafari && !isChrome) {
            vendor = 'safari';
            version = ua.match(/Version\/([\d|\.]+)/)[1];
        }

        if (isFirefox) {
            vendor = 'firefox';
            version = isFirefox[1];
        }

        browser.vendor = vendor;
        browser.version = parseFloat(version);
        return browser;
    });

    var browsers = [
        {
            fn: 'isMobile',
            str: 'mobile'
        },
        {
            fn: 'isIpad',
            str: 'ipad'
        },
        {
            fn : 'isChrome',
            str : 'chrome'
        },
        {
            fn : 'isFirefox',
            str: 'firefox'
        },
        {
            fn: 'isSafari',
            str: 'safari'
        },
        {
            fn : 'isIE',
            str: 'ie'
        }
    ];

    browsers.forEach(function(b) {
        Mig.extend(b.fn, function() {
            var browser = Mig.browser();
            if (!browser || browser.vendor !== b.str) {
                return false;
            }
            return true;
        });
    });

	//fires on initialisation to store the current browser and version
    Mig.browser();
}());
