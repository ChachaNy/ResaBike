module.exports = (sequelize, DataTypes) => {

    /* --  LINE TABLE IN DB --*/

    var Line = sequelize.define('Line', {
        id_line: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        lineName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fromStation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        toStation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        operator: {
            type: DataTypes.STRING,
        }
    });
    Line.associate = (models) => {
        Line.belongsTo(models.Zone, {foreignKey: {name:'id_zone', allowNull: false}, as:'zoneLine'}); // line table has a FK id_zone
        Line.hasMany(models.Journey, {foreignKey: {name: 'id_line', allowNull: false}, as:'journeyLine'}); // journey table has a FK id_line
        Line.hasMany(models.LineStation, {foreignKey: {name:'id_line', allowNull: false}, as:'lineLinestation'}); // linestation table has a FK id_line
    }



    return Line
};

