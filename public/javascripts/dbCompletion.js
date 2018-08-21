$(document).ready(function() {
    $('.recherche').on("input",function (error) {
        var list = {};
        var input = $(this).val();// take the value of the input with the class recherche
        getData(input, list);// execute the method getData
    })
    Materialize.updateTextFields();
})

/* This is the same method than in apiCompletion.js but the url change. It points to a method in the route client to search in DB*/
function getData(input, list) {
    $.ajax({
        url: "/grp17/client/completion/input="+input,
        type: 'GET',
        success: function(stations){
            $.each(stations, function( id, val ) {
                list[val.stationName] = null;
            });


            $('input.recherche').autocomplete({
                data: list,
                limit: 10, // The max amount of results that can be shown at once. Default: Infinity.
                onAutocomplete: function(val) {
                    // Callback function when value is autocompleted.
                },
                minLength: 2, // The minimum length of the input for the autocomplete to start. Default: 1.
            });
            console.log(stations);
        },
        error: function(){

        }
    })
}