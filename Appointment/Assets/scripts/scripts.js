document.addEventListener('DOMContentLoaded', function () {
    // When the event DOMContentLoaded occurs, it is safe to access the DOM
    $(window).scroll(function () {
        var sticky = $('#navbar'),
            scroll = $(window).scrollTop();

        if (scroll >= 100) sticky.addClass('sticky');
        else sticky.removeClass('sticky');


    });

});
$(document).ready(function () {
    $(".menu-icon").mouseover(function () {
        $(".main-menu").addClass("show");
    });

    $(".main-menu").mouseleave(function (e) {
        $(".main-menu").removeClass("show");
    });
});

var width = $(window).width();
//KhalidSaturday
$(document).ready(function () {
    var mobile = $("#carousel-mobile").html();
    var web = $("#carousel-web").html();
    // alert(mobile);
    if (width >= 1024) {
        $("#carousel-mobile").empty();
        $("#carousel-web").empty();
        $("#carousel-web").append(web);
    }
    else {
        $("#carousel-web").empty();
        $("#carousel-mobile").empty();
        $("#carousel-mobile").append(mobile);
    }
});

$(document).ready(function () {
    $('.continue').click(function (e) {
        $(this).closest(".progress-step").addClass("is-complete").removeClass("is-active");
        $(this).closest(".progress-step").next().addClass("is-active");
        $(".is-complete .progress-marker").attr("data-text", "");
    });

    if ($(".progress-step").hasClass("is-complete")) {
        $(".is-complete .progress-marker").attr("data-text", "");
    }
});

$(document).ready(function () {
    $('.loans-types a').click(function (e) {
        $('.loans-types a.active').removeClass("active");
        $(this).addClass("active");
    });
});

//jQuery(function () {

//    var minimized_elements = $('p.minimize');

//    minimized_elements.each(function () {
//        var t = $(this).text();
//        if (t.length < 150) return;

//        $(this).html(
//            t.slice(0, 150) + '<span>... </span><a href="#" class="more">More</a>' +
//            '<span style="display:none;">' + t.slice(150, t.length) + ' <a href="#" class="less">Less</a></span>'
//        );

//    });

//    $('a.more', minimized_elements).click(function (event) {
//        event.preventDefault();
//        $(this).hide().prev().hide();
//        $(this).next().show();
//    });

//    $('a.less', minimized_elements).click(function (event) {
//        event.preventDefault();
//        $(this).parent().hide().prev().show().prev().show();
//    });

//});


$(document).ready(function () {
    $(document).on('click', '.progress-step.is-complete .progress-title.parent-title', function (e) {
        $(this).parents('.progress-step.is-complete').children('ul.progress-tracker').toggleClass("d-block");
    });
});


/* updated by safaa 16 */
$(window).scroll(function (e) {
    var $el = $('#progressbar');
    var isPositionFixed = ($el.css('position') == 'fixed');
    if ($(this).scrollTop() > 50 && !isPositionFixed) {
        $el.css({ 'position': 'fixed', 'top': '0px' });
        $('#progressbar').addClass("sticky");
    }
    if ($(this).scrollTop() < 50 && isPositionFixed) {
        $el.css({ 'position': 'static', 'top': '0px' });
        $('#progressbar').removeClass("sticky");
    }
});



$(document).mouseup(function (e) {
    var container = $(".date-input");


    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        $(".bootstrap-datetimepicker-widget.dropdown-menu").hide();
    } else {
        $(".bootstrap-datetimepicker-widget.dropdown-menu").show();
    }

});

// updated by safaa

//$(document).ready(function () {
//    //var container = $(".progress");
//    //var progressBar =$(".progress-bar");
//    //var width = progressBar[0].offsetWidth;
//    //var totalW = container[0].offsetWidth;
//    var percentageW = document.getElementById("progressBar").style.width;


//    if (percentageW >= 75) {
//        progressBar.addClass("success");
//    } else if (percentageW < 75) {
//        progressBar.removeClass("success");
//    }

//    if (percentageW == 100) {
//        progressBar.addClass("successFinal");
//        $("#progress-target").addClass("border-primary");
//    } else if (percentageW < 100) {
//        progressBar.removeClass("successFinal");
//        $("#progress-target").removeClass("border-primary");
//    }

//    var progressBarElement = document.getElementById('progressBar');
//    // Only observe the 2nd box
//    //ro.observe(progressBarElement);

