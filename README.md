# MigJS
My own DOM/Utility library. It's lightweight, modular and FAST

This is just a personal project I started to grow my knowledge of native Javascript and to get a feeling about what it's like to write an API.

#Basic Usage - DOM selection/traversing

Similar usage to jQuery except you use the global function 'm' for DOM element selection, so:

```
//get all the divs on the page
var divs = m('div');
//wrap already selected elements in the Mig object
var divs = document.getElementsByTagName('div');
var mDivs = m(divs);
//when Mig.on.js is included
mDivs.on('click', myFunc);
```

If you include mig.core.js, you will get a selection of functions that work similar to JQuery:

```
var divs = m('div');
divs.addClass('hey new classes');
//chain the calls
divs.removeClass('hey').addClass('newer');


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
- Mig.css - simple wrapper over element.style.cssText. NOT to be used like jQuery.css
- Mig.parent
- Mig.parents (NOT COMPLETE)
- Mig.position - returns x,y instead of top,left like jQuery. I just prefer to use axis for position properties

### Static utility functions in core.js
- Mig.random
- Mig.randomInt
- Mig.unique


##Mig Modules
Version 0.2 comes with simple module and dependency injection support in Mig.modules.js.

The modules rely on Promise support so you will need a polyfill if you want to use this in a wider spectrum of browser environments.

###Defining a Module

Similar to the AMD style:

```
Mig.module(
	'myModule', //define the module name
	'dependency1 dependency2 dependency3', //space separated dependency list
	function(dep1, dep2, dep3) //callback with dependencies passed as parameters
	{
		//use dependencies

		//create your module value by using return
		return function(params) {
			//to use in other modules
			//you can use the dependencies here too
		};
	}
);

//now use myModule somewhere else
Mig.module(
	'myModule2', //new name for another module
	'myModule', //myModule is a dependency
	function(myModule) //callback with myModule passed in
	{
		//use myModule
	}
);

```

Modules are not restricted to one per file, but, unlike RequireJS, Mig modules will not load your files for you (not yet).

##Other available extensions - see file for more information on usage
- Mig.on : mig.on.js - Event handling system. Uses a publish/subscribe like system to register events on elements and also for general Event registering/triggering
- Mig.delegate : mig.delegate.js - For delegating events on elements
- Mig.ajax : mig.ajax.js - AJAX wrapper similar to jQuery's $.ajax with Promise like interface
- Mig.create : mig.create.js - A neat collection of utility functions to create DOM elements or view components in a similar style to ReactJS. More on this coming soon including a core Component function
- Mig.goto : mig.goto.js - Utility function for smooth scrolling
- Mig.serialize : mig.serialse.js - Create a key/value pair object from a collection of form input elements
- Mig.browser : mig.browser.js - Simple function to give browser name/version of the current user. Uses the navigator.userAgent property so use at your own risk! When included, it will add boolean properties to the main Mig object like Mig.isChrome, Mig.isFirefox etc for your convenience

TODO:
- Add more detailed usage information for each function
