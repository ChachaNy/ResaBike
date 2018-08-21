const assert = require('chai').assert;

const apiJourneyReturnAdmin = require('../modules/apiJourneyReturnAdmin');
const apiJourneyReturnClient = require('../modules/apiJourneyReturnClient');
const modulesDate = require('../modules/date');
const modulesEmail = require('../modules/email');
const modulesJourney = require('../modules/journey');
const modulesJourneyReservation = require('../modules/journeyReservation');
const modulesLine = require('../modules/line');
const modulesLineStation = require('../modules/lineStation');
const modulesLogin = require('../modules/login');
const modulesPersonContact = require('../modules/personContact');
const modulesReservation = require('../modules/reservation');
const modulesZone = require('../modules/zone');
const modulesStation = require('../modules/station');


//Creation-------------------------------------------------------------------------------------------------------------
    //Variables
        // zone
        var zone;
        var bodyZone = {
            zoneName: "zoneTest"
        }

        //personContact
        var personContact;

        //Login
        var bodyLogin = {
            username: "userTest",
            password: "test123456789"
        }
        var loginAdmin;
        var loginDriver;

        //line
        var line;
        var leg = {
            line:"testLine"
        }
        var bodyLine = {
            legs: [leg],
            from: "Sierre/Siders, gare",
            to: "Vissoie, poste"
        }

        //stations
        var bodyStation = {
            name:"stationTest",
            stopid: 10,
            x: 1000,
            y: 5000,
            count:0
        }
        var station;

        //lineStations
        var lineStation;

        //journey
        var journey;
        var horaire ="8:00";
        var journeyNumber = 5;

        //date
        var date
        var TodayDate = new Date();

        var day = TodayDate.getDate();
        var month = TodayDate.getMonth()+1;
        var year = TodayDate.getFullYear();
        if(day < 10)
        {
            day = "0"+day;
        }
        if(month < 10)
        {
            month = "0"+month;
        }

        //reservation
        var reservation;
        var firstName = "firstNameTest";
        var lastName = "lastNameTest";
        var telephon = "telephonTest";
        var email = "emailTest";
        var numberBikes = 10;
        var groupName = "TEST";
        var from = bodyLine.from;
        var to = bodyLine.to;
        var remarks = "Ceci est un unit test";
        var NPA = "1000";
        var country = "Test";

        //journeyReservation
        var journeyReservation;





    describe('Creation', function() {

        // Test the method insertZone(body)
        describe('insertZone(body)', function () {
            var result;
            before(function () {
                return modulesZone.insertZone(bodyZone).then((newZone) => {
                    zone = newZone;
                    return result = newZone;
                })
            });

            it('insertZone should return the same id_zone', function () {
                assert.equal(result.zoneName, bodyZone.zoneName);
            });

        });


        // Test the method insertEmptyPersonContact(zone)
        describe('insertEmptyPersonContact(zone)', function () {
            var result;
            before(function () {
                return modulesPersonContact.insertEmptyPersonContact(zone).then((newPersonContact) => {
                    personContact = newPersonContact;
                    return result = newPersonContact;
                })
            });

            it('insertEmptyPersonContact should return the same id_zone', function () {
                assert.equal(result.id_zone, zone.id_zone);
            });
        });


        // Test the method insertLoginFromSuperAdmin(body, zone)
        describe('insertLoginFromSuperAdmin(body, zone)', function () {
            var result;
            before(function () {
                return modulesLogin.insertLoginFromSuperAdmin(bodyLogin, zone).then((newLogin) => {
                    loginAdmin = newLogin;
                    return result = newLogin;
                })
            });

            it('insertLoginFromSuperAdmin should return the same username', function () {
                assert.equal(result.username, bodyLogin.username);
            });

            it('insertLoginFromSuperAdmin should return the same password', function () {
                assert.equal(result.password, bodyLogin.password);
            });

            it('insertLoginFromSuperAdmin should return the same id_zone', function () {
                assert.equal(result.id_zone, zone.id_zone);
            });

        });

        // Test the method insertdefaultLoginDriver(zone)
        describe('insertdefaultLoginDriver(zone)', function () {
            var result;
            before(function () {
                return modulesLogin.insertdefaultLoginDriver(zone).then((newLogin) => {
                    loginDriver = newLogin;
                    return result = newLogin;
                })
            });

            it('insertLoginFromSuperAdmin should return the same id_zone', function () {
                assert.equal(result.id_zone, zone.id_zone);
            });

        });

        // Test the method insertFindOrCreateLine(body, zone)
        describe('insertFindOrCreateLine(body, zone)', function () {

            var result;
            before(function () {
                return modulesLine.insertFindOrCreateLine(bodyLine, zone).then((newLine) => {
                    line = newLine;
                    return result = newLine;
                })
            });

            it('insertFindOrCreateLine should return the same lineName', function () {
                assert.equal(result[0].lineName, bodyLine.legs[0].line);
            });

            it('insertFindOrCreateLine should return the same from', function () {
                assert.equal(result[0].fromStation, bodyLine.from);
            });

            it('insertFindOrCreateLine should return the same to', function () {
                assert.equal(result[0].toStation, bodyLine.to);
            });

            it('insertFindOrCreateLine should return the same id_zone', function () {
                assert.equal(result[0].id_zone, zone.id_zone);
            });

        });


        // Test the method insertFindOrCreateStation(body)
        describe('insertFindOrCreateStation(body)', function () {

            var result;
            before(function () {
                return modulesStation.insertFindOrCreateStation(bodyStation).then((newStation) => {
                    station = newStation;
                    return result = newStation;
                })
            });

            it('insertFindOrCreateLine should return the same stationName', function () {
                assert.equal(result[0].stationName, bodyStation.name);
            });

            it('insertFindOrCreateLine should return the same stopid', function () {
                assert.equal(result[0].stopId, bodyStation.stopid);
            });

            it('insertFindOrCreateLine should return the same coordinateX', function () {
                assert.equal(result[0].coordinatedX, bodyStation.x);
            });

            it('insertFindOrCreateLine should return the same coordinateY', function () {
                assert.equal(result[0].coordinatedY, bodyStation.y);
            });

        });


        // Test the method insertFindOrCreateLine(station, line)
        describe('insertLineStation(station, line)', function () {

            var result;
            before(function () {
                return modulesLineStation.insertLineStation(station, line).then((newLineStation) => {
                    lineStation = newLineStation;
                    return result = newLineStation;
                })
            });

            it('insertLineStation should return the same id_line', function () {
                assert.equal(result.id_line, line[0].id_line);
            });

            it('insertLineStation should return the same id_station', function () {
                assert.equal(result.id_station, station[0].id_station);
            });

        });


        //Test the method findOrCreateJourney(number, time, idLine)
        describe('findOrCreateJourney(number, time, idLine)', function () {

            var result;
            before(function () {
                return modulesJourney.findOrCreateJourney(journeyNumber, horaire, line[0].id_line).then((newJourney) => {
                    journey = newJourney
                    return result = newJourney
                })
            });


            it('findOrCreateJourney should return a the same journeyNumber', function () {
                assert.equal(result[0].journeyNumber, journeyNumber);
            });

            it('findOrCreateJourney should return a the same horaire', function () {
                assert.equal(result[0].horaire, horaire);
            });

            it('findOrCreateJourney should return a the same id_line', function () {
                assert.equal(result[0].id_line, line[0].id_line);
            });

        });


        //Test the method findOrCreateDate(day, month, year)
        describe('findOrCreateDate(day, month, year)', function () {

            var result;
            before(function () {
                return modulesDate.findOrCreateDate(day, month, year).then((newDate) => {
                    date = newDate
                    return result = newDate
                })
            });


            it('findOrCreateDate should return a the same day', function () {
                assert.equal(result[0].day, day);
            });

            it('findOrCreateDate should return a the same month', function () {
                assert.equal(result[0].month, month);
            });

            it('findOrCreateDate should return a the same year', function () {
                assert.equal(result[0].year, year);
            });

        });


        // Test the method createReservation(firstName, lastName, email, numberBikes, groupName, from, remarks, to, NPA, country, idDate)
        describe('createReservation(firstName, lastName, email, numberBikes, groupName, from, remarks, to, NPA, country, idDate)', function () {
            var result;
            before(function () {
                return modulesReservation.createReservation(firstName, lastName, telephon, email, numberBikes, groupName, from, remarks, to, NPA, country, date[0].id_date).then((newReservation) => {
                    reservation = newReservation;
                    return result = newReservation;
                })
            });

            it('createReservation should return the same firstname', function () {
                assert.equal(result.firstName, firstName);
            });

            it('createReservation should return the same lastName', function () {
                assert.equal(result.lastName, lastName);
            });

            it('createReservation should return the same telephon', function () {
                assert.equal(result.telephon, telephon);
            });

            it('createReservation should return the same email', function () {
                assert.equal(result.email, email);
            });

            it('createReservation should return the same numberBikes', function () {
                assert.equal(result.numberBikes, numberBikes);
            });

            it('createReservation should return the same groupName', function () {
                assert.equal(result.groupName, groupName);
            });

            it('createReservation should return the same from', function () {
                assert.equal(result.from, from);
            });

            it('createReservation should return the same to', function () {
                assert.equal(result.to, to);
            });

            it('createReservation should return the same remarks', function () {
                assert.equal(result.remarks, remarks);
            });

            it('createReservation should return the same NPA', function () {
                assert.equal(result.NPA, NPA);
            });

            it('createReservation should return the same country', function () {
                assert.equal(result.country, country);
            });

            it('createReservation should return the same idDate', function () {
                assert.equal(result.id_date, date[0].id_date);
            });

        });


        // Test the method insertJourneyReservation(idJourney, IdReservation)
        describe('insertJourneyReservation(idJourney, IdReservation)', function () {

            var result;
            before(function () {
                return modulesJourneyReservation.insertJourneyReservation(journey[0].id_journey, reservation.id_reservation).then((newJourneyReservation) => {
                    journeyReservation = newJourneyReservation;
                    return result = newJourneyReservation;
                })
            });

            it('insertJourneyReservation should return the same idJourney', function () {
                assert.equal(result.id_journey, journey[0].id_journey);
            });

            it('insertJourneyReservation should return the same idReservation', function () {
                assert.equal(result.id_reservation, reservation.id_reservation);
            });

        });

    });




