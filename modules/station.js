var models = require('../models');

module.exports= {

    /* -- STATION METHOD--*/

    /* To search in the DB if the station already exist. If not, create a new entry*/
    insertFindOrCreateStation(body){
        return new Promise(function(resolve, reject){
            models.Station.findOrCreate({
                where: {
                    stationName: body.name
                },
                defaults: {
                    stopId: body.stopid,
                    coordinatedX: body.x,
                    coordinatedY: body.y,
                    count: 0
                }
            }).then(function(station){
                resolve(station)
            })
        })
    },

    /* Return a station that corresponds to the name in paramete*/
    getOneStationByName(name){
        return new Promise(function (resolve, reject){
            models.Station.findOne({
                where: {
                    stationName: name
                },
                include: {
                    model: models.LineStation,
                    as: 'stationLineStation',
                    include: {
                        model: models.Line,
                        as: 'lineLinestation'
                    }
                }
            }).then(function(station){
                resolve(station)
            })
        })
    },

    /* Find entries in DB that have a name like the input in parameter --> used for autoCompletion*/
    findStations(input){
        return new Promise(function(resolve, reject){
            models.Station.findAll({
                where: {
                    stationName: {$like: input+'%'}
                },
                order: [
                    ['count', 'DESC']
                ]
            }).then(function(stations){
                resolve(stations)
            })
        })
    },

    /* Check if the station are in the same zone or not. Return a boolean --> used in research of connection when a client do a reservation*/
    checkZoneOfStation(fromStationLineStations, toStationLineStations){
        return new Promise(function(resolve, reject){
            var okZone =false;

            fromStationLineStations.forEach((fromStationLineStation) =>{
                toStationLineStations.forEach((toStationLineStation) =>{
                    if(fromStationLineStation.lineLinestation.dataValues.id_zone === toStationLineStation.lineLinestation.dataValues.id_zone){
                        okZone=true;
                    }
                })
            })
            resolve(okZone);
        })
    },


    /* update the table station in the database when a reservation is done --> ++1 column count*/
    updateCountStation(stationTo, body) {
        return new Promise(function (resolve, reject) {
            models.Station.update({
                    count: body[0].count + 1
                },
                {where: {stationName: stationTo}}
            ).then(function(station){
                resolve(station)
            })
        })
    },
}