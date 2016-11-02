# MigJS
My own DOM/Utility library. It's lightweight, modular and FAST

This is just a personal project I started to grow my knowledge of native Javascript and to get a feeling about what it's like to write an API.

#Basic Usage

Similar usage to jQuery except you use the keyword 'm' for DOM element selection, so:

```
//get all the divs on the page
var divs = m('div');
```

If you include mig.core.js, you will get a selection of functions that work similar to JQuery:

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

TODO: 
- Finish README
- Add list of available extension functions and usage
- Clean up files and add comments
