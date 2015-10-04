

function main(){
    start();
    window.setInterval(function(){
        $(document).trigger("update");
    }, 333);
    $(document).on("keypress", function (e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode == 13) {
            $(document).trigger("enterKeyDown");
        }
        if (keyCode == 37) {
            $(document).trigger("leftArrowKeyDown");
        }
        if(keyCode == 38){
            $(document).trigger("upArrowKeyDown");
        }
        if(keyCode == 39){
            $(document).trigger("rightArrowKeyDown");
        }
        if(keyCode == 40){
            $(document).trigger("downArrowKeyDown");
        }
    });
}
