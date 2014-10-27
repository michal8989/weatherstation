"use strict";
define(
    ['cities'],
    function(module) {
		
        var run = function() {
			
			QUnit.module( "Cities" );
			
			QUnit.test('namespace', function() {
				var instance;
				ok(Cities, "Cities namespace exists");
				equal(instance, undefined, "Instance not created");
			    instance = new Cities();
				notEqual(instance, undefined, "Instance created ok");
				propEqual(instance.getCities(), [], "Inital value is correct");
				instance.setCities(Array("a","b"));
				propEqual(instance.getCities(), ["a","b"], "Temp list edited");			  		  
			});

			QUnit.test('Initalizing API', function() {
				var instance = new Cities();
				ok(instance.api, "Api connected and initalized");
			});

			QUnit.asyncTest("Load Cities Ajax", function() {
			  var instance = new Cities();
			  instance.loadCities(function(res) {
				ok(res, "AJAX call got a result");
				notEqual(instance.getCities().length, 0, "Data exists in response");
				ok(instance.getCities()[0].id, "Id returned correct");
				ok(instance.getCityById(instance.getCities()[0].id),"City on list found");
				setTimeout(function() {
					ok( true, "Passed and ready to resume!" );
					QUnit.start();
				}, 1000);
			  });
			});
		
			QUnit.asyncTest("Sorting cities", function() {
			  var instance = new Cities();
			  instance.loadCities(function(res) {
				ok(res, "AJAX call got a result");
				notEqual(instance.getCities().length, 0, "Data exists in response");
				ok(instance.getCities()[0].id, "Id returned correct");
				ok(instance.getCityById(instance.getCities()[0].id),"City on list found");
				var id = instance.getCities()[0].id;
				instance.sortByTemperature(true);
				if(id == instance.getCities()[0].id) {
					instance.sortByTemperature(false);
				}
				notEqual(id,instance.getCities()[0].id,"Sorting ok");
				start();
			  });
			});	
			
			QUnit.asyncTest("Clearing cities list", function() {
			  var instance = new Cities();
			  instance.loadCities(function(res) {
				ok(res, "AJAX call got a result");
				notEqual(instance.getCities().length, 0, "Data exists in response ("+instance.getCities().length+")");
				instance.setCities(new Array());
				equal(instance.getCities().length, 0,"List cleared ("+instance.getCities().length+")");
				start();
			  });
			});

        };
        return {run: run}
    }
);
