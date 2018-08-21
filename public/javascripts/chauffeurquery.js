
/* Is used to count the number of bike per journey (only confirmed reservation) from chauffeur client side --> point to a .get method in the chauffeur route*/
function countBikesPerJourney(){
    var idJourney = $('select[name=id_journey]').val();

    $.ajax({
        url: "/grp17/chauffeur/nbBikes="+idJourney,
        type: 'GET',
        success: function(nbBike) {
            console.log(nbBike);
            $("#response").html(nbBike);
        }
    })

}