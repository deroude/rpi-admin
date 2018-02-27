const express = require('express');
var bodyParser = require('body-parser');
const app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

var devices = {};

app.post('/rpi/:id', (req, res) => {
    devices[req.params.id] = req.body;
    res.send();
});

app.get('/rpi/:id', (req, res) => {
    res.send(devices[req.params.id]);
});

app.get('/rpi', (req, res) => {
    res.send(Object.keys(devices));
})

app.listen(port, () => console.log('RPI admin running on port ' + port));