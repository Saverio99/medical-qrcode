const express = require('express');
const cryptRoutes = require('./routes/crypt');
const qrcodeRoutes = require('./routes/qrcode');
const userRegistrationRoutes = require('./routes/userRegistration');
const port = 8080;

const app = express();
app.use(express.json());

app.use('/crypt', cryptRoutes);
app.use('/qrcode', qrcodeRoutes);
app.use('/user', userRegistrationRoutes);

app.listen(port, () => console.log('Server running on port 8080'));