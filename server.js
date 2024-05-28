const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIo(server);

// WebSocket connection
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Endpoint to update location
app.post('/update-location', (req, res) => {
    const { name, latestLocation } = req.body;
    io.emit('locationUpdate', { name, latestLocation });
    res.sendStatus(200);
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});