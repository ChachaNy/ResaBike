module.exports = (sequelize, DataTypes) => {

    const bcrypt = require('bcrypt');
    const saltRounds = 10;

    /* --  LOGIN JOIN TABLE IN DB --*/

    var Login = sequelize.define('Login', {
        id_login: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password_hash: DataTypes.STRING,
        password : {
            type: DataTypes.VIRTUAL,
            set: function(val) {
                // Remember to set the data value, otherwise it won't be validated
                this.setDataValue('password', val);
                this.setDataValue('password_hash', bcrypt.hashSync(val, saltRounds));
            },
            validate: {
                isLongEnough: (val) => {
                    if (val.length < 5) {
                        throw new Error("Please choose a longer password")
                    }
                }
            }
        }
    });

    Login.associate = (models) => {
        Login.belongsTo(models.Zone, {foreignKey: {name: 'id_zone', allowNull: true}, as:'zoneLogin'}); // login has a FK id_zone
        Login.belongsTo(models.Role, {foreignKey: {name:'id_role', allowNull: false}, as:'roleLogin'}); // login has a FK id_role
    }

    return Login
};
