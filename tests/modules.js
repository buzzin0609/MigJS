setTimeout(function() {

    (function() {
    "use strict"

        Mig.module('test2', 'test1', function(test1) {
            // console.log(test1);
            return function(str) {
                test1(str);
            };
        });

        Mig.module('test4', 'test1 test2 test3', function (test1, test2, test3) {
            test1('test1 in test4');
            test2('test2 in test4');
            test3('test3 in test4');
        });
        
    }());


    (function() {
    "use strict";
        Mig.module('test1', function() {
            return function(str) {
                console.log(str);
            }
        });

        Mig.module('test3', 'test1 test2 test5', function(test1, test2, test5) {
            return function(str) {
                test5('calling test 5 in test 3 ' + str);
            };
        });

    }());

}, 500);

