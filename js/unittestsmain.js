"use strict";
require.config({
    paths: {
        'QUnit': 'libs/qunit',
        'jQuery': 'libs/jQuery',
        'ICanHaz': 'ICanHaz'
    },
    shim: {
       'QUnit': {
           exports: 'QUnit',
           init: function() {
               QUnit.config.autoload = false;
               QUnit.config.autostart = false;
           }
       },
       'jQuery': {
           exports: 'jQuery',
           init: function() {

               //QUnit.config.autoload = false;
              // QUnit.config.autostart = false;
           }
       },       
       'ICanHaz': {
           exports: 'ICanHaz',
           deps: ['jQuery'],
           init: function() {
               	$.get('templates.html', function (templates) {
					$.each($(templates).filter('script'), function() {
						ich.addTemplate($(this).attr("id"), $(this).html());
					});
				});
			} 
		}
    }
});

    // The set of test files.
    var tests = [
		'QUnit',
		'jQuery',
		'ICanHaz',
        'js/tests/api.test.js',
        'js/tests/cities.test.js',
        'js/tests/view.test.js'
    ];

// require the unit tests.
require(tests, function(){
        for (var i = 0; i < arguments.length; i++){
            var mymodule = arguments[i];
            try {
				mymodule.run();
			}
			catch(err) {}           
        }
         QUnit.load();
         QUnit.start();
    });
