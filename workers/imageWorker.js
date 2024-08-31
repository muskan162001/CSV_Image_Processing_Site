const mysql = require('mysql2/promise');  // Import mysql2 with promise support
const config = require('../config');        // Import MySQL config
const { processImages } = require('../services/ImageProcessor');  // Import your image processing function

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  port: config.mysql.port
});

async function startProcessing() {
  let connection;

  try {
    connection = await pool.getConnection();

    // Fetch pending requests
    const [rows] = await connection.query('SELECT * FROM image_requests WHERE status = ?', ['PENDING']);

    for (const request of rows) {
      // Update status to 'PROCESSING'
      await connection.query(
        'UPDATE requests SET status = ?, updated_at = ? WHERE request_id = ?',
        ['PROCESSING', new Date(), request.request_id]
      );

      // Process images
      await processImages(request.request_id, request.inputImageUrls.split(','));

      // Optionally, update status to 'COMPLETED' or handle further
    }
  } catch (err) {
    console.error('Error processing images:', err);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

startProcessing();
