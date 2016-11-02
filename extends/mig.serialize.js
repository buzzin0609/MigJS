Mig.extend('serialize', function() {
    var data = {};
    var inputs = this.filter(function(input) {
        return input.type != 'submit';
    }).forEach(function(input) {
        data[input.name] = input.value;
    });
    return data;
});
