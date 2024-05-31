const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const app = express();
app.use(bodyParser.json());
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the public directory
app.use(express.static('public'));

// Route to send the initial map page
app.get('/display', (req, res) => {
    res.sendFile(__dirname + '/public/display.html');
});


// Route to serve the HTML and JavaScript for sending location updates
app.get('/sendlocation', (req, res) => {
    // Read the HTML and JavaScript file for sending location updates
    fs.readFile(__dirname + '/public/sendlocation.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading sendlocation.html:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.send(data);
    });
});

// Route to handle the location update from the mobile device
app.post('/send', (req, res) => {
    // Handle the location update from the mobile device and emit it to all connected clients
    // For demonstration purposes, let's assume the location is received in JSON format
    const location = req.body;
    io.emit('locationUpdate', location);
    res.sendStatus(200);
});


// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A client connected');

    // You could listen for other events here if needed

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('A client disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});