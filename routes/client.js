var express = require('express');
var router = express.Router();
var moment = require('moment');
var emailModule = require('../modules/email');
var stationModule = require('../modules/station');
var apiModule = require('../modules/apiJourneyReturnClient');
var lineModule = require('../modules/line');
var journeyModule = require('../modules/journey');
var dateModule = require('../modules/date');
var reservationModule = require('../modules/reservation');
var journeyReservationModule = require('../modules/journeyReservation');
var personContactModule = require('../modules/personContact');


var stations ={};
//GET Page horaires
router.get('/client_horaire', function(req, res, next) {
    res.render('client_horaire', {stations: stations, messageErreur:''});
});

//GET Page correspondances
router.get('/client_correspondances', function(req, res, next) {
    res.render('client_correspondances');
});

//GET Page formulaire
router.get('/client_formulaire', function(req, res, next) {
    res.render('client_formulaire');
});

//GET Page confirmation
router.get('/client_confirmation', function(req, res, next) {
    res.render('client_confirmation');
});

//GET Page contact
router.get('/client_contact', function(req, res, next) {
    res.render('client_contact');
});

router.get('/completion/input=:input', function(req, res, next){
    var nomStation = req.params.input;
    stationModule.findStations(nomStation).then((stations) =>{
        res.json(stations);
    });
});

/*POST to send email via contact form content */
router.post('/client_contact', function(req,res,next){
    emailModule.createEmailContact(req.body.name, req.body.email, req.body.textClient).then((text)=>{
        emailModule.sendEmail('resabiketesting@gmail.com', 'Contact / Kontakt', text).then(()=>{
            res.render('client_horaire', {stations: stations, messageErreur: 1});
        });
    })
});

/* Request the API to find all the connections possible the client ask with a from, to, date and time*/
router.post('/client_correspondances', function(req,res,next){
    //faire un find station pour un if avec le req.body.quelquechose -> chercher la station et if station!== null, je la montre
    //sinon erreur -> res render avec message erreur
    var from  = req.body.station[0];
    var to = req.body.station[1];
    var time = req.body.timeRes;
    var date = req.body.dateRes;
    var connectionsTable = new Array();
    var stationTheytaz = 'Sion, gare';
    var stationPoste = 'Sion, poste/gare';
    var theytazOperator = 'TSD-asdt';
    var postOperator = 'PAG';
    var isok = true;
    let wantedDateFormat = date.substr(3,2) + "/" + date.substr(0,2) + "/" + date.substr(6, 4);
    let wantedDate = new Date(wantedDateFormat);

    /* search the from station, if the return is null, redirect to the client_horaire page with an error message*/
    stationModule.getOneStationByName(from).then((fromStation) =>{
        if(fromStation !== null){
            /* search the to station, if the return is null, redirect to the client_horaire page with an error message*/
            stationModule.getOneStationByName(to).then((toStation) =>{

                Promise.all([stationModule.getOneStationByName(stationTheytaz), stationModule.getOneStationByName((stationPoste))])
                    .then((stations) => {
                        var TheytazStation = stations[0];
                        var PosteStation = stations[1];

                        if(toStation !== null) {

                            // Replace by Theytaz station
                            if (toStation.stationLineStation[0].lineLinestation.operator ==  theytazOperator && fromStation.stationName == stationPoste) {
                                fromStation = TheytazStation;
                                req.body.station[0] = stationTheytaz;
                            }
                            else if (fromStation.stationLineStation[0].lineLinestation.operator == theytazOperator && toStation.stationName == stationPoste) {
                                toStation = TheytazStation;
                                req.body.station[1] = stationTheytaz;
                            }

                            // Replace by Post station
                            if(toStation.stationLineStation[0].lineLinestation.operator == postOperator && fromStation.stationName == stationTheytaz ){
                                fromStation = PosteStation;
                                req.body.station[0] = stationPoste;
                            }
                            else if(fromStation.stationLineStation[0].lineLinestation.operator == postOperator && toStation.stationName == stationTheytaz){
                                toStation = PosteStation;
                                req.body.station[1] = stationPoste;
                            }

                            /* Check if the two stations are in the same zone (return a boolean) when ok render the next page, when not redirect with an error message*/
                            stationModule.checkZoneOfStation(fromStation.stationLineStation, toStation.stationLineStation).then((okZone)=>{
                                if(okZone === true){
                                    apiModule.searchLine(req.body).then((connections) =>{
                                        if(connections === undefined){
                                            res.render('client_horaire', {messageErreur: 6});
                                        }
                                        else{

                                            connections.forEach((connection) =>{
                                                if(connectionsTable.length==10){
                                                    return;
                                                }
                                                isok =true;
                                                connection.legs.forEach((leg)=>{

                                                    switch(leg.type){
                                                        case "post":
                                                            break;
                                                        case "bus":
                                                            break;
                                                        case undefined:
                                                            break;
                                                        default :
                                                            isok = false;
                                                            break;
                                                    }

                                                    switch(leg.operator){
                                                        case "PAG":
                                                            break;
                                                        case "TSD-asdt":
                                                            break;
                                                        case undefined:
                                                            break;
                                                        default:
                                                            isok = false;
                                                            break;
                                                    }

                                                })
                                                if(isok == true){
                                                    let corrDepDate = new Date(connection.departure);
                                                    corrDepDate.setHours(0,0,0,0);

                                                    if(corrDepDate.valueOf() == wantedDate.valueOf()){
                                                        connection["nextDay"] = false;
                                                    }else{
                                                        connection["nextDay"] = true;
                                                        wantedDate = corrDepDate;
                                                    }

                                                    connection.departure = corrDepDate.getDay() + " " + connection.departure.substr(8,2) + "." + connection.departure.substr(5,2)
                                                        + "." + connection.departure.substr(0,4) + " " + connection.departure.substr(11,8);
                                                    connectionsTable.push(connection);
                                                }
                                            })
                                        }
                                    }).then(() =>{
                                        if(connectionsTable.length == 0){
                                            res.render('client_horaire', {stations: connectionsTable, messageErreur: 6});
                                        }
                                        else{
                                            date = new Date(wantedDateFormat).getDay() + " " + date;
                                            res.render('client_correspondances', {from: from, to: to, time: time, date: date, stations: connectionsTable});
                                        }
                                    })

                                }
                                else{
                                    res.render('client_horaire', {stations: connectionsTable, messageErreur: 2});
                                }
                            })
                        }
                        else{
                            res.render('client_horaire', {stations: connectionsTable, messageErreur: 3});
                        }

                    });
            })
        }
        else{
            stationModule.getOneStationByName(to).then((toStation) =>{
                if(toStation !== null){
                    res.render('client_horaire', {stations: connectionsTable, messageErreur: 4});
                }
                else{
                    res.render('client_horaire', {stations: connectionsTable, messageErreur: 5});
                }
            })
        }
    })
});

