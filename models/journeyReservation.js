module.exports = (sequelize, DataTypes) => {

    /* --  JOURNEYRESERVATION JOIN TABLE IN DB --*/

    var JourneyReservation = sequelize.define('JourneyReservation', {});

    JourneyReservation.associate = (models) => {
        JourneyReservation.belongsTo(models.Reservation, {foreignKey: {name:'id_reservation', allowNull: false}, as:'reservationJourneyReservation'}); // JourneyReservation has a FK id_reservation
        JourneyReservation.belongsTo(models.Journey, {foreignKey: {name:'id_journey', allowNull: true}, as:'journeyJourneyReservation'}); // JourneyReservation has a FK id_journeys
    }

    return JourneyReservation
};

