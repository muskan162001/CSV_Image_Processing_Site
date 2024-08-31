const { Sequelize } = require('sequelize');

// Create a new instance of Sequelize with your MySQL configuration
const sequelize = new Sequelize('image_processing', 'root', 'LNCT12', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;