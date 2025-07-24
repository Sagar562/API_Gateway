const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const {createProxyMiddleware } = require('http-proxy-middleware');

const { PORT, BOOKING_SERVICE_URL, AUTH_SERVICE_URL } = require('./config/serverConfig');

const app = express();

const limit = rateLimit({
    windowMs: 2 * 60 * 1000,
    max: 5,
})

app.use(morgan('combined'));
app.use(limit);

app.use('/booking-service', async (req, res, next) => {
    try {
        const response = await axios.get(AUTH_SERVICE_URL, {
            headers: {
                'x-access-token': req.headers['x-access-token']
            }
        });
        if (response.data.success) {
            next();
        } else {
            return res.status(401).json({
                message: 'Unauthorised',
                success: false
            });
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid request',
            success: false
        });
    }    
});

app.use('/booking-service', createProxyMiddleware( {target: BOOKING_SERVICE_URL, changeOrigin: true} ));

app.get('/home', (req, res) => {
    return res.json({ message: 'Ok' });
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});