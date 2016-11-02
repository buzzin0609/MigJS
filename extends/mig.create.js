Mig.extend('create', function(str) {
    var el = document.createElement('div');
    el.innerHTML = str;
    return el.firstElementChild;
});
