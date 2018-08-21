module.exports = (sequelize, DataTypes) => {

    /* --  RESERVATION JOIN TABLE IN DB --*/

    var Reservation = sequelize.define('Reservation', {
        id_reservation: {
            type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telephon: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numberBikes: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        groupName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        from: {
            type: DataTypes.STRING,
            allowNull: false
        },
        to: {
            type: DataTypes.STRING,
            allowNull: false
        },
        remarks: {
            type: DataTypes.STRING,
            allowNull: true
        },
        NPA: {
            type: DataTypes.STRING,
            allowNull: true
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true
        },
        state: {
            type: DataTypes.INTEGER,
        },
        operator: {
            type: DataTypes.STRING,
        }
        });
    Reservation.associate = (models) => {
        Reservation.belongsTo(models.Date, {foreignKey: {name:'id_date', allowNull: false}, as:'dateReservation'}); // reservation has a FK id_date
        Reservation.hasMany(models.JourneyReservation, {foreignKey: {name:'id_reservation', allowNull: false}, as:'reservationJourneyReservation'}); // journeyResrvation has a FK id_reservation
    }



    return Reservation
};