//Find

describe('Find', function() {

    //Variable
    var idJourney;
    var idReservation = 1;


    // Test the method getAllFromZoneToReservation()
    describe('getAllFromZoneToReservation()', function () {

        var result;
        before(function() {
            return modulesJourneyReservation.getAllFromZoneToReservation().then((reservations) => {
                return result = reservations
            })
        });

        it('getAllFromZoneToReservation should return an array if the DB is not empty', function () {
            assert.notEqual(result.count, 0);
        });

    });

    // Test the method findJourneyWithZoneInclude(idJourney)
    describe('findJourneyWithZoneInclude(idJourney)', function () {

        var result;
        before(function() {

            return modulesJourneyReservation.findJourneyWithZoneInclude(journey.id_journey).then((reservations) => {
                return result = reservations
            })
        });

        it('findJourneyWithZoneInclude should return an array with all the reservation with the same idJourney', function () {
            assert.equal(result.id_journey, journey.id_journey);
        });
    });

    // Test the method findLineWithZone(idZone)
    describe('findLineWithZone(idZone)', function () {

        var result;
        before(function() {

            return modulesLine.findLineWithZone(zone.id_zone).then((newLine) => {
                return result = newLine
            })
        });

        it('findLineWithZone should return the same id_zone', function () {
            assert.equal(result[0].id_zone, zone.id_zone);
        });
    });

    // Test the method getOneLineWithName(name)
    describe('getOneLineWithName(name)', function () {

        var result;
        before(function() {

            return modulesLine.getOneLineWithName(line[0].lineName).then((newLine) => {
                return result = newLine
            })
        });

        it('getOneLineWithName should return the same lineName', function () {
            assert.equal(result.lineName, line[0].lineName);
        });
    });

    // Test the method getAllLineWithZone()
    describe('getAllLineWithZone()', function () {

        var result;
        before(function() {

            return modulesLine.getAllLineWithZone().then((newLine) => {
                return result = newLine
            })
        });

        it('getAllLineWithZone should return an array if the DB is not empty', function () {
            assert.notEqual(result.count, 0);
        });
    });

    // Test the method getAllFromLineToReservation(id_zone, date)
    describe('getAllFromLineToReservation(id_zone, date)', function () {

        var result;
        before(function() {

            return modulesLine.getAllFromLineToReservation(zone.id_zone, date).then((newLine) => {
                return result = newLine
            })
        });

        it('getAllFromLineToReservation should the same id_zone', function () {
            assert.equal(result[0].id_zone, zone.id_zone);
        });

        it('getAllLineWithZone should return an array if the DB is not empty', function () {
            assert.notEqual(result.count, 0);
        });
    });






    // Test the method findLoginWithZoneNRole(idZone, idRole)
    describe('findLoginWithZoneNRole(idZone, idRole)', function () {

        var result;
        before(function() {

            return modulesLogin.findLoginWithZoneNRole(zone.id_zone, 2).then((newLogin) => {
                return result = newLogin
            })
        });

        it('findLoginWithZoneNRole should return the same id_zone', function () {
            assert.equal(result.id_zone, zone.id_zone);
        });

        it('findLoginWithZoneNRole should return the same id_role', function () {
            assert.equal(result.id_role, 2);
        });
    });

    // Test the method findLoginWithUsername(username)
    describe('findLoginWithUsername(username)', function () {

        var result;
        before(function() {

            return modulesLogin.findLoginWithUsername(bodyLogin.username).then((newLogin) => {
                return result = newLogin
            })
        });

        it('findLoginWithZoneNRole should return the same username', function () {
            assert.equal(result.username, bodyLogin.username);
        });
    });

    // Test the method findPersonContactWithZone(idZone)
    describe('findPersonContactWithZone(idZone)', function () {

        var result;
        before(function() {
            return modulesPersonContact.findPersonContactWithZone(zone.id_zone).then((newPersonContact) => {
                return result = newPersonContact
            })
        });

        it('findPersonContactWithZone should return the same id_zone', function () {
            assert.equal(result.id_zone, zone.id_zone);
        });
    });


    // Test the method getOneReservationWithIncludeForConf(idReservation)
    describe('getOneReservationWithIncludeForConf(idReservation)', function () {

        var result;
        before(function() {
            return modulesReservation.getOneReservationWithIncludeForConf(reservation.id_reservation).then((newReservation) => {
                return result = newReservation
            })
        });

        it('getOneReservationWithIncludeForConf should return the same id_reservation', function () {
            assert.equal(result.id_reservation, reservation.id_reservation);
        });
    });

    // Test the method getOneStationByName(name)
    describe('getOneStationByName(name)', function () {

        var result;
        before(function() {
            return modulesStation.getOneStationByName(station[0].stationName).then((newStation) => {
                return result = newStation
            })
        });

        it('getOneStationByName should return the same stationName', function () {
            assert.equal(result.stationName, station[0].stationName);
        });
    });

    // Test the method findStations(input)
    describe('findStations(input)', function () {
        var result;
        var input;
        before(function() {
            input = station.stationName;
            return modulesStation.findStations(input).then((newStation) => {
                return result = newStation
            })
        });

        it('findStations should contains the same input', function () {
            assert.equal(result.stationName, input);
        });
    });

    // Test the method checkZoneOfStation(fromStationLineStations, toStationLineStations)
    describe('checkZoneOfStation(fromStationLineStations, toStationLineStations)', function () {

        var result;
        var fromStationLineStations = [];
        var toStationLineStations = [];
        before(function() {
            var fromStationLineStation = {
                lineLinestation: lineStation
            };
            fromStationLineStations[0]= fromStationLineStation;
            toStationLineStations[0] = fromStationLineStation;
            return modulesStation.checkZoneOfStation(fromStationLineStations, toStationLineStations).then((okZone) => {
                return result = okZone
            })
        });

        it('checkZoneOfStation should return true', function () {
            assert.equal(result, true);
        });
    });



    // Test the method getOneZone(body)
    describe('getOneZone(body)', function () {

        var result;
        var body;
        before(function() {
            body = {
                id_zone: zone.id_zone
            };
            return modulesZone.getOneZone(body).then((newZone) => {
                return result = newZone
            })
        });

        it('getOneZone should contains the same id_zone', function () {
            assert.equal(result.id_zone, body.id_zone);
        });
    });

    // Test the method getOneZoneWithId(idZone)
    describe('getOneZoneWithId(idZone)', function () {

        var result;
        before(function() {
            return modulesZone.getOneZoneWithId(zone.id_zone).then((newZone) => {
                return result = newZone
            })
        });

        it('getOneZone should contains the same id_zone', function () {
            assert.equal(result.id_zone, zone.id_zone);
        });
    });

    // Test the method getAllZone()
    describe('getAllZone()', function () {

        var result;
        before(function() {
            return modulesZone.getAllZone().then((newZone) => {
                return result = newZone
            })
        });

        it('getAllZone should return an array if the DB is not empty', function () {
            assert.notEqual(result.count, 0);
        });
    });

    // Test the method getAllZoneWithInfos()
    describe('getAllZoneWithInfos()', function () {

        var result;
        before(function() {
            return modulesZone.getAllZoneWithInfos().then((newZone) => {
                return result = newZone
            })
        });

        it('getAllZone should return an array if the DB is not empty', function () {
            assert.notEqual(result.count, 0);
        });
    });


});

