import express from "express";
import request from "request";

const router = express.Router()

const shoutcast = {
  apiUrl: (method, params) => {
    var url = "http://api.shoutcast.com/" + method + "?k=" + shoutcast.devId + "&f=json";
    if (params) for (var k in params) {
      url += "&" + k + "=" + params[k];
    }
    return url;
  },
  streamUrl: (id) => "http://yp.shoutcast.com/sbin/tunein-station.pls?id=" + id,
  devId: "N9LxHpgmJSqvcC3E",
  streamPattern: /http\:\/\/.+/g,
  baseStreamUrl: /http:\/\/.+\//g
};

router.get('/genre/primary', function (req, res, next) {
  request(shoutcast.apiUrl("/genre/primary"), { json: true }, (err, inner, body) => {
    if (err) { console.log(err); res.send(err); }
    res.send(body.response.data);
  });
});

router.get('/genre/secondary/:parent', function (req, res, next) {
  request(shoutcast.apiUrl("/genre/secondary", { parentid: req.params.parent }), { json: true }, (err, inner, body) => {
    if (err) { console.log(err); res.send(err); }
    res.send(body.response.data);
  });
});

router.get('/stations/:genre', function (req, res, next) {
  // /legacy/genresearch?k=[Your Dev ID]&genre=classic
  request(shoutcast.apiUrl("/station/advancedsearch", { genre_id: req.params.genre }), { json: true }, (err, inner, body) => {
    if (err) { console.log(err); res.send(err); }
    res.send(body.response.data);
  });
});

router.get('/station/:id', function (req, res, next) {
  request(shoutcast.streamUrl(req.params.id), (err, inner, body) => {
    if (err) { console.log(err); res.send(err); }
    res.send(body.match(shoutcast.streamPattern))
  });
});

router.get('/stationInfo', function (req, res, next) {
  var urlReq = req.query.url.match(shoutcast.baseStreamUrl)[0] + "currentsong";
  request(urlReq, (err, inner, body) => {
    if (err) { console.log(err); res.send(err); }
    res.send(JSON.stringify(body));
  })
});

export default router;