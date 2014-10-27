"use strict";
define(
    ['view'],
    function(module) {
        var run = function() {
			var instance;
			
			QUnit.module( "ViewHelper" );
			
			QUnit.test('namespace', function() {
				var instance;
				ok(ViewHelper, "ViewHelper namespace exists");
				equal(instance, undefined, "Instance not created");
				instance = new ViewHelper();
				notEqual(instance, undefined, "Instance created ok");		  		  
			});				
			
			QUnit.test('methods', function() {
				var instance;
				instance = new ViewHelper();
				notEqual(instance, undefined, "Instance created ok");		  	
				ok(instance.showLoading, "Metod showLoading exist");
				ok(instance.hideLoading, "Metod hideLoading exist");
				equal(instance.fakeMethod, undefined, "Metod fakeMethod shouldn't exist");
			});					
			
        };
        return {run: run}
    }
);
