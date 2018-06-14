$(document).ready(function() {

    $("input, textarea").keyup(function() {
        if ($(this).val()==="") {
            $(this).prev().css("display", "none");
        }else {
            $(this).prev().css("display", "block");
        }
     });
     $("button").click(function() {
        window.print();
     });
});