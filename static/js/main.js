

function main(){
    start();
    window.setInterval(function(){
        $(document).trigger("update");
    }, 333);
}
