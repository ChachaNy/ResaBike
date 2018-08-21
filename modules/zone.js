var models = require('../models');

module.exports= {
    /* -- ZONE METHOD--*/

    /* Insert a new entry in the DB*/
    insertZone(body){
        return new Promise(function (resolve, reject) {
            models.Zone.create({
                zoneName: body.zoneName
            }).then(function(zone){
                resolve(zone)
            })
        })
    },

    /*Delete the entry with the id in parameter*/
    deleteZone(idZone){
        return new Promise(function(resolve, reject){
            models.Zone.destroy({
                where:{id_zone: idZone}
            }).then(function(nbRow){
                resolve(nbRow)
            })
        })
    },

    /* Update the entry from the superadmin plateform*/
    updateZoneFromModal(idZone, zoneName){
        return new Promise(function(resolve, reject){
            models.Zone.update({
                zoneName: zoneName},
            {where: {id_zone: idZone}
            }).then(function(zone){
                resolve(zone)
            })
        })
    },

    /* Get a zone with its id (complete body in parameter)*/
    getOneZone(body){
        return new Promise(function (resolve, reject){
            models.Zone.findOne({
                where: {
                    id_zone: body.id_zone
                }
            }).then(function(zone){
                resolve(zone)
            })
        })
    },

    /* Get a zone with its id (idZone in parameter)*/
    getOneZoneWithId(idZone){
        return new Promise(function (resolve, reject){
            models.Zone.findOne({
                where: {
                    id_zone: idZone
                }
            }).then(function(zone){
                resolve(zone)
            })
        })
    },

    /*Get all the zone that are in the DB*/
    getAllZone(){
        return new Promise(function (resolve, reject){
            models.Zone.findAll().then(function(zones){
                resolve(zones)
            })
        })
    },

    /* Get all reservation with login include and personContact*/
    getAllZoneWithInfos(){
        return new Promise(function (resolve, reject){
            models.Zone.findAll({
                include: [{
                    model: models.Login,
                    as: 'zoneLogin',
                    where: {
                        id_zone: {$col: 'Zone.id_zone'}
                    }
                },{
                    model: models.PersonContact,
                    as: 'zonePersonContact',
                    where: {
                        id_zone: {$col: 'Zone.id_zone'}
                    }
                }]
            }).then(function(zones){
                resolve(zones)
            })
        })
    }
}