//  for panel's details

function showDetailsTr(imgTag) {

    tag = $(imgTag);
    tag.toggleClass('active');
    var parTr = tag.parents('tr');
    parTr.next('tr').fadeToggle(200);


}
// for tab 

var tabLi =$('#tab li');
var tabChild =$('#tab-child section');
tabLi.click(function () {
    tabLi.removeClass('active');
    tabChild.fadeOut(0);
    var index = $(this).index();
    tabChild.eq(index).fadeIn(0);
    $(this).addClass('active');
});

// for tab product's page

$('#tab-child .itemcontainer .item h4').click(function () {
    var items=$(this).parents('.item');
    $('.descryption',items).slideToggle(250);
    $(this).toggleClass('active');

});

// for edit icon


$('.favorits ul li.active a').hover(function () {
    $('.edit' , this).fadeIn(200);
},function () {

    $('.edit' , this).fadeOut(200);
});