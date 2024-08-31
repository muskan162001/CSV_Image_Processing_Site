const axios = require('axios');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const { findProductsByRequestId, updateProductOutputUrls } = require('../models/Product');
const { updateRequestStatus, findRequestById } = require('../models/Request');
const { webhookURL } = require('../config');
const fs = require('fs');
const path = require('path');
const download = require('image-downloader');

// Function to process a single image
async function processImage(url) {
    try {
        const imageResponse = await download.image({ url, dest: path.join(__dirname, 'temp', `${uuidv4()}.jpg`) });
        const outputFilePath = path.join(__dirname, 'temp', `${uuidv4()}.jpg`);

        // Compress the image
        await sharp(imageResponse.filename)
            .resize({ width: 800 }) // Resize the image to width 800px while maintaining aspect ratio
            .jpeg({ quality: 50 }) // Compress the image
            .toFile(outputFilePath);

        // Upload the image and get the new URL (assuming you have a storage service for this)
        const outputUrl = `https://fake-storage-service/${path.basename(outputFilePath)}`;

        // Clean up the local file
        fs.unlinkSync(outputFilePath);

        return outputUrl;
    } catch (error) {
        console.error('Error processing image:', error);
        throw new Error('Failed to process image');
    }
}

// Function to process images for a given request
async function processImages(requestId) {
    try {
        // Fetch products associated with the request
        const products = await findProductsByRequestId(requestId);

        // Process each product
        for (const product of products) {
            const outputImageUrls = [];
            for (const inputImageUrl of product.inputImageUrls) {
                const outputImageUrl = await processImage(inputImageUrl);
                outputImageUrls.push(outputImageUrl);
            }
            // Update product with output image URLs
            await updateProductOutputUrls(product.id, outputImageUrls);
        }

        // Update request status to COMPLETED
        await updateRequestStatus(requestId, 'COMPLETED');

        // Optionally send a webhook notification
        await axios.post(webhookURL, { requestId, status: 'COMPLETED' });
    } catch (error) {
        console.error('Error processing images:', error);

        // Update request status to FAILED
        await updateRequestStatus(requestId, 'FAILED');

        // Optionally send a webhook notification
        await axios.post(webhookURL, { requestId, status: 'FAILED' });
    }
}

module.exports = { processImages };
