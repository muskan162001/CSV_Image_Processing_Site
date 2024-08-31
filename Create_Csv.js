const { Parser } = require('json2csv');  // Use only Parser
const fs = require('fs');

// Sample data to convert to CSV
const info = [
  {
    "S. No.": "1",
    "Product Name": "SKU1",
    "Input Image Urls": "https://via.placeholder.com/600x400.jpg,https://via.placeholder.com/400x600.jpg,https://via.placeholder.com/800x600.jpg",
  },
  {
    "S. No.": "2",
    "Product Name": "SKU2",
    "Input Image Urls": "https://via.placeholder.com/600x300.jpg,https://via.placeholder.com/300x600.jpg,https://via.placeholder.com/500x500.jpg",
  },
];

// Create a new Parser instance
const json2csvParser = new Parser();

// Convert JSON to CSV
const csv = json2csvParser.parse(info);

// Write the CSV data to a file
fs.writeFile('info.csv', csv, (err) => {
  if (err) {
    console.error('Error writing to CSV file:', err);
    throw err;
  }
  console.log('CSV file successfully saved as info.csv');
});
