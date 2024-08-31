const express = require('express');
const { findRequestById } = require('../models/Request'); // Import the MySQL model function

const router = express.Router();

router.get('/:requestId', async (req, res) => {
    try {
        const { requestId } = req.params;
        const request = await findRequestById(requestId);

        if (!request) {
            return res.status(404).json({ error: 'Request not found' });
        }

        res.status(200).json({ requestId, status: request.status });
    } catch (err) {
        console.error('secError retrieving request status:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
