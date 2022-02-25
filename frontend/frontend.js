const images = document.querySelectorAll("img[data-rsrc]");
const options = {root: null, rootMargin: "0px", threshold: 0.1};
const fetchImage = url => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = url;
        image.onload = resolve;
        image.onerror = reject
    })
};
const loadImage = image => {
    const src = image.dataset.rsrc;
    fetchImage(src).then(() => {
        image.src = src
    })
};
const handleIntersection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
            loadImage(entry.target)
        }
    })
};
const observer = new IntersectionObserver(handleIntersection, options);
images.forEach(img => {
    observer.observe(img)
});

function cmsInit() {
    $("iframe[data-rsrc]").each(function () {
        $(this).attr("src", $(this).attr("data-rsrc")).removeAttr("data-rsrc")
    })
}

document.addEventListener("DOMContentLoaded", function () {
    $(document).find('[type="tel"]').length && $(document).find('[type="tel"]').mask("(X00) 000 00 00", {translation: {X: {pattern: /[1-9]/}}}), $("script").attr("defer", "defer")
}, !1), window.onload = cmsInit;
var imageNodes;
(function () {
    var youtube = document.querySelectorAll(".youtube-video");
    for (var i = 0; i < youtube.length; i++) {
        var source = "//img.youtube.com/vi/" + youtube[i].dataset.embed + "/hqdefault.jpg";
        var statusCode;
        var style = "max-result";
        var image = new Image();
        image.src = source;
        image.className = "standart";

        image.addEventListener("load", function () {
            youtube[i].appendChild(image)
        }(i));
        /*imageNodes=youtube[i].getElementsByTagName("img");
        console.log(imageNodes);
        for(var j=0;j<imageNodes.length;j++) {
            imageNodes[j].addEventListener("error", function () {
                this.src="//img.youtube.com/vi/" + youtube[i].dataset.embed + "/hqdefault.jpg";
                this.className = "standart";
            });
        };*/

        youtube[i].addEventListener("click", function () {
            var iframe = document.createElement("iframe");
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("allowfullscreen", "");
            iframe.setAttribute("src", "//www.youtube.com/embed/" + this.dataset.embed + "?rel=0&showinfo=0&autoplay=1");
            this.innerHTML = "";
            this.appendChild(iframe)
        })
    }
})()
/*function imageNotFound(image,youtube){
    image.src="//img.youtube.com/vi/" + youtube.dataset.embed + "/hqdefault.jpg";
    image.className="standart";

}*/
$.ajax({
    url: 'csrf-token', success: function (html) {
        $('meta[name="csrf-token"]').attr('content', html)
    }, error: function (x, s, e) {
        console.log('Something went wrong...')
    }
})

let interval = null;

function fontLoadListener() {
    var hasLoaded = false
    /*
     * If anything goes wrong with the font loading API,
     * just change styles to the web font without handling FOUT
     */
    try {
        hasLoaded = document.fonts.check('12px "Merriweather"')
    } catch (error) {
        console.info(`document.fonts API error: ${error}`)
        fontLoadedSuccess();
        return
    }

    if (hasLoaded) {
        fontLoadedSuccess();
    }
}

function fontLoadedSuccess() {
    if (interval) {
        clearInterval(interval);
    }

    document.getElementById("js-font-status").innerHTML = "finished loading";
    document.getElementsByTagName("body")[0].classList.add("wf-merriweather--loaded");
}

function loadFontCSS(css) {
    interval = setInterval(fontLoadListener, 500)
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = css;

    document.getElementsByTagName("head")[0].appendChild(link);
}

if ($.isFunction($.fn.lazy)) {
    $('img:not(.owl-lazy)').lazy({
        effect: "fadeIn",
        effectTime: 2000,
        threshold: 0
    });
}

if ($.isFunction($.fn.jscroll)) {
    $('.scrolling-pagination ul.pagination').hide();
    $('.scrolling-pagination').jscroll({
        autoTrigger: true,
        padding: 0,
        nextSelector: '.pagination li.active + li a',
        contentSelector: 'div.scrolling-pagination',
        callback: function () {
            $('ul.pagination').remove();

        },
        loadingFunction: function () {
            setTimeout(
                function () {
                    $('.scrolling-pagination .scrolling-pagination').find('.cat-content').remove();
                }, 1000);
        }
    });
}

/* cookie */
function el(selector) {
    return document.querySelector(selector)
}

function els(selector) {
    return document.querySelectorAll(selector)
}

function on(selector, event, action) {
    els(selector).forEach(e => e.addEventListener(event, action))
}

function cookie(name) {
    let c = document.cookie.split('; ').find(cookie => cookie && cookie.startsWith(name + '='))
    return c ? c.split('=')[1] : false;
}


/* popup button hanler */
on('.cookie-popup button', 'click', () => {
    el('.cookie-popup').classList.add('cookie-popup--accepted');
    document.cookie = `cookie-accepted=true`
});

/* popup init hanler */
if (cookie('cookie-accepted') !== "true") {
    try{
        el('.cookie-popup').classList.add('cookie-popup--not-accepted');
    }catch (e){

    }

}


/* page buttons handlers */

function _reset() {
    document.cookie = 'cookie-accepted=false';
    document.location.reload();
}

function _switchMode(cssClass) {
    el('.cookie-popup').classList.toggle(cssClass);
}

$(document).ready(function () {

    $('#so-close').click(function () {
        kapali();
    });

    $('#so-open').click(function () {
        acik();
    });

    function acik() {
        $('#so-open').css('left', '-60px');
        $('.s-soft').removeClass('so-collapse');
        document.cookie = 'social_bar=true;max-age='+60*60*24*2;
    }

    function kapali() {
        $('.s-soft').addClass('so-collapse');
        $('#so-open').delay(300).css('left', '0');
        document.cookie = 'social_bar=false;max-age='+60*60*24*2;

    }

    if(cookie('social_bar')==='true'){
        acik();
    }else{
        kapali();
    }
});