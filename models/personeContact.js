module.exports = (sequelize, DataTypes) =>{

    /* --  PERSONCONTACT JOIN TABLE IN DB --*/

    var PersonContact = sequelize.define('PersonContact', {
        id_personContact: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        telephon: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    PersonContact.associate = (models) => {
        PersonContact.belongsTo(models.Zone, {foreignKey: {name:'id_zone', allowNull: false}, as:'zonePersonContact'}); // personContact has a FK id_zone
    }


    return PersonContact
};



