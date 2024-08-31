# CSV_Image_Processing_Site

**Introduction**
This project is an image processing system designed to handle CSV files containing product information and associated image URLs. 


**The system performs the following tasks:**
Receives and validates CSV files.
Asynchronously processes images.
Stores the processed image data and associated product information in a MySQL database.
Provides an API to check the processing status using a unique request ID.
Uses webhooks to notify the completion of image processing tasks.


**Features**
Asynchronous image processing.
Validation of CSV file format.
MySQL database storage of product and request data.
Webhook notifications upon completion of processing.
Clear API endpoints for uploading CSV files and checking processing status.


**Tech Stack**
**Backend**: Node.js, Express.js
**Database**: MySQL
**Image Processing**: Sharp
**HTTP Requests**: Axios
**ORM**: Sequelize


**Installation**
Clone the repository:

bash
Copy code
git clone 
cd image-processing-system
Install dependencies:

bash
Copy code
npm install
Configuration


**MySQL**

Set up your MySQL database connection details in the .env file.
.env file configuration:

**env**

MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=LNCT12
MYSQL_DATABASE=image_processing
MYSQL_PORT=3306
WEBHOOK_URL=http://example.com/webhook
PORT=5000
DIALECT=mysql


Port:
Configure the server port in the .env file.

Webhook URL:
Specify the webhook URL to receive notifications upon completion of image processing.
