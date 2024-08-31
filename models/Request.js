const mysql = require('mysql2/promise');
const config = require('../config/config');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  port: config.mysql.port
});

// Function to create a new request
async function createRequest(id) {
  await pool.query(
    'INSERT INTO requests (id, status) VALUES (?, ?)',
    [id, 'PENDING']
  );
}

// Function to find a request by ID
async function findRequestById(id) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM requests WHERE id = ?',
      [id]
    );
    return rows[0];
  } catch (err) {
    console.error('Error finding request by ID:', err);
    throw err;
  }
}

// Function to update request status
async function updateRequestStatus(id, status) {
  await pool.query(
    'UPDATE requests SET status = ?, updated_at = ? WHERE id = ?',
    [status, new Date(), id]
  );
}

// Export functions
module.exports = {
  createRequest,
  findRequestById,
  updateRequestStatus
};
