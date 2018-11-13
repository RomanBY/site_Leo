
/*function viewdiv() {
    var b2 = document.getElementById('bt2_w');
    if (b2.style.display == "block") {
        b2.style.display = "none";
    } else {
        b2.style.display = "block";
    }
}*/

/*$("#bt2").click(function(e) {
    e.preventDefault();
    $("#bt2_w").addClass(' active');
    $("#bt3").removeClass(' active');
    $(this).removeClass(' active');
})*/


$(document).ready(function(){
    $("#bt2").click(function(){
            $("#bt2_w").toggleClass("active");/* return false;*/
            /*$("#bt4").removeClass("active");*/
    });
});