/* Is activated when the client click on a "reserve" button, when he choose a connection */
router.post('/client_formulaire', function(req, res, next){
    var from = req.body.from;
    var to = req.body.to;
    var departure = req.body.departure;

    res.render('client_formulaire', {from:from, to:to, departure:departure});

});

/* This method is executed when the client click on the reserve button in the client_formulaire view. */
router.post('/client_confirmation', function(req, res, next){


    /* We tak all information from request to use it in the cascade method below
    *  We has to do it because some information were in only one variable (like departure contains date, time, day, month and year)*/
    var date = req.body.departure.substr(0,2)+'.'+req.body.departure.substr(3,2)+'.'+req.body.departure.substr(6,4);
    var time = req.body.departure.substr(11,5);
    var from = req.body.from;
    var to = req.body.to;
    var lastname = req.body.lastName;
    var firstName = req.body.firstName;
    var telephon = req.body.telephon;
    var email = req.body.email;
    var nbBike = req.body.nbBikes;
    var day = req.body.departure.substr(0,2);
    var month = req.body.departure.substr(3,2);
    var year = req.body.departure.substr(6,4);
    var remarks = req.body.remarks;
    var groupName = req.body.groupName;
    var NPA = req.body.NPA;
    var country = req.body.country;

    /* Here there is an api search to get all line of the journey asked by the client (le number of legs determine the number of line) */
    apiModule.searchLineComp(from, to, date, time).then((connections)=>{
        connections[0].legs.forEach((leg) =>{
            /* if the leg does not contains an argument stops, that means that the leg is not a line that we need to save*/

            if(leg.stops !== null) {

                /* we search le line with the name that is in the line argument of the api, find or Create a new journey, find or create a date, create the reservation
                *  create the join table, find the personContact for the email, get the reservation that was juste created for the mail recapitulatif
                *  create the email text with all info and send mail*/
                lineModule.getOneLineWithName(leg.line).then((line) =>{
                    journeyModule.findOrCreateJourney(leg.number, time, line.id_line).then((journey) =>{
                        dateModule.findOrCreateDate(day,month,year).then((date) =>{
                            stationModule.findStations(leg.exit.name).then((stationTo) =>{
                                stationModule.updateCountStation(leg.exit.name, stationTo).then((stationToUpdated) =>{
                                    stationModule.findStations(leg.name).then((stationFrom) =>{
                                        stationModule.updateCountStation(leg.name, stationFrom).then((stationFromUpdated)=>{
                                            reservationModule.createReservation(firstName,lastname,telephon,email,nbBike,groupName,leg.name,remarks,leg.exit.name, NPA, country, date[0].id_date, line.operator).then((reservation) =>{
                                                journeyReservationModule.insertJourneyReservation(journey[0].dataValues.id_journey, reservation.id_reservation).then((journeyReservation) =>{
                                                    personContactModule.findPersonContactWithZone(line.id_zone).then((personContact)=>{
                                                        reservationModule.getOneReservationWithIncludeForConf(reservation.id_reservation).then((reservationInclude) =>{
                                                            emailModule.createTextConfirmer(reservationInclude.dataValues,personContact.dataValues).then((text)=>{
                                                                emailModule.sendEmail(reservation.email, 'Votre demande de réservation / Your reservation request / Ihre Anfrage ', text).then(()=>{
                                                                    emailModule.createTextPersonContact(reservationInclude.dataValues).then((textPC) =>{
                                                                        emailModule.sendEmail(personContact.email, line.operator+'_'+date[0].year+'.'+date[0].month+'.'+date[0].day+'_'+line.lineName+'_'+journey[0].dataValues.journeyNumber , textPC).then(() =>{
                                                                            res.render('client_confirmation');
                                                                        })
                                                                    })
                                                                })
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })

                        })
                    })
                })
            }
        })
    })

});

module.exports = router;