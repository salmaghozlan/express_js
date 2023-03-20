const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('wallet2', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

const User = sequelize.define('users', {
    // Model attributes are defined here
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },

    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
});
// Define a custom instance method for verifying the password
User.prototype.verifyPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
User.prototype.generateAuthToken = function () {
    const token = jwt.sign({ email: this.email }, 'qwe1234');
    return token;
};
sequelize.sync();

exports.User = User;
