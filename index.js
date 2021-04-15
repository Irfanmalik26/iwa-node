var express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const appRoute = express.Router();
const Expense = require('./Models/expense.model');
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
    res.json('Express server is running...');
});

app.route('/addExpense').post(function (req, res) {
    let reqs = req.body;
    let expense = new Expense(reqs);
    expense.save()
        .then(expense => {
            res.status(200).json(expense);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

app.route('/expenses').get(function (req, res) {
    Expense.find({}, function (err, expenses) {
        if (!err)
            res.status(200).json(expenses);
        else
            res.status(400).json(err);
    });
});

app.route('/expense/:id').get(function (req, res) {
    Expense.findOne(req.param.id, function (err, expense) {
        if (!err)
            res.json(expense);
        else
            res.json(err);
    });
});

app.route('/updateExpense/:expense_id').post(function (req, res) {
    Todo.findOneAndUpdate({ _id: req.params.expense_id }, { $set: req.body })
        .then(_ => res.status(200).json("Update sucessfull"))
        .catch(err => res.status(400).send(err))
});

app.route('/deleteExpense/:expense_id').delete(function (req, res) {
    Todo.remove({ _id: req.params.expense_id })
        .then(_ => res.status(200).json("Delete sucessfull"))
        .catch(err => res.status(400).send(err))
});

app.listen(process.env.PORT || 5000)
exports = module.exports = app;