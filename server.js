var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('categoryList', ['categoryList']);
var bodyParser = require('body-parser');


app.use(express.static(__dirname + "/frontend"));
app.use(bodyParser.json());
bodyParser.urlencoded({ extended: true });

app.get('/categoryList', function (req, res) {
    db.categoryList.find(function (err, docs) {
        res.json(docs);
    });
});

app.post('/categoryList', function (req, res) {
    db.categoryList.insert(req.body, function (err, docs) {
        res.json(docs);
    });
});

app.delete('/categoryList/:id', function (req, res) {
    var id = req.params.id;
    db.categoryList.remove({ _id: mongojs.ObjectId(id) }, function (err, docs) {
        res.json(docs);
    });
});

app.get('/categoryList/edit:id', function (req, res) {
    var id = req.params.id;
    db.categoryList.findOne({ _id: mongojs.ObjectId(id) }, function (err, docs) {
        res.json(docs);
    });
});

app.get('/categoryList/movies/select:id', function (req, res) {
    var id = req.params.id;
    db.categoryList.findOne({ _id: mongojs.ObjectId(id) }, function (err, docs) {
        res.json(docs);
    });
});

app.put('/categoryList/:id', function (req, res) {
    var id = req.params.id;
    db.categoryList.findAndModify({
        query: { _id: mongojs.ObjectId(id) },
        update: { $set: { name: req.body.name } },
        new: true
    }, function (err, doc) {
        res.json(doc);
    });
});

app.put('/categoryList/movies/add:id', function (req, res) {
    var id = req.params.id;
    db.categoryList.findAndModify({
        query: { _id: mongojs.ObjectId(id) },
        update: {
            $push: { movie: req.body }
        },
        new: true
    }, function (err, doc) {
        res.json(doc);
    });
});

app.put('/categoryList/movies/delete:id', function (req, res) {
    var id = req.params.id;
    db.categoryList.findAndModify({
        query: { _id: mongojs.ObjectId(id) },
        update: {
            $pull: { movie: req.body}
        },
        new: true
    }, function (err, doc) {
        res.json(doc);
    });
});


app.listen(69);
console.log("server works on port 69");