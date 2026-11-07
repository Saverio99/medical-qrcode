const express = require('express');
const cryptRoutes = require('./routes/crypt');
const qrcodeRoutes = require('./routes/qrcode');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/medical-profile')
const cors = require('cors');
const port = 8080;
const app = express();

app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:4300', 'http://172.21.45.46:4300']
}));

app.use(express.json());

app.use('/crypt', cryptRoutes);
app.use('/qrcode', qrcodeRoutes);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);   

app.listen(port, () => console.log('Server running on port 8080'));