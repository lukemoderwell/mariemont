// Add scrolling styles
$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll >= 10) {
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


//Ajax form requests
$(".form_submit").onClick(function() {
    $.ajax({
        url: "https://formspree.io/luke.moderwell@gmail.com", 
        method: "POST",
        data: {message: "hello!"},
        dataType: "json"
    });
});


// Disable scroll zooming and bind back the click event
  var onMapMouseleaveHandler = function (event) {
    var that = $(this);

    that.on('click', onMapClickHandler);
    that.off('mouseleave', onMapMouseleaveHandler);
    that.find('iframe').css("pointer-events", "none");
  }

  var onMapClickHandler = function (event) {
    var that = $(this);

    // Disable the click handler until the user leaves the map area
    that.off('click', onMapClickHandler);

    // Enable scrolling zoom
    that.find('iframe').css("pointer-events", "auto");

    // Handle the mouse leave event
    that.on('mouseleave', onMapMouseleaveHandler);
  }

  // Enable map zooming with mouse scroll when the user clicks the map
  $('.maps.embed-container').on('click', onMapClickHandler);