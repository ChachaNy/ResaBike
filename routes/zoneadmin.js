var express = require('express');
var router = express.Router();
var zoneModule = require('../modules/zone');
var lineModule = require('../modules/line');
var apiSearch = require('../modules/apiJourneyReturnAdmin');
var stationModule = require('../modules/station');
var lineStationModule = require('../modules/lineStation');
var loginModule = require('../modules/login');
var personContactModule = require('../modules/personContact');
var journeyReservationModule = require('../modules/journeyReservation');
var reservationModule = require('../modules/reservation');
var journeyModule = require('../modules/journey');
var email = require('../modules/email');

/* GET zoneAdmin page . */
router.get('/zoneadmin_lignes', (req,res,next)=>{
    /* to display the line in the view, we search all the line that are in the zone of the session.user*/
    lineModule.findLineWithZone(req.session.user.id_zone).then((lines) => {
        var messageErreur ='';
        if(req.session.user.id_role === 2){ // only a zone admin can access to this page
            res.render('zoneadmin_lignes',{lines: lines, messageErreur:messageErreur});
        }
        else{
            req.session.authenticated = false;
            res.redirect('/grp17/login');
        }
    })
});

//GET informations
// It get the personContact and the busDriver login of the session.user's zone
router.get('/zoneadmin_informations', (req,res,next)=>{
    personContactModule.findPersonContactWithZone(req.session.user.id_zone).then((personContact) => {
        loginModule.findLoginWithZoneNRole(req.session.user.id_zone,3).then((login) => {
            if(req.session.user.id_role === 2){// only a zone admin can access to this page
                res.render('zoneadmin_informations',{personContact : personContact, login: login});
            }
            else{
                req.session.authenticated = false;
                res.redirect('/grp17/login');
            }

        })
    })
});

/*Get all reservations for today */
router.get('/zoneadmin_reservations', function(req, res) {
    var today = new Date();
    var date = {
        day: today.getDate(),
        month: today.getMonth()+1,
        year: today.getFullYear(),
        daysOfWeek: today.getDay()
    }
    if(date.day < 10){
        date.day = '0' + date.day
    }
    if(date.month < 10){
        date.month = '0' + date.month
    }

    var DateToday = date.daysOfWeek+"/"+date.day+"."+date.month+"."+date.year;

    var reservationJourneyReservation = [];
    var journeyLine = [];
    var AllLines = [];

    lineModule.getAllFromLineToReservation(req.session.user.id_zone, date).then((lineToReservations) => {
        if(req.session.user.id_role === 2){// only a zone admin can access to this page
            lineToReservations.forEach(function(lines) {
                lines.journeyLine.forEach(function (journey) {
                   journey.journeyJourneyReservation.forEach(function (reservation) {
                       if(reservation.reservationJourneyReservation !== null)
                       {
                           reservationJourneyReservation.push(reservation)
                       }
                   });
                    if(reservationJourneyReservation.length > 0)
                    {
                        journey.journeyJourneyReservation = reservationJourneyReservation;
                        journeyLine.push(journey)
                    }
                    reservationJourneyReservation = [];
                });
                if(journeyLine.length > 0)
                {
                    lines.journeyLine = journeyLine;
                    AllLines.push(lines);
                }
                journeyLine = [];
            });
            res.render('zoneadmin_reservations',{reservations: AllLines, date: DateToday});
        }
        else{
            req.session.authenticated = false;
            res.redirect('/grp17/login');
        }
    })
});

/*Get all reservations for the chosen date */
router.get('/zoneadmin_reservations/date=:dateChosen', function(req, res) {
    var dateChosen = req.params.dateChosen;
    var dateString = dateChosen.substring(3,5)+ "/" + dateChosen.substring(0,2) + "/" + dateChosen.substring(6,10);
    var today = new Date(dateString);

    if(dateChosen.substring(11,12) == 1){
        today.setDate(today.getDate()+1)
    }else{
        today.setDate(today.getDate()-1)
    }

    var date = {
        day: today.getDate(),
        month: today.getMonth()+1,
        year: today.getFullYear(),
        daysOfWeek: today.getDay()
    }

    if(date.day < 10){
        date.day = '0' + date.day
    }
    if(date.month < 10){
        date.month = '0' + date.month
    }
    var DateToday = date.daysOfWeek+"/"+date.day+"."+date.month+"."+date.year;

    var reservationJourneyReservation = [];
    var journeyLine = [];
    var AllLines = [];


    lineModule.getAllFromLineToReservation(req.session.user.id_zone, date).then((lineToReservations) => {
        if(req.session.user.id_role === 2){// only a zone admin can access to this page
            lineToReservations.forEach(function(lines) {
                lines.journeyLine.forEach(function (journey) {
                    journey.journeyJourneyReservation.forEach(function (reservation) {
                        if(reservation.reservationJourneyReservation !== null)
                        {
                            reservationJourneyReservation.push(reservation)
                        }
                    });
                    if(reservationJourneyReservation.length > 0)
                    {
                        journey.journeyJourneyReservation = reservationJourneyReservation;
                        journeyLine.push(journey)
                    }
                    reservationJourneyReservation = [];
                });
                if(journeyLine.length > 0)
                {
                    lines.journeyLine = journeyLine;
                    AllLines.push(lines);
                }
                journeyLine = [];
            });
            res.render('zoneadmin_reservations',{reservations: AllLines, date: DateToday});
        }
        else{
            req.session.authenticated = false;
            res.redirect('/grp17/login');
        }
    })
});


