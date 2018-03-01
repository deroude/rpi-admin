const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

const app = express();

mongoose.connect(process.env.MONGODB_URI || "mongodb://rpi:rpi@localhost/rpi");

var Schema = mongoose.Schema;

const RadioStation = new Schema({ name: String, id: String, resource: [String] });
const RadioGenre = new Schema({ name: String, id: String });
const RadioStatus = new Schema({ 
    selectedGenre: RadioGenre, 
    selectedSubgenre: RadioGenre, 
    selectedStation: RadioStation, 
    subgenresCollapsed:Boolean,
    favoritesCollapsed:Boolean,
    stationsCollapsed:Boolean,
    playingStation: RadioStation, 
    favorites: [RadioStation] });

const Status = mongoose.model('Status', {
    _id: String,
    localIp: String,
    radioStatus: RadioStatus,
    lastModified: { type: Date, default: Date.now }
});

var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/rpi/:id', (req, res) => {
    var update = { lastModified: Date.now() };
    if (req.body.localIp) {
        update.localIp = req.body.localIp;
    }
    if (req.body.radioStatus) {
        update.radioStatus = req.body.radioStatus;
    }
    Status.update({ _id: req.params.id }, {
        $set: update
    }, { upsert: true }, (err, raw) => {
        if (err) console.log(err);
        res.send();
    });
});

app.get('/rpi/:id', (req, res) => {
    Status.findById(req.params.id, (err, status) => {
        if (err) console.log(err);
        res.send(status);
    });
});

app.get('/rpi', (req, res) => {
    Status.find({}, '_id', (err, re) => {
        if (err) console.log(err);
        res.send(re);
    });
})

app.listen(port, () => console.log('RPI admin running on port ' + port));