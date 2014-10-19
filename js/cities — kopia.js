var that;

function Cities() {
	that = this;	
	var _cities = new Array();
	this.getCities = function() { return _cities; };
	this.setCities = function(cities) { _cities = cities; };

	this.api = new Api();



}
var citiesList = new Array();
var loadCallback;
Cities.prototype = {
	constructor: Cities,
	loadCities:function (callback) {
			loadCallback = callback;
			var demoCitiesIds = demoCities.map(function(elem){return elem.id;});
			var demoCitiesIdsJoined = demoCitiesIds.join(",");
			// load cities list
			this.setCities(this.api.getCitiesArray(demoCitiesIdsJoined, this.citiesLoadedCallback).list);
			console.log(this.getCities());
			this.drawCities();	
	},
	sortCities:function() {
		console.log(this);
		console.log(this.getCities());
		
		this.getCities().reverse();
		//this.setCities(citi);
		this.drawCities();
	},
	citiesLoadedCallback:function(data) {
		/*console.log(that.getCities());
		
		//console.log(that);

		that.setCities(data.list); */
		console.log('jj');
		
		that.drawCities();	
		if(loadCallback) { loadCallback(that.getCities()); }
	},
	drawCities:function() {
		console.log(this);
		//alert('tt');
		$("#citiesTable tbody").empty();
		$.each(this.getCities(), function (key, data) {
			//console.log(demoCities);
			//console.log(ich);
    		var row = ich.tableRow(data);
    		$("#citiesTable tbody").append(row);
		});   		
	}
}