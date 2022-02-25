$(document).ready(function(){
    $('.has-submenu a').on("click", function(e){
        $(this).next('ul').toggle();
        e.stopPropagation();

    });
});
