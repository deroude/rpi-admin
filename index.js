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
    res.send(devices[req.params.id]);
});

app.get('/rpi', (req, res) => {
    res.send(Object.keys(devices));
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))