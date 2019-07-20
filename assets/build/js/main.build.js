// Completed Flag
var c_flag = 0;

// Get The Domain
var the_domain    = window.location.protocol + '//' + window.location.host;


function dropdown_menu() {
    $('.dd-item').on('click', function () {
        var ele = $(this).parents('.parent-dd').find('.child-dd');

        ele.toggleClass('open');
    });
}



async function insert_header(){
    try{
        return $.ajax({
            url: the_domain + '/templates/header.html',
            cache: false,
            success: function(result){
                $('body').prepend(result);

                return true;
            }
        });
    } catch(err) {}

    return false;
}


async function update_UI(){
    var response = await insert_header();

    if(response){
        // True

        c_flag = 1;
        functionSequence();
    }
}



function functionSequence() {
    if(1 == c_flag) dropdown_menu();
    else update_UI();
}



// =========================================================
// On Load
// =========================================================
if (window.addEventListener) {
    window.addEventListener('load', function () {
        functionSequence();
    });
} else {
    window.attachEvent('onload', function () {
        functionSequence();
    });
}
