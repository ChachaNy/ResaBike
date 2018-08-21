module.exports = (sequelize, DataTypes) => {

    /* --  LINESTATION JOIN TABLE IN DB --*/

    var LineStation = sequelize.define('LineStation', {});
    LineStation.associate = (models) => {
        LineStation.belongsTo(models.Line, {foreignKey: {name:'id_line', allowNull: false}, as:'lineLinestation'}); // linestation has a FK id_line
        LineStation.belongsTo(models.Station, {foreignKey: {name:'id_station', allowNull: false}, as:'stationLineStation'}); // linestation has a FK id_station
    }

    return LineStation
};