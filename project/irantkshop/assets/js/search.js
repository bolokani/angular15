//  filter top for search page

var items=$('.filter_top .options li');  //point to options's li

items.hover(function () {

    $('.square',this).addClass('square_hover');
},function () {
    $('.square',this).removeClass('square_hover');

});
items.click(function () {
    var title=$(this).parents('li').find('.filter_title').text();
    var value= $(this).text();
    var id= $(this).attr('data-id');
    var filterSelected =$('#filters_selected');
    var filterSelectedSpan =filterSelected.find('span[data-id='+id+']');
    var leng=filterSelectedSpan.length;
    if(leng>0){
        filterSelectedSpan.remove();
    }
    else{
        var span='<span data-id="'+id+'" class="filter_selected_span">'+title+':'+value+'<i class="remove_filter" onclick="removeSelected(this)"></i></span>';
        filterSelected.append(span);

    }

    $('.square',this).toggleClass('square_selected');


});



function removeSelected(tag) {

    var spanTag =$(tag).parents('span');
    spanTag.remove();
    var id=spanTag.attr('data-id');
    $('.options li[data-id="'+id+'"]').find('.square').removeClass('square_selected');


}

// for filter search's  page

var timer2={};

var filter= $('.filter_top > li');
filter.hover(function () {
    var tag= $(this);
    timer2 = setTimeout(function () {
        clearTimeout(timer2);
        $('.options',tag).slideDown(200);
    },500);} ,function () {
    var tag= $(this);
    clearTimeout(timer2);
    $('.options',tag).slideUp(0);
});

// for displaytype search's page

$('.search_displaytype_type2').click(function () {
    $('#search_product').addClass('search_display');
    $(this).addClass('active');
    $('.search_displaytype_type1').removeClass('active');
});
$('.search_displaytype_type1').click(function () {
    $('#search_product').removeClass('search_display');
    $(this).addClass('active');
    $('.search_displaytype_type2').removeClass('active');
});
// for yesno search's page

$('.search_yesno').click(function () {

    $(this).toggleClass('active');
    if($(this).hasClass('active')){
        $('.search_yesno_icon' ,this).animate({'left':'14px'},400);
    }else{
        $('.search_yesno_icon' ,this).animate({'left':'5px'},400);
    }
});

