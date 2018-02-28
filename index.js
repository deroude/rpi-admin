const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

const app = express();

mongoose.connect(process.env.MONGODB_URI || "mongodb://rpi:rpi@localhost/rpi");

const Status = mongoose.model('Status', {
    _id: String,
    localIp: String,
    lastModified: { type: Date, default: Date.now },
});

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/rpi/:id', (req, res) => {
    Status.update({ _id: req.params.id }, {
        $set: {
            localIp: req.body.localIp,
            lastModified: Date.now
        }
    }, () => res.send());
});

app.get('/rpi/:id', (req, res) => {
    Status.findById(req.params.id, (err, status) => res.send(status));
});

app.get('/rpi', (req, res) => {
    Status.find({}, '_id', (re) => res.send(re));
})

app.listen(port, () => console.log('RPI admin running on port ' + port));