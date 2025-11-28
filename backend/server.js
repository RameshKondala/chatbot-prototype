const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const Device = require('./models/device');

const scanRoutes = require('./routes/scan');
const chatRoutes = require('./routes/chat');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

// serve frontend from backend/public
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(cors());
app.use(express.json());
app.use('/api', scanRoutes);
app.use('/api', chatRoutes);

// WebSocket for real-time scan results
io.on('connection', (socket) => {
  socket.on('scan-start', async (target) => {
    const results = await performSecurityScan(target);
    socket.emit('scan-results', results);
  });
});

mongoose.connect(process.env.MONGODB_URI);
server.listen(process.env.PORT || 3000, () => console.log('Server running'));
