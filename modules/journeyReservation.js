var models = require('../models');

module.exports= {


    /* -- JOURNEYRESERVATION METHOD --*/

    /* Get all information with includes. Take info from the table zone, line, journey, journeyReservation, reservation, date*/
    getAllFromZoneToReservation(){
      return new Promise(function(resolve, reject){
          models.JourneyReservation.findAll({
              include: [{
                  model: models.Reservation,
                  as: 'reservationJourneyReservation',
                  include: [{
                      model: models.Date,
                      as: 'dateReservation'
                  }]
              },{
                  model: models.Journey,
                  as: 'journeyJourneyReservation',
                  include: [{
                      model: models.Line,
                      as: 'journeyLine',
                      include: [{
                          model: models.Zone,
                          as: 'zoneLine'
                      }]
                  }]
              }]
          }).then(function(zoneToReservations){
              resolve(zoneToReservations)
          })
      })
    },

    /* Get all information with includes. Take info from the table journeyReservation, reservation, date*/
    findJourneyWithZoneInclude(idJourney){
        return new Promise(function (resolve, reject){
            models.JourneyReservation.findAll({
                where: {
                    id_journey: idJourney
                },
                include: [{
                    model: models.Reservation,
                    as: 'reservationJourneyReservation',
                    include: [{
                        model: models.Date,
                        as: 'dateReservation'
                    }]
                }]
            }).then(function(Reservations){
                resolve(Reservations)
            })
        })
    },

    /* Insert a new entry in DB*/
    insertJourneyReservation(idJourney, IdReservation) {
        return new Promise(function(resolve, reject){
            models.JourneyReservation.create({
                id_reservation: IdReservation,
                id_journey: idJourney
            }).then(function(journeyReservation){
                resolve(journeyReservation)
            })
        })
    }

}