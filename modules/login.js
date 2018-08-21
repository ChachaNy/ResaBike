var models = require('../models');

module.exports= {
    /* -- LOGIN METHOD--*/

    /* Create an admin login from the superadmin platform (id_role --> 2)*/
    insertLoginFromSuperAdmin(body, zone){
        return new Promise(function(resolve, reject){
            models.Login.create({
                username: body.username,
                password: body.password,
                id_zone: zone.id_zone,
                id_role: 2
            }).then(function(login){
                resolve(login)
            })
        })
    },

    /*Create a default login for the bus driver when a zone is created by the super admin */
    insertdefaultLoginDriver(zone){
        return new Promise(function(resolve, reject){
            models.Login.create({
                username: 'chauffeur'+zone.id_zone,
                password: '123456789',
                id_zone: zone.id_zone,
                id_role: 3 // role --> bus driver
            }).then(function(login){
                resolve(login)
            })
        })
    },

    /* delete the login with an idZone*/
    deleteLoginWithZone(idZone){
        return new Promise(function(resolve, reject){
            models.Login.destroy({
                where:{id_zone: idZone}
            }).then(function(nbRow){
                resolve(nbRow)
            })
        })
    },

    /* update the entry in the DB from a zone admin plateform --> can change the login and the password. Not the id_role and id_zone*/
    updateLogin(body){
        return new Promise(function(resolve, reject){
            if(body.password == "")
            {
                models.Login.update({
                        username: body.username},
                    {where:{id_login: body.idLogin}}
                ).then(function(login){
                    resolve(login)
                })
            }else{
                models.Login.update({
                        username: body.username,
                        password: body.password},
                    {where:{id_login: body.idLogin}}
                ).then(function(login){
                    resolve(login)
                })
            }

        })
    },

    /* update the entry of the zone admin login from the superadmin plateform --> can change the login and the password. Not the id_role and id_zone*/
    updateLoginZoneAdminFromModal(loginToChanged, body){
        return new Promise(function(resolve, reject){
            if(body.zonePassword == "")
            {
                models.Login.update({
                        username: body.zoneUsername},
                    {where:{id_login: loginToChanged.id_login}}
                ).then(function(login){
                    resolve(login)
                })
            }else{
                models.Login.update({
                        username: body.zoneUsername,
                        password: body.zonePassword},
                    {where:{id_login: loginToChanged.id_login}}
                ).then(function(login){
                    resolve(login)
                })
            }

        })
    },
    /* update the entry of the bus driver login from the superadmin plateform --> can change the login and the password. Not the id_role and id_zone*/
    updateLoginBusDriverFromModal(loginToChanged, body){
        return new Promise(function(resolve, reject){
            if(body.busdriverPassword == "")
            {
                models.Login.update({
                        username: body.busdriverUsername},
                    {where:{id_login: loginToChanged.id_login}}
                ).then(function(login){
                    resolve(login)
                })
            }else{
                models.Login.update({
                        username: body.busdriverUsername,
                        password: body.busdriverPassword},
                    {where:{id_login: loginToChanged.id_login}}
                ).then(function(login){
                    resolve(login)
                })
            }

        })
    },

    /* Get from the database a login with a idZone and idRole*/
    findLoginWithZoneNRole(idZone, idRole){
        return new Promise(function (resolve, reject){
            models.Login.findOne({
                where: {
                    id_zone: idZone,
                    id_role: idRole
                }
            }).then(function(login){
                resolve(login)
            })
        })
    },

    /* Get a login with the username --> login method*/
    findLoginWithUsername(username){
        return new Promise(function (resolve, reject){
            models.Login.findOne({
                where: {
                    username: username
                }
            }).then(function(login){
                resolve(login)
            })
        })
    }
}