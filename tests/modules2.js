(function() {
"use strict"
    Mig.module('test5', 'test2', function(test2) {
        return function(str) {
            test2('calling test2 in test5 return ' + str);
        }
    });
}());