//Modification----------------------------------------------------------------
describe('Modify', function() {

    // Test the method updateLogin(body)
    describe('updateLogin(body)', function () {

        var result;
        before(function() {
            bodyLogin.idLogin = loginAdmin.id_login;
            return modulesLogin.updateLogin(bodyLogin).then((newLine) => {
                return result = newLine
            })
        });

        it('updateLogin should return 1 if the update worked', function () {
            assert.equal(result[0],1 );
        });

    });

    // Test the method  updateCountStation(stationTo, body)
    describe(' updateCountStation(stationTo, body)', function () {

        var result;

        before(function() {
            return modulesStation. updateCountStation(station[0].stationName, station).then((newStation) => {
                return result = newStation
            })
        });

        it('updateCountStation should return 1 if the update worked', function () {
            assert.equal(result[0],1 );
        });

    });

    // Test the method updateLoginZoneAdminFromModal(body)
    describe('updateLoginZoneAdminFromModal(loginToChange, body)', function () {

        var result;
        before(function() {
            var body = {
                zoneUsername: bodyLogin.username,
                zonePassword: bodyLogin.password
            }
            return modulesLogin.updateLoginZoneAdminFromModal(loginAdmin, body).then((newLine) => {
                return result = newLine
            })
        });

        it('updateLoginZoneAdminFromModal should return 1 if the update worked', function () {
            assert.equal(result[0],1 );
        });
    });

    // Test the method updateLoginBusDriverFromModal(body)
    describe('updateLoginBusDriverFromModal(loginToChange, body)', function () {

        var result;
        before(function() {
            var body = {
                busdriverUsername: bodyLogin.username,
                busdriverPassword: bodyLogin.password
            }
            return modulesLogin.updateLoginBusDriverFromModal(loginDriver, body).then((newLine) => {
                return result = newLine
            })
        });

        it('updateLoginBusDriverFromModal should return 1 if the update worked', function () {
            assert.equal(result[0],1 );
        });
    });


    // Test the method updatePersonContact(personContactToChanged, body)
    describe('updatePersonContact(personContactToChanged, body)', function () {

        var result;
        var body = {
            lastName: "lastNameTest",
            firstName: "firstNameTest",
            email: "personContactTest",
            telephon: "telephonTest"
        }
        before(function() {
            return modulesPersonContact.updatePersonContact(personContact, body).then((newLine) => {
                return result = newLine
            })
        });

        it('updatePersonContact should return 1 if the update worked', function () {
            assert.equal(result[0],1 );
        });
    });

    // Test the method updateContact(body)
    describe('updateContact(body)', function () {

        var result;
        var body = {
            lastname: "lastNameTest2",
            firstname: "firstNameTest2",
            email: "personContactTest2",
            telephon: "telephonTest2"
        }
        before(function() {
            body.idPersonContact = personContact.id_personContact;
            return modulesPersonContact.updateContact( body).then((newLine) => {
                return result = newLine
            })
        });

        it('updateContact should return 1 if the update worked', function () {
            assert.equal(result[0],1 );
        });
    });

    // Test the method confirmReservation(body)
    describe('confirmReservation(body)', function () {

        var result;
        var body = {
            state: 1,
        }
        before(function() {
          body.idReservation = reservation.id_reservation
            return modulesReservation.confirmReservation(body).then((newReservation) => {
                reservation = newReservation
                return result = newReservation
            })
        });

        it('acceptReservation should return 1 if the update worked', function () {
            assert.equal(result.state ,body.state );
        });
    });

    // Test the method updateZoneFromModal(idZone, zoneName)
    describe('updateZoneFromModal(idZone, zoneName)', function () {

        var result;
        var zoneName = "testNewZoneName";
        before(function() {
            return modulesZone.updateZoneFromModal(zone.id_zone,zoneName ).then((newReservation) => {
                return result = newReservation
            })
        });

        it('updateZoneFromModal should return 1 if the update worked', function () {
            assert.equal(result[0],1 );
        });
    });






});





