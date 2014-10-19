
function ViewHelper() {}

ViewHelper.prototype = {
	constructor: ViewHelper,
	showLoading:function () {
		$(".loader").css("visibility","visible");
	},
	hideLoading:function (){
		$(".loader").css("visibility","hidden");
	}
}