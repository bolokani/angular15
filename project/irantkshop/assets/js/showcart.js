// for selectlist product's page

$('.selectlist').click(function () {

    $('ul',this).slideToggle(200);
    $(this).toggleClass('active');
});

$('.selectlist ul li').click(function () {

    var txt = $(this).text();
    $('.selectlist .garantytitle').text(txt);
});

// for close popUp addaddress

var addAddress = $('#add_address');

addAddress.find('.btn-gray').click(function () {
    addAddress.fadeOut(300);
    $('#dark').fadeOut(300);
});
addAddress.find('.close').click(function () {
    addAddress.fadeOut(300);
    $('#dark').fadeOut(300);
});

// for open popUp addaddress

var add=$('#add');
add.click(function () {
    addAddress.fadeIn(300);
    $('#dark').fadeIn(300);

});




function Func() {
    var city = document.getElementById('city');
    var state=document.getElementById('state');
    var val=state.options[state.selectedIndex].getAttribute('data_city');
    var arr=val.split(',');
    city.options.length = 0;
    for(i = 0; i < arr.length; i++)
    {
        if(arr[i] != "")
        {
            city.options[city.options.length]=new Option(arr[i],arr[i]);
        }
    }
    $('.selectpicker').selectpicker('refresh');
};
// for chekbox discount
$('.input_check_discount').click(function () {
    if ($(this).is(':checked')) {
        $(this).parents('.a').find('.input_onCheck_reg').addClass('input_checked_reg');
        $('.enter-discount').fadeIn(400);
    } else {
        $(this).parents('.a').find('.input_onCheck_reg').removeClass('input_checked_reg');
        $('.enter-discount').fadeOut(400);
    }
});
// for giftcart
$('.input_check_giftcart').click(function () {
    if ($(this).is(':checked')) {
        $(this).parents('.a').find('.input_onCheck_reg').addClass('input_checked_reg');
        $('.enter-giftcart').fadeIn(400);
    } else {
        $(this).parents('.a').find('.input_onCheck_reg').removeClass('input_checked_reg');
        $('.enter-giftcart').fadeOut(400);
    }
});

