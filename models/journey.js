module.exports = (sequelize, DataTypes) => {

    /* --  JOURNEY TABLE IN DB --*/

    var Journey = sequelize.define('Journey', {
        id_journey: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        journeyNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        horaire: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    Journey.associate = (models) => {
        Journey.hasMany(models.JourneyReservation, {foreignKey: {name:'id_journey', allowNull: false}, as:'journeyJourneyReservation'}); // table JourneyReservation has FK id_journey
        Journey.belongsTo(models.Line, {foreignKey: {name: 'id_line', allowNull: false}, as:'journeyLine'}); // table journey has a FK id_line
    }


    return Journey
};
