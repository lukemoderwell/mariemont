$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 162) {
        //clearHeader, not clearheader - caps H
        $(".header").addClass("scroll");
    } else {
    	$(".header").removeClass("scroll");
    }
}); 

$('.open_label').click( function() {
    $("#menu").addClass("show");
} );

$('.close_label').click( function() {
    $("#menu").removeClass("show");
} );