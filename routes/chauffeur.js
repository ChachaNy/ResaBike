var express = require('express');
var router = express.Router();
var journeyReservationModule = require('../modules/journeyReservation');
var lineModule = require('../modules/line');

/*Get all reservations for today */
router.get('/chauffeur', function(req, res) {
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
        if(req.session.user.id_role === 3){// only a zone admin can access to this page
            lineToReservations.forEach(function(lines) {
                lines.journeyLine.forEach(function (journey) {
                    journey.journeyJourneyReservation.forEach(function (reservation) {
                        if(reservation.reservationJourneyReservation !== null)
                        {
                            if(reservation.reservationJourneyReservation.state === 1)
                            {
                                reservationJourneyReservation.push(reservation)
                            }
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
            res.render('chauffeur',{reservations: AllLines, date: DateToday});
        }
        else{
            req.session.authenticated = false;
            res.redirect('/grp17/login');
        }
    })
});

/*Get all reservations for the chosen date */
router.get('/chauffeur/date=:dateChosen', function(req, res) {
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
        if(req.session.user.id_role === 3){// only a zone admin can access to this page
            lineToReservations.forEach(function(lines) {
                lines.journeyLine.forEach(function (journey) {
                    journey.journeyJourneyReservation.forEach(function (reservation) {
                        if(reservation.reservationJourneyReservation !== null)
                        {
                            if(reservation.reservationJourneyReservation.state === 1)
                            {
                                reservationJourneyReservation.push(reservation)
                            }
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
            res.render('chauffeur',{reservations: AllLines, date: DateToday});
        }
        else{
            req.session.authenticated = false;
            res.redirect('/grp17/login');
        }
    })
});






module.exports = router;