//API------------------------------------------------------------------------------------------------------------------

//Variable
//apiJourneyReturnAdmin
var bodyReturnAdmin = {

    fromStation: from,
    toStation: to,
    dateRes: year+"-"+month+"-"+day
}

//apiJourneyReturnClient
var bodyReturnClient = {
    station: [from, to],
    dateRes: year+"-"+month+"-"+day,
    timeRes: horaire
}



describe('API', function() {


    //Test module apiJourneyReturnAdmin
    describe('apiJourneyReturnAdmin', function () {

        // Test the method searchLine(body)
        describe('searchLine(body)', function () {

            var result;
            before(function () {
                return apiJourneyReturnAdmin.searchLine(bodyReturnAdmin).then((stations) => {
                    return result = stations
                })
            });

            it('searchLine should return a the same fromStation', function () {
                assert.equal(result[0].from, bodyReturnAdmin.fromStation);
            });

            it('searchLine should return a the same toStation', function () {
                assert.equal(result[0].to, bodyReturnAdmin.toStation);
            });

        });
    });


    //Test module apiJourneyReturnClient
    describe('apiJourneyReturnClient', function () {

        //Test the method searchLine(body)
        describe('searchLine(body)', function () {

            var result;
            before(function () {
                return apiJourneyReturnClient.searchLine(bodyReturnClient).then((stations) => {
                    return result = stations
                })
            });

            it('searchLine should return a the same fromStation', function () {
                assert.equal(result[0].from, bodyReturnClient.station[0]);
            });

            it('searchLine should return a the same toStation', function () {
                assert.equal(result[0].to, bodyReturnClient.station[1]);
            });

            it('searchLine should return a the same date', function () {
                assert.equal(result[0].departure.substring(0, 10), bodyReturnClient.dateRes);
            });

        });

        //Test the method searchLineComp(from, to, date, time)
        describe('searchLineComp(from, to, date, time)', function () {

            var result;
            before(function () {
                return apiJourneyReturnClient.searchLineComp(bodyReturnClient.station[0], bodyReturnClient.station[1], bodyReturnClient.dateRes, bodyReturnClient.timeRes).then((stations) => {
                    return result = stations
                })
            });

            it('searchLine should return a the same fromStation', function () {
                assert.equal(result[0].from, bodyReturnClient.station[0]);
            });

            it('searchLine should return a the same toStation', function () {
                assert.equal(result[0].to, bodyReturnClient.station[1]);
            });

            it('searchLine should return a the same date', function () {
                assert.equal(result[0].departure.substring(0, 10), bodyReturnClient.dateRes);
            });

            it('searchLine should return type object', function () {
                assert.typeOf(result[0], 'object');
            });
        });
    });
});



