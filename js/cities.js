var that;

function Cities() {
	that = this;	
	var loadCallback;
	var _cities = new Array();
	this.getCities = function() { return _cities; };
	this.setCities = function(cities) { _cities = cities; };
	this.api = new Api();
}

Cities.prototype = {
	constructor: Cities,
	sortByField:function (fields,direction) {
		this.getCities().sort(function(a, b){
			if(direction) {
 				return eval("b."+fields) - eval("a."+fields);
 			} else {
 				return eval("a."+fields) - eval("b."+fields);
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
		that.sortByField("main.temp",temperatureSortOrder);
		that.drawCities();	
		//console.log(that.getCities());
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
		$('#myModal .modal-title').empty().append(city.name);
				var view = ich.cityInfo(city);
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