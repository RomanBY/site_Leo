
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


/*when click buttom, add class to id class="main__content__info" */
$(document).ready(function(){
    $("#bt1").click(function(){
        $("#bt1_w").addClass("active");/* return false;*/
        $("#bt4_w").removeClass("active");
        $("#bt2_w").removeClass("active");
        $("#bt3_w").removeClass("active");
    });
});
$(document).ready(function(){
    $("#bt2").click(function(){
        $("#bt2_w").addClass("active");/* return false;*/
        $("#bt4_w").removeClass("active");
        $("#bt1_w").removeClass("active");
        $("#bt3_w").removeClass("active");
    });
});
$(document).ready(function(){
    $("#bt3").click(function(){
        $("#bt3_w").addClass("active");/* return false;*/
        $("#bt4_w").removeClass("active");
        $("#bt1_w").removeClass("active");
        $("#bt2_w").removeClass("active");
    });
});
$(document).ready(function(){
    $("#bt4").click(function(){
        $("#bt4_w").addClass("active");/* return false;*/
        $("#bt2_w").removeClass("active");
        $("#bt1_w").removeClass("active");
        $("#bt3_w").removeClass("active");
    });
});

/*
add class to buttom when you click*/
$(document).ready(function () {
    $('#bt1').click(function () {
        $('#bt1').addClass('active_butm');
        $('#bt2').removeClass('active_butm');
        $('#bt3').removeClass('active_butm');
        $('#bt4').removeClass('active_butm');
    })
});
$(document).ready(function () {
    $('#bt2').click(function () {
        $('#bt2').addClass('active_butm');
        $('#bt1').removeClass('active_butm');
        $('#bt3').removeClass('active_butm');
        $('#bt4').removeClass('active_butm');
    })
});
$(document).ready(function () {
    $('#bt3').click(function () {
        $('#bt3').addClass('active_butm');
        $('#bt2').removeClass('active_butm');
        $('#bt1').removeClass('active_butm');
        $('#bt4').removeClass('active_butm');
    })
});
$(document).ready(function () {
    $('#bt4').click(function () {
        $('#bt4').addClass('active_butm');
        $('#bt2').removeClass('active_butm');
        $('#bt3').removeClass('active_butm');
        $('#bt1').removeClass('active_butm');
    })
});

/*
button up*/
$(document).ready(function(){
    $('body').append('<a href="#" id="go-top" title="Вверх"></a>');
});

$(function() {
    $.fn.scrollToTop = function() {
        $(this).hide().removeAttr("href");
        if ($(window).scrollTop() >= "250") $(this).fadeIn("slow")
        var scrollDiv = $(this);
        $(window).scroll(function() {
            if ($(window).scrollTop() <= "250") $(scrollDiv).fadeOut("slow")
            else $(scrollDiv).fadeIn("slow")
        });
        $(this).click(function() {
            $("html, body").animate({scrollTop: 0}, "slow")
        })
    }
});

$(function() {
    $("#go-top").scrollToTop();
});
