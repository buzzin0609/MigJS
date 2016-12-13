# MigJS
My own DOM/Utility library. It's lightweight, modular and FAST

This is just a personal project I started to grow my knowledge of native Javascript and to get a feeling about what it's like to write an API.

#Basic Usage

Similar usage to jQuery except you use the global function 'm' for DOM element selection, so:

```
//get all the divs on the page
var divs = m('div');
//wrap already selected elements in the Mig object
var divs = document.getElementsByTagName('div');
var mDivs = m(divs);
mDivs.on('click', myFunc);
```

If you include mig.core.js, you will get a selection of functions that work similar to JQuery:

```
var divs = m('div');
divs.addClass('hey new classes');
//chain the calls
divs.removeClass('hey').addClass('newer');



```
//fire function on document ready
Mig.on('ready', function() {
  //document is ready, do something
});
```

Mig.on can also be used with an element

```
m('.btn').on('click', function(e) {
  //a .btn element was clicked, do something
});

```
##Each instantiation includes all Array.prototype functions, so:

```
//select all divs and forEach

m('divs').forEach(function(el) {
    //el is an individual div element
    //do stuff with each div
});

var newList = m('divs').map(function(el) {
    //do something with div to build a new array
});

//includes all other functions like .filter, .reduce etc...

```


##Functions with core.js

### To be used with Mig element objects
- Mig.addClass
- Mig.removeClass
- Mig.toggleClass
- Mig.css
- Mig.parent
- Mig.parents (NOT COMPLETE)
- Mig.position

### Static utility functions
- Mig.random
- Mig.randomInt
- Mig.unique

##Other available extensions
- Mig.ajax : mig.ajax.js

TODO: 
- Finish README
- Add list of available extension functions and usage
- Clean up files and add comments
