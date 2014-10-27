var that;
// Easiest way to define Enum 
var SORT = function(){return {'ASC':0,'DESC':1}}();

var demoCities = [{name: "London", id: 2643743}, {name: "Luton", id: 2643339}, {name: "Manchester", id: 2643123}, {name: "Birmingham", id: 2655603}];

function Cities() {
	that = this;	
	var loadCallback;
	var temperatureSortOrder = SORT.ASC;
	var _cities = new Array();
	this.getCities = function() { return _cities; };
	this.setCities = function(cities) { _cities = cities; };
	this.api = new Api();
}

Cities.prototype = {
	constructor: Cities,
	sortByField:function (field,direction) {
		this.getCities().sort(function(a, b){
			if(direction == SORT.DESC) {
 				return eval("b."+field) - eval("a."+field);
 			} else {
 				return eval("a."+field) - eval("b."+field);
 			}
		});
	},
	loadCities:function (callback) {
			loadCallback = callback;
			var demoCitiesIds = demoCities.map(function(elem){return elem.id;});
			var demoCitiesIdsJoined = demoCitiesIds.join(",");
			// load cities list
			this.api.getCitiesArray(demoCitiesIdsJoined, this.citiesLoadedCallback);			
	},
	sortByTemperature:function(direction) {
		this.sortByField("main.temp",direction);
		this.drawCities();
	},
	citiesLoadedCallback:function(data) {
		that.setCities(data.list); 
		that.sortByTemperature(that.temperatureSortOrder);
		that.drawCities();	
		if(loadCallback) { loadCallback(that.getCities()); }
	},
	drawCities:function() {
		$("#citiesTable tbody").empty();
		$.each(this.getCities(), function (key, data) {
    		var row = ich.tableRow(data);
    		$("#citiesTable tbody").append(row);
		});   		
		$(document).trigger('listRedraw');
	},
	getCity:function (idCity) {
		var city = this.getCityById(idCity);
		var view = ich.cityInfo(city);
		
		$('#myModal .modal-title').empty().append(city.name);
    	$("#myModal .modal-body").empty().append(view);
		$('#myModal').modal('show');
	},	
	getCityById:function (idCity) {
		var citiesList = this.getCities();
		for(var i = 0; i < citiesList.length; i++) {
			if(citiesList[i].id == idCity) {
				return citiesList[i];
			}
		}
	}	
}
