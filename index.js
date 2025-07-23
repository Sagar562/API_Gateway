const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const {createProxyMiddleware } = require('http-proxy-middleware');

const { PORT, BOOKING_SERVICE_URL } = require('./config/serverConfig');

const app = express();

const limit = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 10,
})

app.use(morgan('combined'));
app.use(limit);
app.use('/booking-service', createProxyMiddleware( {target: BOOKING_SERVICE_URL, changeOrigin: true} ));

app.get('/home', (req, res) => {
    return res.json({ message: 'Ok' });
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});