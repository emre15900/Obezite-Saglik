$('.randart').addClass('show');
randart();
if (!cookie('randart')) {
    document.cookie = "randart=true"
}
$(function () {
    $('#check-also-close').click(function () {
        $('#check-also-box').fadeOut();
        $('.randart').addClass('show');
        document.cookie = "randart=false"
    });
    $(window).scroll(function () {
        randart()
    })
});

function randart() {
    if ($(window).scrollTop() >= ($(document).height() / 4) && cookie('randart') === 'true') {
        $('#check-also-box').show();
        $('.randart').removeClass('show')
    } else {
        $('#check-also-box').hide();
        $('.randart').addClass('show')
    }
}

function cookie(name) {
    let c = document.cookie.split('; ').find(cookie => cookie && cookie.startsWith(name + '='));
    return c ? c.split('=')[1] : !1
}

$(".s-item.print.rand-art").hover(function () {
    $(".s-item.print.rand-art").addClass('shake')
}, function () {
    $(".s-item.print.rand-art").removeClass('shake')
});
setInterval(function () {
    $(".s-item.print.rand-art").addClass('shake')
}, 1000);
setInterval(function () {
    $(".s-item.print.rand-art").removeClass('shake')
}, 3000);
$(".s-item.print.rand-art").click(function () {
    $('#check-also-box').show();
    $('.randart').removeClass('show');
    document.cookie = "randart=true"
});
$('.font-slider input[type="range"]').on("input change", function () {
    var newSize = $(this).val(), defaultSize = $("body").css("font-size"), minSize = 12, maxSize = 24;
    if (newSize <= maxSize && newSize >= minSize) {
        $(".post-detail").css("font-size", newSize + "px");

    }
});

$(function () {

    $(document).ready(function () {
        var cook = "unread";
        if (cookie(cook)) {
            var arr = JSON.parse(cookie('unread'));
            for (const [key, value] of Object.entries(arr)) {
                for (const [k, v] of Object.entries(value)) {
                    if (k.indexOf(window.location.pathname) === -1) {

                    } else {
                        $(window).scrollTop(v);
                    }
                }
            }
        }
    });
    $(document).on('scroll resize', function () {

        var $d = $(document),
            $w = $(window)
        $header = $('#header')
        $breadcrumb = $('#breadcrumb')
        $content = $('#content')
        $h = $header.height() + $breadcrumb.height() + $content.height()
        $width = $d.scrollTop() / (  $w.height()-($h)) * 100;


        $('div#scroll-bar').width($width + '%'
        );

        var cook = "unread";
        if ($width <= 95) {
            if (cookie(cook)) {
                var arr = JSON.parse(cookie('unread'));
                if (arr.length === 0) {
                    unreadContent(arr);
                } else {
                    var inArr = 0;
                    for (const [key, value] of Object.entries(arr)) {
                        for (const [k, v] of Object.entries(value)) {
                            if (k.indexOf(window.location.pathname) === -1) {

                            } else {
                                inArr += 1;
                                arr[key][k] = $d.scrollTop();
                            }
                        }
                    }

                    if (inArr === 0) {
                        var myObj = {};
                        myObj[window.location.pathname] = $width;
                        arr.push(myObj);
                    }
                    updateContent(arr);


                }


            } else {
                var arr = [];
                unreadContent(arr);
            }
        } else {
            var arr = JSON.parse(cookie('unread'));
            for (const [key, value] of Object.entries(arr)) {
                for (const [k, v] of Object.entries(value)) {
                    if (k.indexOf(window.location.pathname) !== -1) {
                        arr.splice(key, 1);
                        var json_str = JSON.stringify(arr);
                        document.cookie = "unread=" + json_str;
                    }
                }
            }
        }


    });

    function unreadContent(arr) {
        var $url = window.location.pathname;
        var myObj = {};
        myObj[$url] = $width;
        arr.push(myObj);
        var json_str = JSON.stringify(arr);
        document.cookie = "unread=" + json_str;
    }

    function updateContent(arr) {
        var json_str = JSON.stringify(arr);
        document.cookie = "unread=" + json_str;
    }

});

$(document).ready(function() {
    $(".faqs-container .faq-singular:first-child").addClass("active").children(".faq-answer").slideDown();
    $(".faq-question").on("click", function(){
        if( $(this).parent().hasClass("active") ){
            $(this).next().slideUp();
            $(this).parent().removeClass("active");
        }
        else{
            $(".faq-answer").slideUp();
            $(".faq-singular").removeClass("active");
            $(this).parent().addClass("active");
            $(this).next().slideDown();
        }
    });
});