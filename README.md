# switcher
switcher provides a similar syntax to a switch statement in JavaScript but with RegExp as cases.

## How to use
I tried to mimic the syntax of a switch statement as good as possible. The following example shows how to match against the UserAgent string to detect iOS devices.

```javascript
switcher(navigator.userAgent, {
	'/android/i': function () { // You can use flags as you know them from RegExp.
		console.log('Android device.')
	},
	'/i(OS|Pad|Phone|Pod)/': function (scope, expression) { // The callback receives the scope variable and the matched expression as parameters.
		console.log('iOS device. '+scope+' did match '+expression);
	},
	'iPad': function () { // Normal strings work also (just as with RegExp). Note that this case will not be reached as the case before will match, unless breakMode is set to false (see below).
		console.log('It\'s an iPad');
	}
	'': function () { // default case
		console.log('any device.');
	}
});
```

Note that the Regular Expressions are written as Strings as JavaScript doesn't allow RegExp objects as keys. The default case is represented by an empty string as this one matches everything. You should always put the default case at last as with ``breakMode`` set to ``true`` no cases after the default one could be reached.

## Signature
```javascript
switcher(scope, tests, options);
```

## Options
Options can be changed by passing an object as third parameter to switcher.

``breakMode``  
When set to ``true`` (which is default) switcher will stop testing after the first match. When set to ``false`` switcher will continue testing (but note that changes that may have been made by previous matches can be overwritten ‒ *especially if you have a default case at the end*).

## License
[MIT license](http://opensource.org/licenses/MIT)