//Email-------------------------------------------------------------------------------------------------------------


//Variable
//email
var to = "resabiketesting@gmail.com";
var sujbect = "Test";
var text = "Ceci est un unit test";


describe('Email', function() {



    //Test the method sendEmail(to, subject, text)
    /*describe('sendEmail(to, subject, text)', function () {

        var result;
        before(function() {
            return modulesEmail.sendEmail(to, sujbect, text).then((email) => {
                return result = email
            })
        });

        it('sendEmail should return a the "ok"', function () {
            assert.equal(result, 'ok');
        });

    });*/


    //Test the method createTextConfirmer(reservation, personContact)
    describe('createTextConfirmer(reservation, personContact)', function () {

        var result;
        before(function () {
            return modulesEmail.createTextConfirmer(reservation, personContact).then((text) => {
                return result = text
            })
        });

        it('createTextConfirmer should contain the reservation.from', function () {
            assert.include(result, reservation.from);
        });
        it('createTextConfirmer should contain the reservation.to', function () {
            assert.include(result, reservation.to);
        });
        it('createTextConfirmer should contain the reservation.day', function () {
            assert.include(result, reservation.dateReservation.dataValues.day);
        });
        it('createTextConfirmer should contain the reservation.dateReservation.dataValues.month', function () {
            assert.include(result, reservation.dateReservation.dataValues.month);
        });
        it('createTextConfirmer should contain the reservation.dateReservation.dataValues.year', function () {
            assert.include(result, reservation.dateReservation.dataValues.year);
        });
        it('createTextConfirmer should contain the reservation.reservationJourneyReservation[0].journeyReservation.dataValues.horaire', function () {
            assert.include(result, reservation.reservationJourneyReservation[0].journeyJourneyReservation.dataValues.horaire);
        });
        it('createTextConfirmer should contain the reservation.id_reservation', function () {
            assert.include(result, reservation.id_reservation);
        });
        it('createTextConfirmer should contain the personContact.telephon', function () {
            assert.include(result, personContact.telephon);
        });
        it('createTextConfirmer should contain the personContact.email', function () {
            assert.include(result, personContact.email);
        });
        it('createTextConfirmer should contain the personContact.firstName', function () {
            assert.include(result, personContact.firstName);
        });
        it('createTextConfirmer should contain the personContact.lastName', function () {
            assert.include(result, personContact.lastName);
        });

    });

    //Test the method createTextAccepter(reservation, personContact)
    describe('createTextAccepter(reservation, personContact)', function () {

        var result;
        before(function () {
            return modulesEmail.createTextAccepter(reservation, personContact).then((text) => {
                return result = text
            })
        });

        it('createTextAccepter should contain the reservation.from', function () {
            assert.include(result, reservation.from);
        });
        it('createTextAccepter should contain the reservation.to', function () {
            assert.include(result, reservation.to);
        });
        it('createTextAccepter should contain the reservation.day', function () {
            assert.include(result, reservation.dateReservation.dataValues.day);
        });
        it('createTextAccepter should contain the reservation.dateReservation.dataValues.month', function () {
            assert.include(result, reservation.dateReservation.dataValues.month);
        });
        it('createTextAccepter should contain the reservation.dateReservation.dataValues.year', function () {
            assert.include(result, reservation.dateReservation.dataValues.year);
        });
        it('createTextAccepter should contain the reservation.reservationJourneyReservation[0].journeyReservation.dataValues.horaire', function () {
            assert.include(result, reservation.reservationJourneyReservation[0].journeyJourneyReservation.dataValues.horaire);
        });
        it('createTextAccepter should contain the reservation.id_reservation', function () {
            assert.include(result, reservation.id_reservation);
        });
        it('createTextAccepter should contain the personContact.telephon', function () {
            assert.include(result, personContact.telephon);
        });
        it('createTextAccepter should contain the personContact.email', function () {
            assert.include(result, personContact.email);
        });
        it('createTextAccepter should contain the personContact.firstName', function () {
            assert.include(result, personContact.firstName);
        });
        it('createTextAccepter should contain the personContact.lastName', function () {
            assert.include(result, personContact.lastName);
        });
    });

    //Test the method createTextRefuser(reservation)
    describe('createTextRefuser(reservation)', function () {

        var result;
        before(function () {
            return modulesEmail.createTextRefuser(reservation).then((text) => {
                return result = text
            })
        });

        it('createTextRefuser should contain the reservation.from', function () {
            assert.include(result, reservation.from);
        });
        it('createTextRefuser should contain the reservation.to', function () {
            assert.include(result, reservation.to);
        });
        it('createTextRefuser should contain the reservation.day', function () {
            assert.include(result, reservation.dateReservation.dataValues.day);
        });
        it('createTextRefuser should contain the reservation.dateReservation.dataValues.month', function () {
            assert.include(result, reservation.dateReservation.dataValues.month);
        });
        it('createTextRefuser should contain the reservation.dateReservation.dataValues.year', function () {
            assert.include(result, reservation.dateReservation.dataValues.year);
        });
        it('createTextRefuser should contain the reservation.reservationJourneyReservation[0].journeyReservation.dataValues.horaire', function () {
            assert.include(result, reservation.reservationJourneyReservation[0].journeyJourneyReservation.dataValues.horaire);
        });
        it('createTextRefuser should contain the reservation.id_reservation', function () {
            assert.include(result, reservation.id_reservation);
        });
    });

    //Test the method createEmailContact(name, email, textClient)
    describe('createEmailContact(name, email, textClient)', function () {

        var name = "testName";
        var email = "testEmail";
        var textClient = "testTextClient";

        var result;
        before(function () {
            return modulesEmail.createEmailContact(name, email, textClient).then((text) => {
                return result = text
            })
        });

        it('createEmailContact should contain the name', function () {
            assert.include(result, name);
        });
        it('createEmailContact should contain the email', function () {
            assert.include(result, email);
        });
        it('createEmailContact should contain the textClient', function () {
            assert.include(result, textClient);
        });
    });

    //Test the method  createTextPersonContact(reservation)
    describe(' createTextPersonContact(reservation)', function () {

        var name = "testName";
        var email = "testEmail";
        var textClient = "testTextClient";

        var result;
        before(function () {
            return modulesEmail. createTextPersonContact(reservation).then((text) => {
                return result = text
            })
        });

        it('createTextPersonContact should contain the reservation.from', function () {
            assert.include(result, reservation.from);
        });
        it('createTextPersonContact should contain the reservation.to', function () {
            assert.include(result, reservation.to);
        });
        it('createTextPersonContact should contain the reservation.day', function () {
            assert.include(result, reservation.dateReservation.dataValues.day);
        });
        it('createTextPersonContact should contain the reservation.dateReservation.dataValues.month', function () {
            assert.include(result, reservation.dateReservation.dataValues.month);
        });
        it('createTextPersonContact should contain the reservation.dateReservation.dataValues.year', function () {
            assert.include(result, reservation.dateReservation.dataValues.year);
        });
        it('createTextPersonContact should contain the reservation.reservationJourneyReservation[0].journeyReservation.dataValues.horaire', function () {
            assert.include(result, reservation.reservationJourneyReservation[0].journeyJourneyReservation.dataValues.horaire);
        });
        it('createTextPersonContact should contain the reservation.id_reservation', function () {
            assert.include(result, reservation.id_reservation);
        });
    });

});












