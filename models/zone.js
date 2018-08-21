module.exports = (sequelize, DataTypes) => {

    /* --  ZONE JOIN TABLE IN DB --*/

    var Zone = sequelize.define('Zone', {
        id_zone: {
            type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
        },
        zoneName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Zone.associate = (models) => {
        Zone.hasOne(models.PersonContact, {foreignKey: {name:'id_zone', allowNull: false}, as:'zonePersonContact'}); // PersonContact has a FK id_zone
        Zone.hasMany(models.Login, {foreignKey: {name: 'id_zone', allowNull: false}, as:'zoneLogin'}); // Login has a FK id_zone
        Zone.hasMany(models.Line, {foreignKey: {name:'id_zone', allowNull: false}, as:'zoneLine'}); // Line has a FK id_zone
    }

    return Zone
};