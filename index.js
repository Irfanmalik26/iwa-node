var express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const appRoute = express.Router();
const Schema = require('./Models/iwa.model');
var app = express();
app.use(cors());
app.use(bodyParser.json());
appRoute.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
mongoose.connect(process.env.mongooseURI,
    { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

app.route('/').get(function (req, res) {
    res.json('Express server is running (200)');
});

app.route('/add').post(function (req, res) {
    let reqs = req.body;
    let schema = new Schema(reqs);
    schema.save()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

app.route('/get').get(function (req, res) {
    Schema.find({}, function (err, data) {
        if (!err)
            res.status(200).json(data);
        else
            res.status(400).json(err);
    });
});

app.route('/get/:id').get(function (req, res) {
    Schema.findOne(req.param.id, function (err, data) {
        if (!err)
            res.json(data);
        else
            res.json(err);
    });
});

app.route('/update/:id').post(function (req, res) {
    Schema.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
        .then(_ => res.status(200).json("Update sucessfull"))
        .catch(err => res.status(400).send(err))
});

app.route('/delete/:id').delete(function (req, res) {
    Schema.remove({ _id: req.params.id })
        .then(_ => res.status(200).json("Delete sucessfull"))
        .catch(err => res.status(400).send(err))
});

app.listen(process.env.PORT || 5000)
exports = module.exports = app;