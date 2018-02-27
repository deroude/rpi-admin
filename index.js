const express = require('express');
var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

var devices = {};

app.post('/rpi/:id', (req, res) => {
    devices[req.params.id] = req.body;
    res.send();
});

app.get('/rpi/:id', (req, res) => {
    console.log(devices);
    res.send(devices[req.params.id]);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))