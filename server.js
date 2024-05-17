const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let latestLocation = null;

app.post('/update-location', (req, res) => {
    latestLocation = req.body;
    console.log('Location updated:', latestLocation);
    res.sendStatus(200);
});

app.get('/get-location', (req, res) => {
    res.json(latestLocation);
});

// Define a route handler for the /display route
app.get('/', (req, res) => {
    // Set the content type to HTML
    res.setHeader('Content-Type', 'text/html');
    // Send the HTML file as the response
    res.sendFile(path.join(__dirname, 'display-location.html'));
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});