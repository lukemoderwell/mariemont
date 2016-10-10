$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 100) {
        //clearHeader, not clearheader - caps H
        $(".header").addClass("scroll");
    } else {
    	$(".header").removeClass("scroll");
    }
}); 

