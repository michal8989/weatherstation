var viewHelper = new ViewHelper();
var cities = new Cities();

$(document).ajaxStart(function() {
     viewHelper.showLoading();
}).ajaxStop(function() {
     viewHelper.hideLoading();
});

// callback when cities are loaded through AJAX
var getCitiesCallback = function(data) {
	$('#citiesTable tbody td a ').click(function( index ) {
		var cityId = $(this).attr("id").replace("city-","");
		cities.getCity(cityId);
	});
}

$(document).ready(function() {

	$("#tempSort").click(function(e) {
		e.preventDefault();
		if(cities.temperatureSortOrder == SORT.DESC) {
			$(this).next("i").removeClass("fa-sort-numeric-desc").addClass("fa-sort-numeric-asc");
			cities.sortByTemperature();
			cities.temperatureSortOrder = SORT.ASC;
		} else {
			$(this).next("i").removeClass("fa-sort-numeric-asc").addClass("fa-sort-numeric-desc");
			cities.sortByTemperature(true);
			cities.temperatureSortOrder = SORT.DESC;
		}
	});

	$("#refreshButton").click(function(e) {
		e.preventDefault();
		cities.loadCities(getCitiesCallback);
	});

	//Load templates file, used ICanHaz template system
	$.get('templates.html', function (templates) {
	    $.each($(templates).filter('script'), function() {
	        ich.addTemplate($(this).attr("id"), $(this).html());
	    });
	    cities.loadCities(getCitiesCallback);
	});

	// receiving list redraw event
	$(document).on("listRedraw", function (evt) {
		getCitiesCallback();
	});

});
