var models = require('../models');

module.exports= {

    /* -- PERSONCONTACT METHOD--*/

    /* insert a new empty entry in the database from the superadmin plateform when a new zone is created--> zone admin can not create a new one. Juste update it*/
    insertEmptyPersonContact(zone) {
        return new Promise(function (resolve, reject) {
            models.PersonContact.create({
                lastName: '',
                firstName: '',
                email: '',
                telephon: '',
                id_zone: zone.id_zone
            }).then(function (personcontact) {
                resolve(personcontact) // c'est ce qu'il va se passer si c'est juste
            })
        })
    },

    /* delete an entry with the same id_zone than the parameter*/
    deletePersonContactWithZone(idZone) {
        return new Promise(function (resolve, reject) {
            models.PersonContact.destroy({
                where: {id_zone: idZone}
            }).then(function (nbRow) {
                resolve(nbRow)
            })
        })
    },

    /* update the table personContact in the database from a superadmin plateform--> cannot change the id_zone*/
    updatePersonContact(personContactToChanged, body) {
        return new Promise(function (resolve, reject) {
            models.PersonContact.update({
                    lastName: body.lastName,
                    firstName: body.firstName,
                    email: body.email,
                    telephon: body.telephon
                },
                {where: {id_personContact: personContactToChanged.id_personContact}}
            ).then(function(personContact){
                resolve(personContact)
            })
        })
    },

    /* update the table personContact in the database from a zoneadmin plateform--> cannot change the id_zone*/
    updateContact(body) {
        return new Promise(function (resolve, reject) {
            models.PersonContact.update({
                    lastName: body.lastname,
                    firstName: body.firstname,
                    email: body.email,
                    telephon: body.telephon
                },
                {where: {id_personContact: body.idPersonContact}}
            ).then(function(personContact){
                resolve(personContact)
            })
        })
    },

    /* get the personContact of a zone corresponding to the parameter*/
    findPersonContactWithZone(idZone){
        return new Promise(function (resolve, reject){
            models.PersonContact.findOne({
                where: {
                    id_zone: idZone
                }
            }).then(function(personContact){
                resolve(personContact)
            })
        })
    }
}