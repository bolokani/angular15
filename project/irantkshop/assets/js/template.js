//        SliderScroll jQuery Script

function sliderScroll(direction, tag) {
    var span_tag = $(tag);
    var sliderScrollTag = span_tag.parents('.sliderscroll');
    var sliderScrollUL = sliderScrollTag.find('.sliderscroll_main ul');
    var sliderScrollItem = sliderScrollUL.find('li');
    var sliderScrollItemNumbers = sliderScrollItem.length;
    var sliderScrollNumber = Math.ceil(sliderScrollItemNumbers / 4);
    var maxNagativeMargin = -(sliderScrollNumber - 1) * 780;
    sliderScrollUL.css('width', sliderScrollItemNumbers * 195);
    var marginRightOld = sliderScrollUL.css('margin-right');
    var marginRightNew;
    marginRightOld = parseFloat(marginRightOld);
    if (direction == 'left') {
        marginRightNew = marginRightOld - 780;
    }
    if (direction == 'right') {
        marginRightNew = marginRightOld + 780;
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


//    Slider 1 jquery script

var sliderTag = $('#slider');
var sliderItems = sliderTag.find('.item');
var sliderNavigator = sliderTag.find('#slider_navigator ul li');
var nextSlide = 1;
var numberItems = sliderItems.length;
var timerSlider1 = 5000;
function slider() {
    if (nextSlide > numberItems) {
        nextSlide = 1;
    }
    if (nextSlide < 1) {
        nextSlide = numberItems;
    }
    sliderItems.hide();
    sliderItems.eq(nextSlide - 1).fadeIn(600);
    sliderNavigator.removeClass('active');
    sliderNavigator.eq(nextSlide - 1).addClass('active');
    nextSlide++;
}
slider();
var sliderInterval = setInterval(slider, timerSlider1);

sliderTag.mouseleave(function () {
    clearInterval(sliderInterval);
    sliderInterval = setInterval(slider, timerSlider1);
});

function goTonext() {
    slider();
}
$('#slider #next').click(function () {
    clearInterval(sliderInterval);
    goTonext();
});

function goToprev() {
    nextSlide = nextSlide - 2;
    slider();
}
$('#slider #prev').click(function () {
    clearInterval(sliderInterval);
    goToprev();
});
//navigator slider1
function goToslide(index) {
    nextSlide = index;
    slider();
}
$('#slider_navigator li').click(function () {
    clearInterval(sliderInterval);
    var index = $(this).index();
    goToslide(index + 1);

});

//    hide and priview arrow
$('#slider').hover(function () {
    $('#prev', this).fadeIn(0);
    $('#next', this).fadeIn(0);
},
    function () {
        $('#next', this).fadeOut(0);
        $('#prev', this).fadeOut(0);
    });


//    Slider 2 jquery script

var sliderTag2 = $('#slider2');
var sliderItems2 = sliderTag2.find('.item');
var sliderNavigator2 = sliderTag2.find('#slider2_navigator ul li');
var nextSlide2 = 1;
var numberItems2 = sliderItems2.length;
var timerSlider2 = 5000;
function slider2() {
    if (nextSlide2 > numberItems2) {
        nextSlide2 = 1;
    }
    if (nextSlide2 < 1) {
        nextSlide2 = numberItems2;
    }
    sliderItems2.hide();
    sliderItems2.eq(nextSlide2 - 1).fadeIn(600);
    sliderNavigator2.removeClass('active');
    sliderNavigator2.eq(nextSlide2 - 1).addClass('active');
    nextSlide2++;
}
slider2();
var sliderInterval2 = setInterval(slider2, timerSlider2);

sliderTag2.mouseleave(function () {
    clearInterval(sliderInterval2);
    sliderInterval2 = setInterval(slider2, timerSlider2);
});


//navigator slider2
function goToslide2(index) {
    nextSlide2 = index;
    slider2();
}
$('#slider2_navigator li').click(function () {
    clearInterval(sliderInterval2);
    var index = $(this).index();
    goToslide2(index + 1);

});


//   Menu jQuery escript
var timer = {};
$('#menu_top li').hover(function () {

    var tag = $(this);
    var timerAtrr = tag.attr('data-time');
    clearTimeout(timer[timerAtrr]);
    timer[timerAtrr] = setTimeout(function () {

        $(' > ul', tag).fadeIn(0);
        $('#menu_top > ul > li > ul > li').addClass('border_menu');
        $(' > .submenu3', tag).fadeIn(0);
        tag.addClass('active-menu');

    }, 500);

},
    function () {
        var tag = $(this);
        var timerAtrr = tag.attr('data-time');
        clearTimeout(timer[timerAtrr]);
        timer[timerAtrr] = setTimeout(function () {
            $(' > ul', tag).fadeOut(0);
            $('#menu_top > ul > li > ul > li').removeClass('amer');
            $(' > .submenu3', tag).fadeOut(0);
            tag.removeClass('active-menu');
        }, 500);
    });

// Checkbox For all

$('.input_check').click(function () {
    if ($(this).is(':checked')) {
        $(this).parents('.a').find('.input_onCheck').addClass('input_checked');
    }
    else {
        $(this).parents('.a').find('.input_onCheck').removeClass('input_checked');
    }
});

// Checkbox For Register

$('.input_check_reg').click(function () {
    if ($(this).is(':checked')) {
        $(this).parents('.a').find('.input_onCheck_reg').addClass('input_checked_reg');
    } else {
        $(this).parents('.a').find('.input_onCheck_reg').removeClass('input_checked_reg');
    }
});

