var express = require('express');
var router = express.Router();
var zoneModule = require('../modules/zone');
var loginModule = require('../modules/login');
var lineModule = require('../modules/line');
var apiSearch = require('../modules/apiJourneyReturnAdmin');
var stationModule = require('../modules/station');
var lineStationModule = require('../modules/lineStation');
var personContactModule = require('../modules/personContact');
var journeyReservationModule = require('../modules/journeyReservation');
var journeyModule = require('../modules/journey');

/* GET superadmin_lignes page . */
router.get('/superadmin_lignes', (req,res,next)=>{
    zoneModule.getAllZone().then((zones)=>{
        lineModule.getAllLineWithZone().then((lines) => {
            if(req.session.user.id_role === 1){
                res.render('superadmin_lignes',{lines: lines, zones: zones, messageErreur: ''});
            }
            else{
                req.session.authenticated = false;
                res.redirect('/grp17/login');
            }
        })
    })
});

/* GET superadmin_zones page*/
router.get('/superadmin_zones', (req,res,next)=>{
    zoneModule.getAllZoneWithInfos().then((zones) => {
        if(req.session.user.id_role === 1) {
            res.render('superadmin_zones', {zones: zones});
        }
        else{
            req.session.authenticated = false;
            res.redirect('/grp17/login');
        }
    })
});

/* GET superadmin_reservations page*/
router.get('/superadmin_reservations', function(req, res, next) {
    journeyReservationModule.getAllFromZoneToReservation().then((zoneToReservations) => {
        zoneToReservations.forEach((reservation) =>{
            let dateFormat = reservation.reservationJourneyReservation.dateReservation.month + "/" + reservation.reservationJourneyReservation.dateReservation.day + "/" + reservation.reservationJourneyReservation.dateReservation.year;
            let date = new Date(dateFormat);
            reservation.reservationJourneyReservation.dateReservation["dayOfWeek"] = date.getDay();
        })
        if(req.session.user.id_role === 1) {
            res.render('superadmin_reservations',{zoneToReservations: zoneToReservations});
        }
        else{
            req.session.authenticated = false;
            res.redirect('/grp17/login');
        }
    })
});


/* POST new zone */
router.post('/superadmin_zones', function(req, res, next){
    let errorFound = false;

    if(req.body.password.length > 0 && req.body.password.length < 6){
        errorFound = true;
        zoneModule.getAllZoneWithInfos().then((zones) => {
            res.render('superadmin_zones', {pwdErreur: "Le mot de passe chauffeur doit être vide (pas modifié) ou minimum 6 caractères", zones: zones});
        })
    }

    if(errorFound == false){
        zoneModule.insertZone(req.body).then((zone) =>{ //Insert new zone in db
            loginModule.insertLoginFromSuperAdmin(req.body,zone).then(() =>{
                // insert a zone admin login in db for the just created zone
                personContactModule.insertEmptyPersonContact(zone).then(() =>{
                    // insert a empty personContact in db for the just created zone
                    loginModule.insertdefaultLoginDriver(zone).then(() =>{
                        // Insert a default bus drive login in the DB
                        res.redirect('/grp17/superadmin/superadmin_zones');
                    })
                })
            })
        })
    }
});

/* POST new line*/
router.post('/superadmin_lignes', function(req,res, next){
    zoneModule.getOneZone(req.body).then((zone) =>{
        // search the line in the API and create a new line, all stations and lineStation.
        apiSearch.searchLine(req.body).then((connectionTable) =>{
            if(connectionTable.length === 0){
                zoneModule.getAllZone().then((zones)=>{
                    lineModule.getAllLineWithZone().then((lines) => {
                        if(req.session.user.id_role === 1){
                            res.render('superadmin_lignes',{lines: lines, zones: zones, messageErreur: 'Cette ligne ne peut pas être sélectionnée durant cette période'});
                        }
                        else{
                            req.session.authenticated = false;
                            res.redirect('/grp17/login');
                        }
                    })
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
                                    res.redirect('/grp17/superadmin/superadmin_lignes')
                                })
                            })
                        })
                    })
                })
            }
            else{
                // redirection if the asked line is a multi line
                zoneModule.getAllZone().then((zones)=>{
                    lineModule.getAllLineWithZone().then((lines) => {
                        if(req.session.user.id_role === 1){
                            res.render('superadmin_lignes',{lines: lines, zones: zones, messageErreur: 'Les multi-ligne ne sont pas autorisés. Veuillez entrer des stations présentes dans une seule ligne'});
                        }
                        else{
                            req.session.authenticated = false;
                            res.redirect('/grp17/login');
                        }
                    })
                })
            }
        })
    })
});

/*DELETE line, all journey and lineStation*/
router.delete('/superadmin_lignes',(req, res)=>{
    let idLine = req.body.id_line;
    journeyModule.deleteJourneyWithLine(idLine).then((nbrow) =>{
        lineModule.deleteLine(idLine).then(() =>{
            res.send(idLine);
        })
    })
});

/*DELETE zone, login, line, station and lineStation and the personContact*/
router.delete('/superadmin_zones',(req, res)=>{
    let idZone = req.body.id_zone;
    loginModule.deleteLoginWithZone(idZone).then(() =>{
        lineModule.findLineWithZone(idZone).then((lines) =>{
            lines.forEach((line) =>{
                    journeyModule.deleteJourneyWithLine(line.id_line);
            })
        }).then(() =>{
            lineModule.deleteLineWithZone(idZone).then(() =>{
                personContactModule.deletePersonContactWithZone(idZone).then(() =>{
                    zoneModule.deleteZone(idZone)
                })
            })
        })
    }).then(()=>{
        res.send(idZone);
    })
});

/*Update infos*/
router.put('/superadmin_zones',(req, res) =>{
    zoneModule.updateZoneFromModal(req.body.idZone, req.body.zoneName).then((zone) => {
        return loginModule.findLoginWithZoneNRole(req.body.idZone, 2)
    }).then((zoneAdminLogin) => {
        return loginModule.updateLoginZoneAdminFromModal(zoneAdminLogin, req.body)
    }).then((zoneLogin) => {
        return personContactModule.findPersonContactWithZone(req.body.idZone)
    }).then((personContact) => {
        return personContactModule.updatePersonContact(personContact, req.body)
    }).then((personContactChanged) => {
        return loginModule.findLoginWithZoneNRole(req.body.idZone, 3)
    }).then((busDriverLogin) => {
        return loginModule.updateLoginBusDriverFromModal(busDriverLogin, req.body)
    }).then((busLogin) =>{
        res.send(busLogin);
    })
});


module.exports = router;