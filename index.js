import express from "express";
import bodyParser from "body-parser";
import statusRoute from "./routes/status";
import shoutcastRoute from "./routes/shoutcast";

const app = express();
const router = express.Router()

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('dist'))
app.use("/shoutcast",shoutcastRoute);
app.use("/status",statusRoute);


app.listen(port, () => console.log('RPI admin running on port ' + port));