//Destruction



describe('Delete', function() {


    // Test the method deleteJourneyWithLine(idLine)
    describe('deleteJourneyWithLine(idLine)', function () {

        var result;
        before(function () {
            return modulesJourney.deleteJourneyWithLine(journey[0].id_line).then((deletedJourney) => {
                return result = deletedJourney
            })
        });

        it('getAllJourneyWithLine should return a 1 if the object is destroy', function () {
            assert.equal(result, 1);
        });

    });


    // Test the method deleteLineWithZone(idZone)
    describe('deleteLineWithZone(idZone)', function () {

        var result;
        before(function () {
            return modulesLine.deleteLineWithZone(zone.id_zone).then((deletedLine) => {
                return result = deletedLine
            })
        });

        it('deleteLineWithZone should return a 1 if the object is destroy', function () {
            assert.equal(result, 1);
        });
    });



    // Test the method deleteLoginWithZone(idZone)
    describe('deleteLoginWithZone(idZone)', function () {

        var result;
        before(function () {
            return modulesLogin.deleteLoginWithZone(zone.id_zone).then((deletedLogin) => {
                return result = deletedLogin
            })
        });

        it('deleteLineStationWithLine should return a 1 if the object is destroy', function () {
            assert.equal(result, 2);
        });
    });

    // Test the method deletePersonContactWithZone(idZone)
    describe('deletePersonContactWithZone(idZone)', function () {

        var result;
        before(function () {
            return modulesPersonContact.deletePersonContactWithZone(zone.id_zone).then((deletedPersonContact) => {
                return result = deletedPersonContact
            })
        });

        it('deleteLineStationWithLine should return a 1 if the object is destroy', function () {
            assert.equal(result, 1);
        });
    });

    // Test the method deleteZone(idZone)
    describe('deleteZone(idZone)', function () {

        var result;
        before(function () {
            return modulesZone.deleteZone(zone.id_zone).then((deletedZone) => {
                return result = deletedZone
            })
        });

        it('deleteLineStationWithLine should return a 1 if the object is destroy', function () {
            assert.equal(result, 1);
        });
    });


});

after(function () {
    return process.exit();
});