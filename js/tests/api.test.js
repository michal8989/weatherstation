"use strict";
define(
    ['api'],
    function(module) {
        var run = function() {
			var instance;
			
			QUnit.module( "Api" );
			
			QUnit.test('namespace', function() {
				var instance;
				ok(Api, "Api namespace exists");
				equal(instance, undefined, "Instance not created");
				instance = new Api();
				notEqual(instance, undefined, "Instance created ok");		  		  
			});

			QUnit.asyncTest("Ajax - Empty list request", function() {
			  var instance = new Api();
			  instance.getCitiesArray(null,function(res) {
				ok(res, "AJAX call got a result");
				propEqual(res.list, [], "List should be empty");				
				start();
			  });
			});	

			QUnit.asyncTest("Ajax - Data list request", function() {
			  var instance = new Api();
			  
			  var demoCities = [{name: "London", id: 2643743}, {name: "Luton", id: 2643339}, {name: "Manchester", id: 2643123}, {name: "Birmingham", id: 2655603}];
			  var demoCitiesIds = demoCities.map(function(elem){return elem.id;});
			  var demoCitiesIdsJoined = demoCitiesIds.join(",");
			  
			  instance.getCitiesArray(demoCitiesIdsJoined,function(res) {
				ok(res, "AJAX call got a result");
				notPropEqual(res.list, [], "List should be NOT empty");				
				start();
			  });
			});				
			
        };
        return {run: run}
    }
);
