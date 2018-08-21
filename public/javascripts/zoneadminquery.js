
/* This document is used to pass from the client side to the server side with AJAX methods.*/

/* Is used to update a bus driver login from zoneadmin client side --> point to a .put method in the zoneadmin route*/
function updateBusDriver(){
    var idLogin = $('#idLogin').val();
    var username = $('#busdriverUsername').val();
    var password = $('#busdriverPassword').val();
    var loginDriverError =  $('#errorLoginDriver');
    var pwdDriverError = $('#errorPwdDriver');
    var errorFound = false;

    loginDriverError.hide();
    pwdDriverError.hide();

    if (username == 0){
        errorFound = true;
        loginDriverError.show();
    }

    if (password.length > 0 && password.length < 6) {
        errorFound = true;
        pwdDriverError.show();
    }

    if(errorFound == false){
        $.ajax({
            url: "/grp17/zoneadmin/zoneadmin_informations/login",
            type: 'PUT',
            data: {idLogin: idLogin, username: username, password: password},
            success: function(data) {
                console.log(data);
                setTimeout(function(){
                    window.location.reload(true);
                },500);
            }
        })
    }
}

/* Is used to update a PersonContact from zoneadmin client side --> point to a .put method in the zoneadmin route*/
function updatePersonContact(){
    var idPersonContact = $('#idPersonContact').val();
    var firstname = $('#firstname').val();
    var lastname = $('#lastname').val();
    var telephon = $('#telephon').val();
    var email = $('#email').val();


    $.ajax({
        url: "/grp17/zoneadmin/zoneadmin_informations/personContact",
        type: 'PUT',
        data: {idPersonContact: idPersonContact, firstname: firstname, lastname: lastname, telephon: telephon, email:email },
        success: function(data) {
            console.log(data);
            setTimeout(function(){
                window.location.reload(true);
            },500);
        }
    })
}

/* Is used to delete a line from zoneadmin client side --> point to a .delete method in the zoneadmin route*/
function deleteLine(id){
    console.log(id)
    $.ajax({
        url: "/grp17/zoneadmin/zoneadmin_lignes",
        type: 'DELETE',
        data: {id_line: id},
        success: function(data) {
            console.log(data)
            setTimeout(function(){
                window.location.reload(true);
            },500);
        }
    })
}

/* Is used to update the "state" column in reservation from zoneadmin client side --> point to a .put method in the zoneadmin route*/
function acceptReservation(){

    var idReservation = $('#idReservation').val();

    $.ajax({
        url: "/grp17/zoneadmin/zoneadmin_reservations",
        type: 'PUT',
        data: {state: 1, idReservation: idReservation},
        success: function(data) {
            console.log(data);
            setTimeout(function(){
                window.location.reload(true);
            },500);
        }
    })
}

/* Is used to delete a reservation from zoneadmin client side --> point to a .delete method in the zoneadmin route*/
function refuseReservation(){
    var idReservation = $('#idReservation').val();

    $.ajax({
        url: "/grp17/zoneadmin/zoneadmin_reservations",
        type: 'PUT',
        data: {state: 2, idReservation: idReservation},
        success: function(data) {
            console.log(data)
            setTimeout(function(){
                window.location.reload(true);
            },500);
        }
    })
}
