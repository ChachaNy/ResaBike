module.exports = (sequelize, DataTypes) => {

    /* --  STATION JOIN TABLE IN DB --*/

    var Station = sequelize.define('Station', {
        id_station: {
            type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
        },
        stationName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stopId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        coordinatedX: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        coordinatedY: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        count: {
            type: DataTypes.BIGINT,
            allowNull: false
        }

    });
    Station.associate = (models) => {
        Station.hasMany(models.LineStation, {foreignKey: {name:'id_station', allowNull: false}, as:'stationLineStation'}); // linestation has a FK id_station
    }



    return Station
}