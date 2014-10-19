
var viewHelper = new ViewHelper();

var cities = new Cities();
var demoCities = [{name: "London", id: 2643743}, {name: "Luton", id: 2643339}, {name: "Manchester", id: 2643123}, {name: "Birmingham", id: 2655603}];


 // This event is triggered if an Ajax request is started
 // and no other Ajax requests are currently running.
 $(document).ajaxStart(function() {
      viewHelper.showLoading();
 });

 // This global event is triggered if there are no more
 // Ajax requests being processed.
 $(document).ajaxStop(function() {
      viewHelper.hideLoading();
 });

  $(document).ajaxComplete(function() {
      //viewHelper.hideLoading();
 });

	// callback when cities are loaded through AJAX
	var getCitiesCallback = function(data) {
		$('#citiesTable tbody td a ').click(function( index ) {
		  var cityId = $(this).attr("id").replace("city-","");
		  cities.getCity(cityId);
		});
	}

var temperatureSortOrder = 0;

$(document).ready(function() {

	$("#tempSort").click(function(e) {
		event.preventDefault();
		if(temperatureSortOrder == 1) {
			$(this).next("i").removeClass("fa-sort-numeric-desc").addClass("fa-sort-numeric-asc");
			cities.sortByTemperature();
			temperatureSortOrder = 0
		} else {
			$(this).next("i").removeClass("fa-sort-numeric-asc").addClass("fa-sort-numeric-desc");
			cities.sortByTemperature(true);
			temperatureSortOrder = 1;
		}
	});

	$("#refreshButton").click(function(e) {
		event.preventDefault();
		cities.loadCities(getCitiesCallback);
	});

	//Load templates file
	$.get('templates.html', function (templates) {
	    $.each($(templates).filter('script'), function() {
	        ich.addTemplate($(this).attr("id"), $(this).html());
	    });
	    cities.loadCities(getCitiesCallback);
	});

	$(document).on("listRedraw", function (evt) {
		getCitiesCallback();
	});

});