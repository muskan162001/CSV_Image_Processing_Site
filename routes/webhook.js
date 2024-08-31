const express = require('express');
const { updateRequestStatus, findRequestById } = require('../models/Request'); // Import MySQL model functions

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { requestId, status } = req.body;
        if (!requestId || !status) {
            return res.status(400).json({ error: 'Invalid webhook payload' });
        }

        // Find the request by ID
        const request = await findRequestById(requestId);
        if (!request) {
            return res.status(404).json({ error: 'Request not found' });
        }

        // Update the request status
        await updateRequestStatus(requestId, status);

        res.status(200).json({ message: 'Webhook received and processed' });
    } catch (err) {
        console.error('Error processing webhook:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
