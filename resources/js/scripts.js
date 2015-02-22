;(function($) {
	_papersheet= $(".papersheet");
	_trigger= $(".papersheet__trigger");


	_trigger.click(function(){

	if (_papersheet.hasClass("opened")) {
		$("body").stop().removeClass("opened");
		$(this).parent(".papersheet").stop().removeClass("opened");

	} else {
		$("body").stop().addClass("opened");
		$(this).parent(".papersheet").stop().addClass("opened");
	}

	});	
})(jQuery);