/* Same method than in the superadmin route, but the admin can not choose the zone of the line. it will automatically
* be the session.user's zone.*/
router.post('/zoneadmin_lignes', function(req,res, next){
    zoneModule.getOneZoneWithId(req.session.user.id_zone).then((zone) =>{
        apiSearch.searchLine(req.body).then((connectionTable) =>{
            if(connectionTable.length === 0){
                lineModule.findLineWithZone(req.session.user.id_zone).then((lines) => {
                    res.render('zoneadmin_lignes', {lines: lines,messageErreur: "Cette ligne n'est pas disponible durant cette période ou les stations sélectionnées ne font pas partie de la meme ligne."
                    });
                })
            }
            else if(connectionTable[0].legs.length<=2){
                lineModule.insertFindOrCreateLine(connectionTable[0], zone).then((line) =>{
                    stationModule.insertFindOrCreateStation(connectionTable[0].legs[0]).then((stationDep) =>{
                        lineStationModule.insertLineStation(stationDep,line).then(() =>{
                            connectionTable[0].legs[0].stops.forEach((stop) =>{
                                stationModule.insertFindOrCreateStation(stop).then((station) =>{
                                    lineStationModule.insertLineStation(station, line)
                                })
                            })
                        }).then(() =>{
                            stationModule.insertFindOrCreateStation(connectionTable[0].legs[1]).then((stationsArr) =>{
                                lineStationModule.insertLineStation(stationsArr, line).then(() =>{
                                    res.redirect('/grp17/zoneadmin/zoneadmin_lignes')
                                })
                            })
                        })
                    })
                })
            }
            else{
                lineModule.findLineWithZone(req.session.user.id_zone).then((lines) => {
                    res.render('zoneadmin_lignes', {
                        lines: lines,
                        messageErreur: 'Les multi-ligne ne sont pas autorisés. Veuillez entrer des stations présentes dans une seule ligne'
                    });
                })
            }
        })
    })
});

/*Update Bus driver login*/
router.put('/zoneadmin_informations/login',(req, res) =>{
    loginModule.updateLogin(req.body).then((busLogin) =>{
        res.send(busLogin);
    })
});

/*Update PersonContact*/
router.put('/zoneadmin_informations/personContact',(req, res) =>{
    personContactModule.updateContact(req.body).then((personContact) =>{
        res.send(personContact);
    })
});

/*DELETE line, journey and lineStations*/
router.delete('/zoneadmin_lignes',(req, res)=>{
    let idLine = req.body.id_line;
    journeyModule.deleteJourneyWithLine(idLine).then((nbrow) =>{
        lineModule.deleteLine(idLine).then(() =>{
            res.send(idLine);
        })
    })
});

/*Update Reservation*/
router.put('/zoneadmin_reservations',(req, res) =>{
    /* because we send an email with some info, we have to search the personContact of this reservation (the one of the
    current zone. We send the "acceptResrvation" method that is in the module reservation and create text for the
    accepted email, and send the email*/
    personContactModule.findPersonContactWithZone(req.session.user.id_zone).then((personContact)=>{
        reservationModule.confirmReservation(req.body).then((reservation) =>{
            if(req.body.state == 1){
                email.createTextAccepter(reservation.dataValues, personContact.dataValues).then((text) =>{
                    email.sendEmail(reservation.email, 'Réservation acceptée / Booking accepted / Reservierung akzeptiert', text).then(()=>{
                        console.log("email envoyé");
                        res.send(reservation);
                    });
                })
            }else if(req.body.state == 2){
                email.createTextRefuser(reservation.dataValues, personContact.dataValues).then((text) => {
                    email.sendEmail(reservation.email, 'Réservation refusée / Booking denied / Reservierung abgelehnt', text).then(() => {
                        console.log("email envoyé");
                        res.send(reservation);
                    });
                })
            }
        })
    })
});

module.exports = router;