//    var my_element = document.getElementById('progressBar');
//    ResizeListener.add(my_element, function (entries)
//    {
//        var container = $(".progress");
//       var percentageW = document.getElementById("progressBar").style.width; //entries.width;//(width / totalW) * 100;
//        percentageW =percentageW.replace('%', '');
//            if (percentageW < 25) {
//                document.getElementById('progressBar').classList.remove("success-25");
//                document.getElementById('progressBar').classList.remove("success-50");
//                document.getElementById('progressBar').classList.remove("success-75");
//            }
//            else if (percentageW >= 25 && percentageW < 50) {
//                document.getElementById('progressBar').classList.add("success-25");
//                $(".progress-breakpoint-25 svg").addClass("animated flash");
//                document.getElementById('progressBar').classList.remove("success-50");
//                document.getElementById('progressBar').classList.remove("success-75");
//            } else if (percentageW >= 50 && percentageW < 75) {
//                document.getElementById('progressBar').classList.add("success-25");
//                document.getElementById('progressBar').classList.add("success-50");
//                document.getElementById('progressBar').classList.remove("success-75");
//                $(".progress-breakpoint-50 svg").addClass("animated flash");
//            } else if (percentageW >= 75 && percentageW < 100) {
//                document.getElementById('progressBar').classList.add("success-25");
//                document.getElementById('progressBar').classList.add("success-50");
//                document.getElementById('progressBar').classList.add("success-75");
//                $(".progress-breakpoint-75 svg").addClass("animated flash");
//            }

//            if (percentageW == 100) {
//                //07052020Lamees 
//                $("#progress-target").addClass("border-accent");
//                $("#progress-target .black-white-logo").addClass("d-none");
//                $("#progress-target .colorful-logo").removeClass("d-none");
//                $("#progress-target .colorful-logo").addClass("animated flash");
//                document.getElementById('progressBar').classList.add("success-25");
//                document.getElementById('progressBar').classList.add("success-50");
//                document.getElementById('progressBar').classList.add("success-75");
//                document.getElementById('progressBar').classList.add("successFinal");
//            } else if (percentageW < 100) {
//                document.getElementById('progressBar').classList.remove("successFinal");
//                $("#progress-target").removeClass("border-accent");
//                $("#progress-target .black-white-logo").removeClass("d-none");
//                $("#progress-target .colorful-logo").addClass("d-none");
//                $("#progress-target .black-white-logo").addClass("animated flash");
//            }
//       // }
//    }


//    );
//});



//var ro = new ResizeListener(function (entries) {
//    var container = $(".progress");

//    for (let entry of entries) {
//        var width = entry.target.offsetWidth;
//        var totalW = container[0].offsetWidth;
//        var percentageW = (width / totalW) * 100;

//        if (percentageW < 25) {
//            entry.target.classList.remove("success-25");
//            entry.target.classList.remove("success-50");
//            entry.target.classList.remove("success-75");
//        }
//        else if (percentageW >= 25 && percentageW < 50) {
//            entry.target.classList.add("success-25");
//            $(".progress-breakpoint-25 svg").addClass("animated flash");
//            entry.target.classList.remove("success-50");
//            entry.target.classList.remove("success-75");
//        } else if (percentageW >= 50 && percentageW < 75) {
//            entry.target.classList.add("success-50");
//            entry.target.classList.remove("success-75");
//            $(".progress-breakpoint-50 svg").addClass("animated flash");
//        } else if (percentageW >= 75 && percentageW < 100) {
//            entry.target.classList.add("success-75");
//            $(".progress-breakpoint-75 svg").addClass("animated flash");
//        }

//        if (percentageW == 100) {
//            entry.target.classList.add("successFinal");
//            $("#progress-target").addClass("border-accent");
//            $("#progress-target .black-white-logo").addClass("d-none");
//            $("#progress-target .colorful-logo").removeClass("d-none");
//            $("#progress-target .colorful-logo").addClass("animated flash");
//        } else if (percentageW < 100) {
//            entry.target.classList.remove("successFinal");
//            $("#progress-target").removeClass("border-accent");
//            $("#progress-target .black-white-logo").removeClass("d-none");
//            $("#progress-target .colorful-logo").addClass("d-none");
//            $("#progress-target .black-white-logo").addClass("animated flash");
//        }
//    }
//});


$(document).ready(function () {
    $(document).on('click', '.progressbar-side-control', function (e) {
        //$(this).toggleClass("active");
        $('.progressbar-side').addClass("active");
    });
});

$(document).ready(function () {
    $(document).on('click', '.help-toggle', function (e) {
        //$(this).toggleClass("active");
        $('.need-help-mob').toggleClass("show");
    });
});

/* updated by safaa 6 */
$(document).ready(function () {
    $(document).on('click', '.progressbar-side .close', function (e) {
        $('.progressbar-side').removeClass("active");
    });
});

$(document).ready(function () {
    $(".progress").addClass("test-success-25");
    $(".progress-breakpoint-25").addClass("animated zoomIn");
    $(".progress-breakpoint-25 svg").addClass("animated jackInTheBox infinite");

    Percent25();
});

function Percent25() {
    setTimeout(myTimeout25, 1500)
}

