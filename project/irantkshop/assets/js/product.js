// for colors product's page

$('.colors li').click(function () {

    $('.colors li').removeClass('active');
    $('.circle').removeClass('active');
    $('.circle', this).addClass('active');
    $(this).addClass('active');
});

// for selectlist product's page

$('.selectlist').click(function () {

    $('ul', this).slideToggle(200);
    $(this).toggleClass('active');
});

$('.selectlist ul li').click(function () {

    var txt = $(this).text();
    $('.selectlist .garantytitle').text(txt);
});

// for inintroduction product's page

var introduction = $('#introduction');
var introductionMore = $('#introduction .more');


introductionMore.click(function () {
    introduction.toggleClass('active');

    if (introduction.hasClass('active')) {
        introductionMore.html('<span>نمایش کمتر<i></i></span>');
        $('#introduction i').addClass('active');
    }
    else {
        introductionMore.html('<span>نمایش بیشتر<i></i></span>');
    }

});
// for sliderscroll product's page


function sliderScroll2(direction, tag) {
    var span_tag = $(tag);
    var sliderScrollTag = span_tag.parents('.sliderscroll');
    var sliderScrollUL = sliderScrollTag.find('.sliderscroll_main ul');
    var sliderScrollItem = sliderScrollUL.find('li');
    var sliderScrollItemNumbers = sliderScrollItem.length;
    var sliderScrollNumber = Math.ceil(sliderScrollItemNumbers / 5);
    var maxNagativeMargin = -(sliderScrollNumber - 1) * 1090;
    sliderScrollUL.css('width', sliderScrollItemNumbers * 198);
    var marginRightOld = sliderScrollUL.css('margin-right');
    var marginRightNew;
    marginRightOld = parseFloat(marginRightOld);
    if (direction == 'left') {
        marginRightNew = marginRightOld - 1090;
    }
    if (direction == 'right') {
        marginRightNew = marginRightOld + 1090;
    }
    if (marginRightNew < maxNagativeMargin) {
        marginRightNew = 0;
    }
    if (marginRightNew > 0) {
        marginRightNew = maxNagativeMargin;
    }
    sliderScrollUL.animate({ 'margin-right': marginRightNew }, 700)
}
$('.next').click(function () {
    sliderScroll('left');
});
$('.prev').click(function () {
    sliderScroll('right');
});

// for tab product's page

var tabLi = $('#tab li');
var tabChild = $('#tab-child section');
tabLi.click(function () {
    tabLi.removeClass('active');
    tabChild.fadeOut(0);
    var index = $(this).index();
    tabChild.eq(index).fadeIn(0);
    $(this).addClass('active');
});

// for tab product's page

$('#tab-child .itemcontainer .item h4').click(function () {
    var items = $(this).parents('.item');
    $('.descryption', items).slideToggle(250);
    $(this).toggleClass('active');

});

// for zoomproduct product's page


$('#zoomproduct').elevateZoom({ 'zoomWindowOffetx': -975, 'zoomWindowOffety': -40, 'cursor': 'crosshair', 'zoomWindowWidth': 560, 'zoomWindowHeight': 560 });


// for popUp gallery product's page

$('#product_gallery .left').mCustomScrollbar({
    autoHideScrollbar: true,
    mouseWeel: {
        enable: true,
        scrollAmount: "auto"

    },
    scrollButtons: {
        enable: true,
        scrollType: "stepless",
        scrollAmount: "auto"
    },
    theme: "3d-dark"

});

// for popUp gallery product's page

var productGallery = $('#product_gallery');
var productGalleryThumb = productGallery.find('ul li');

productGalleryThumb.click(function () {
    productGalleryThumb.removeClass('active');
    $(this).toggleClass('active');
    var imgUrl = $(this).attr('data-main-image');
    if (imgUrl.length > 0) {
        var mainImage = productGallery.find('.main-image');
        mainImage.attr('src', imgUrl);
        $('#cv').fadeOut(0);
        $('.main-image').fadeIn(200);

    } else {
        $('.main-image').fadeOut(0);
        $('#cv').fadeIn(200);
    }
});

// for close popUp gallery product's page

productGallery.find('.close').click(function () {
    productGallery.fadeOut(300);
    $('#dark').fadeOut(300);
});

// for open popUp gallery product's page

var galleryItem = $('.gallery').find('ul li');
galleryItem.click(function () {
    productGallery.fadeIn(300);
    $('#dark').fadeIn(300);

    var imgUrl = $(this).attr('data-main-image');
    var mainImage = productGallery.find('.main-image');
    if (imgUrl.length > 0) {
        mainImage.attr('src', imgUrl);
        $('#cv').fadeOut(0);
        $('.main-image').fadeIn(200);

    } else {
        $('.main-image').fadeOut(0);
        $('#cv').fadeIn(200);

    }
    mainImage.attr('src', imgUrl);
});
