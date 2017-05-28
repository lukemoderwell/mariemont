function showMailchimpPopup() {
    require(["mojo/signup-forms/Loader"],
    function(L) { 
        L.start({
            "baseUrl":"mc.us4.list-manage.com","uuid":"44594b4e79df4aa51a8918830","lid":"4ab825b0c1"
        }) 
    })
}

$('#mailchimpPopup').click(() => {
    showMailchimpPopup();
    },
);
