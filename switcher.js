/*! 
 * switcher 1.0 (c) 2012 Nico Wiedemann - MIT license
 * https://github.com/EarMaster/switcher
 */
!function (definition) {
	if (typeof define==="function" && define.amd)
		define(definition);
	else
		self.switcher = definition();
}(function () {
	'use strict';
	/**
	 * function to provide a similar syntax to a switch statement but with regex as cases
	 * @param {String} scope string on which the regexes should be tested against
	 * @param {Object} tests object containing regexes as keys and callback functions as values which will be called with the scope as first parameter if the regex match.
	 * @param {Object} options object containing options like breakMode (see https://github.com/EarMaster/switcher for full list of options)
	 * @return {Boolean} returns true if one or more tests matched
	 */
	var switcher = function (scope, tests, options) {
		var defaultOptions = {
			breakMode: true // if set to true switcher will stop after the first match
		};
		if (!options)
			options = defaultOptions;
		else
			for (var option in defaultOptions)
				if (!options.hasOwnProperty(option))
					options[option] = defaultOptions[option];
		var matched = false;
		for (var test in tests) {
			test = {
				fullExpression: test,
				expression: test.substr(0,1)=='/'?test.substr(1, test.lastIndexOf('/')-1):test,
				flags: test.substr(0,1)=='/'?test.substr(test.lastIndexOf('/')+1):''
			};
			if (new RegExp(test.expression, test.flags).test(scope)) {
				matched = true;
				tests[test.fullExpression](scope, test.fullExpression);
				if (options.breakMode)
					break;
			}
		}
		return matched;
	};
	return switcher;
});