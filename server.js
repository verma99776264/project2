const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});