const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const {createProxyMiddleware } = require('http-proxy-middleware');

const { PORT } = require('./config/serverConfig');

const app = express();

app.use(morgan('combined'));
app.use('/booking-service', createProxyMiddleware( {target: 'http://localhost:3002', changeOrigin: true} ));

app.get('/home', (req, res) => {
    return res.json({ message: 'Ok' });
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});