function myTimeout25() {
    $(".progress").removeClass("test-success-25");
    $(".progress-breakpoint-25").removeClass("animated zoomIn");
    $(".progress-breakpoint-25 svg").removeClass("animated jackInTheBox infinite");

    $(".progress").addClass("test-success-50");
    $(".progress-breakpoint-50").addClass("animated zoomIn");
    $(".progress-breakpoint-50 svg").addClass("animated jackInTheBox infinite");


    Percent50();
}

function Percent50() {
    setTimeout(myTimeout50, 1500)
}

function myTimeout50() {
    $(".progress").removeClass("test-success-50");
    $(".progress-breakpoint-50").removeClass("animated zoomIn");
    $(".progress-breakpoint-50 svg").removeClass("animated jackInTheBox infinite");

    $(".progress").addClass("test-success-75");
    $(".progress-breakpoint-75").addClass("animated zoomIn");
    $(".progress-breakpoint-75 svg").addClass("animated jackInTheBox infinite");

    Percent75();
}

function Percent75() {
    setTimeout(myTimeout75, 1500)
}

function myTimeout75() {
    $(".progress").removeClass("test-success-75");
    $(".progress-breakpoint-75").removeClass("animated zoomIn");
    $(".progress-breakpoint-75 svg").removeClass("animated jackInTheBox infinite");

    $("#progress-target").addClass("border-primary");
    $("#progress-target .black-white-logo").addClass("d-none");
    $("#progress-target .colorful-logo").removeClass("d-none");
    $("#progress-target .colorful-logo").addClass("animated flash");
    Percent100();
}


function Percent100() {
    setTimeout(myTimeout100, 1500)
}

function myTimeout100() {
    $("#progress-target").removeClass("border-primary");
    $("#progress-target .black-white-logo").removeClass("d-none");
    $("#progress-target .colorful-logo").addClass("d-none");
    $("#progress-target .black-white-logo").addClass("animated flash");
    //07052020Lamees 
    //setTimeout(Addsuccess, 1)

}
//07052020Lamees 
//function Addsuccess()
//{
//    var percentageW = document.getElementById("progressBar").style.width;
//    percentageW = percentageW.replace('%', '');
//    if (percentageW == 100) {
//        $("#progress-target").addClass("border-accent");
//        $("#progress-target .black-white-logo").addClass("d-none");
//        $("#progress-target .colorful-logo").removeClass("d-none");
//        $("#progress-target .colorful-logo").addClass("animated flash");
//        document.getElementById('progressBar').classList.add("successFinal");
//    }
//}
$(document).ready(function () {
    if (width >= 1024) {
        $(document).on('click', '.loan-cards .recommended .shortcut button', function (e) {
            $(this).parents('.main-cont').children('.recommended').addClass("active");
            $(this).parents('.main-cont').children('.maximized').removeClass("active");
            $(this).parents('.main-cont').children('.customized').removeClass("active");
        });
        $(document).on('click', '.loan-cards .maximized .shortcut button', function (e) {
            $(this).parents('.main-cont').children('.recommended').removeClass("active");
            $(this).parents('.main-cont').children('.maximized').addClass("active");
            $(this).parents('.main-cont').children('.customized').removeClass("active");
        });
        $(document).on('click', '.loan-cards .customized .shortcut button', function (e) {
            $(this).parents('.main-cont').children('.recommended').removeClass("active");
            $(this).parents('.main-cont').children('.maximized').removeClass("active");
            $(this).parents('.main-cont').children('.customized').addClass("active");
        });
    }
    else if (width < 1024) {

        $(document).on('click', '.loan-cards .recommended', function (e) {
            $(this).parents('.main-cont').children('.recommended').addClass("active");
            $(this).parents('.main-cont').children('.maximized').removeClass("active");
            $(this).parents('.main-cont').children('.customized').removeClass("active");
            $(this).parents('.main-cont').removeClass("h-1000");
        });
        $(document).on('click', '.loan-cards .maximized', function (e) {
            $(this).parents('.main-cont').children('.recommended').removeClass("active");
            $(this).parents('.main-cont').children('.maximized').addClass("active");
            $(this).parents('.main-cont').children('.customized').removeClass("active");
            $(this).parents('.main-cont').removeClass("h-1000");
        });
        $(document).on('click', '.loan-cards .customized', function (e) {
            $(this).parents('.main-cont').children('.recommended').removeClass("active");
            $(this).parents('.main-cont').children('.maximized').removeClass("active");
            $(this).parents('.main-cont').children('.customized').addClass("active");
            $(this).parents('.main-cont').addClass("h-1000");
        });
    }
});

/* updated by safaa 6 */
//27052020TabsAdminLamees
var width = $(window).width();
if (width >= 1024) {
    $("#mobile").remove();
}
else {
    $("#web").remove();
}
$(window).resize(function () {
    var width1 = $(window).width();
    if (width1 >= 1024) {
        $("#mobile").remove();
    }
    else {
        $("#web").remove();
    }
});