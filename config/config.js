require('dotenv').config();  // Load environment variables from a .env file

module.exports = {
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'LNCT12',
        database: process.env.MYSQL_DATABASE || 'image_processing',
        port: process.env.MYSQL_PORT || 3306,
        dialect: process.env.DIALECT || 'mysql'
    },
    webhookURL: process.env.WEBHOOK_URL,
    port: process.env.PORT || 5000
};