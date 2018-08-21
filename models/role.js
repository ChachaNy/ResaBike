module.exports = (sequelize, DataTypes) => {

    /* --  ROLE JOIN TABLE IN DB --*/

    var Role = sequelize.define('Role', {
        id_role: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        roleName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Role.associate = (models) => {
        Role.hasMany(models.Login, {foreignKey: {name:'id_role', allowNull: false}, as:'roleLogin'}); // login has a FK id_role
    }


    return Role;
};