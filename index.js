// index.js

const express = require('express');
const sequelize = require('./models/db');  // Sequelize instance
const uploadRouter = require('./routes/upload');  // Update the path as per your structure
const statusRouter = require('./routes/status');  // Update the path as per your structure
const webhookRouter = require('./routes/webhook');  // Update the path as per your structure

const app = express();
app.use(express.json());

// Connect to MySQL using Sequelize
sequelize.authenticate()
    .then(() => console.log('MySQL connected using Sequelize'))
    .catch(err => console.error('Unable to connect to MySQL:', err));

// Sync Sequelize models with the database (if not already done)
sequelize.sync({ alter: true })  // Use 'alter: true' for development; be cautious with 'force: true'
    .then(() => console.log('Database synchronized'))
    .catch(err => console.error('Error synchronizing database:', err));

// API endpoint to download a CSV file (if required)
app.get('/get-csv', (req, res) => {
    res.download('./output.csv');  // Make sure this file exists or is generated as needed
});

// Routes for uploading files, checking status, and handling webhooks
app.use('/upload', uploadRouter);
app.use('/status', statusRouter);
app.use('/webhook', webhookRouter);

// Start the Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
