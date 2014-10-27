function Api() {}

Api.prototype = {
	constructor: Api,
	getCitiesArray: function (cities, callback) {
		$.ajax({
			url: "http://api.openweathermap.org/data/2.5/group?id="+cities+"&units=metric",
			dataType: "json"
		}).done(function( data ) {
				$.each(data.list, function (key, data) {
    				data.weather = data.weather[0];
				});	
				if(callback) { callback(data); }
		});
	}
}
