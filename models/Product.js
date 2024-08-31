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

// Function to create a new product
async function createProduct(product) {
  const { requestId, serialNumber, productName, inputImageUrls, outputImageUrls } = product;
  const [result] = await pool.query(
    'INSERT INTO products (request_id, serialNumber, productName, inputImageUrls, outputImageUrls) VALUES (?, ?, ?, ?, ?)',
    [requestId, serialNumber, productName, inputImageUrls.join(','), outputImageUrls.join(',')]
  );
  return result.insertId;
}

// Function to find products by requestId
async function findProductsByRequestId(requestId) {
  const [rows] = await pool.query(
    'SELECT * FROM products WHERE request_id = ?',
    [requestId]
  );
  return rows;
}

// Function to update a product
async function updateProduct(id, updates) {
  const { outputImageUrls } = updates;
  await pool.query(
    'UPDATE products SET outputImageUrls = ?, updated_at = ? WHERE id = ?',
    [outputImageUrls.join(','), new Date(), id]
  );
}

// Export functions
module.exports = {
  createProduct,
  findProductsByRequestId,
  updateProduct
};
