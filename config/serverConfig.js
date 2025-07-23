const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    BOOKING_SERVICE_URL: process.env.BOOKING_SERVICE_URL
}