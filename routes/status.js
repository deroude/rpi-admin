import express from "express";
import request from "request";
import {Status} from "../services/MongoService";

const router = express.Router()

router.post('/rpi/:id', (req, res) => {
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

router.get('/rpi/:id', (req, res) => {
    Status.findById(req.params.id, (err, status) => {
        if (err) console.log(err);
        res.send(status);
    });
});

router.get('/rpi', (req, res) => {
    Status.find({}, '_id', (err, re) => {
        if (err) console.log(err); 
        res.send(re);
    });
})

export default router;