const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { createRequest } = require('../models/Request'); // Import the MySQL model function
const { createProduct } = require('../models/Product'); // Import the MySQL model function

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const requestId = uuidv4();

        // Create a new request in the database
        await createRequest(requestId);

        const products = [];
        fs.createReadStream(file.path)
            .pipe(csv())
            .on('data', (row) => {
                const { 'serialNumber': serialNumber, 'productName': productName, 'inputImageUrls': inputImageUrls } = row;
                const product = {
                    requestId,
                    serialNumber: parseInt(serialNumber, 10),
                    productName,
                    inputImageUrls: inputImageUrls.split(',').map(url => url.trim()), // Convert URLs to an array
                    outputImageUrls: [] // Initialize as empty
                };
                products.push(product);
            })
            .on('end', async () => {
                // Insert products into the database
                for (const product of products) {
                    await createProduct(product);
                }

                res.status(202).json({ requestId });
                fs.unlinkSync(file.path); // Delete the uploaded file
            });
    } catch (err) {
        console.error('Error processing file:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
