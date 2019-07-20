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


async function insert_footer(){
    try{
        return $.ajax({
            url: the_domain + '/templates/footer.html',
            cache: false,
            success: function(result){
                $('footer').html(result);

                return true;
            }
        });
    } catch(err) {}

    return false;
}


async function update_UI(){
    var response_header = await insert_header();

    // True - Header Loaded
    if(response_header){
        
        // Load Footer
        var response_footer = await insert_footer();

        // True - Footer Loaded
        if(response_footer){
            c_flag = 1;
            functionSequence();
        } 
    } 
}



function functionSequence() {
    if(1 == c_flag) {
        dropdown_menu();
        $('.loading-screen').remove();
    }
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
