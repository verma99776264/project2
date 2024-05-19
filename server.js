const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let latestLocation = null;

// Object to store the values with names as keys
const locationData = {
    munesh: {},
    mayank: {},
    lucky: {}
};

app.post('/update-location', (req, res) => {
    const { name, latestLocation } = req.body;
    if (name === 'munesh' || name === 'mayank' || name === 'lucky') {
        locationData[name] = latestLocation;
        console.log('Location updated for', name, ':', latestLocation);
        res.sendStatus(200);
    } else {
        res.status(400).send('Invalid name');
    }
});



app.get('/get-location/:name', (req, res) => {
    const name = req.params.name;
    if (name === 'munesh' || name === 'mayank' || name === 'lucky') {
        const location = locationData[name];
        if (location) {
            res.json(location);
        } else {
            res.status(404).send('Location not found');
        }
    } else {
        res.status(400).send('Invalid name');
    }
});



// Define a route handler for the /display route
app.get('/', (req, res) => {
    // Set the content type to HTML
    res.setHeader('Content-Type', 'text/html');
    // Send the HTML file as the response
    res.sendFile(path.join(__dirname, 'display-location.html'));
});


app.get('/send', (req, res) => {
    // Set the content type to HTML
    res.setHeader('Content-Type', 'text/html');
    // Send the HTML file as the response
    res.sendFile(path.join(__dirname, 'send-location.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});