/**
 * NOT FINISHED
 */
Mig.extend('validate', function(type, input) {

    var functions = {
        email : function(email) {
            var r = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return r.test(email);
        }
    };
    return functions[type](input);

});
