$(document).ready(function() {
    $('.recherche').on("input",function (error) {
        var list = {};
        var input = $(this).val(); // take the value of the input with the class recherche
        getData(input, list); // execute the method getData
    })
    Materialize.updateTextFields();
})

function getData(input, list) {
    $.ajax({
        url: "https://timetable.search.ch/api/completion.en.json?nofavorites=0&term="+input, // execute the search in the API with the value of the input
        type: 'Get',
        dataType: 'json',
        success: function(result){
            // if the research succeed, each value is put in a list
            $.each(result, function( id, val ) {
                list[val.label] = null;
            });
            // when the list is fill, execute the autocompetion (map the response under the input)
            $('input.recherche').autocomplete({
                data: list,
                limit: 10, // The max amount of results that can be shown at once. Default: Infinity.
                onAutocomplete: function(val) {
                    // Callback function when value is autocompleted.
                },
                minLength: 2, // The minimum length of the input for the autocomplete to start. Default: 1.
            });
            console.log(stations);
        }
    })
}