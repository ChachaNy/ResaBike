$(document).ready(function () {
    //We added a delay to our Date for the DatePicker because we want the user not to be able to choose a journey
    //if it's for the day before
    var delay =-0.5;

    //Select is to make the select for the dropdown works
    $('select').material_select();
    //This one is for the navbar, when it becomes small to make the button-collapse appear and functional
    $(".button-collapse").sideNav();
    //This query concerns our modal in the superadmin_zones.pug. It takes all the information needed to access it
    //in our inputs
    $('.modal#modaleditzone').modal({
        dismissible:false, //The modal doesn't close if we don't cick on the button
        ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
            var idZone = trigger.data("idzone");
            var zoneName = trigger.data("zonename");
            var zoneUsername = trigger.data("zoneusername");
            var zonePassword = trigger.data("zonepassword");
            var firstName = trigger.data("firstname");
            var lastName = trigger.data("lastname");
            var telephon = trigger.data("telephon");
            var email = trigger.data("email");
            var busdriverUsername = trigger.data("busdriverusername");
            var busdriverPassword = trigger.data("busdriverpassword");
            modal.find('input[id="idZone"]').val(idZone);
            modal.find('input[id="zoneName"]').val(zoneName);
            modal.find('input[id="zoneUsername"]').val(zoneUsername);
            modal.find('input[id="zonePassword"]').val(zonePassword);
            modal.find('input[id="firstName"]').val(firstName);
            modal.find('input[id="lastName"]').val(lastName);
            modal.find('input[id="telephon"]').val(telephon);
            modal.find('input[id="email"]').val(email);
            modal.find('input[id="busdriverUsername"]').val(busdriverUsername);
            modal.find('input[id="busdriverPassword"]').val(busdriverPassword);
        }
    });
    //Same here but for the modal in zoneadmin_reservations.pug and the information that concern it
    $('.modal#modalreservations').modal({
        dismissible:true, //Here we want the user to be able to click outside the modal and it closes it
        ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
            var idReservation = trigger.data("idreservation");
            var firstnameReservation = trigger.data("firstnamereservation");
            var lastnameReservation = trigger.data("lastnamereservation");
            var telephonReservation = trigger.data("telephonreservation");
            var emailReservation = trigger.data("emailreservation");
            var remarksReservation = trigger.data("remarksreservation");
            modal.find('input[id="idReservation"]').val(idReservation);
            modal.find('input[id="firstnameReservation"]').val(firstnameReservation);
            modal.find('input[id="lastnameReservation"]').val(lastnameReservation);
            modal.find('input[id="telephonReservation"]').val(telephonReservation);
            modal.find('input[id="emailReservation"]').val(emailReservation);
            modal.find('input[id="remarksReservation"]').val(remarksReservation);
        }
    });
    //Query for our Search bar that are on top of all tables to filter
    $('#tableReservation').searchIt({
        useMaterializeCollapsible: false,
        itemSelector: 'tbody tr',
        searchTemplate: '<div class="input-field">' +
        '<input id="navbar-search" type="text">' +
        '<label for="navbar-search"><i class="material-icons small">search</i> Search</label>' +
        '</div>'
    });
    //Query for the datepicker for materialize
    var pickr = $('.datepicker').pickadate({
        min: true,
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        firstDay:1,
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        labelMonthNext: 'Mois suivant',
        labelMonthPrev: 'Mois précédent',
        labelMonthSelect: 'Sélectionner le mois',
        labelYearSelect: 'Sélectionner une année',
        monthsFull: [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ],
        monthsShort: [ 'Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec' ],
        weekdaysFull: [ 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi' ],
        weekdaysShort: [ 'Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam' ],
        weekdaysLetter: [ 'D', 'L', 'M', 'M', 'J', 'V', 'S' ],
        closeOnSelect: false, // Close upon selecting a date,
        format: 'dd.mm.yyyy', //Here we decide in which is the format of the date
        editable: true
    });
    $('select').material_select();
    $('.datepicker').click(function() {
        pickr.pickadate('open');
    });


    //Query for the timepicker for materialize
    $('.timepicker').pickatime({
        default: 'now', // Set default time: 'now', '1:30AM', '16:30'
        fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
        twelvehour: false, // Use AM/PM or 24-hour format
        donetext: 'OK', // text for done-button
        cleartext: 'Clear', // text for clear-button
        canceltext: 'Cancel', // Text for cancel-button
        autoclose: false, // automatic close timepicker
        ampmclickable: true, // make AM PM clickable
        aftershow: function(){} //Function for after opening timepicker
    });

});