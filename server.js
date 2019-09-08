let express = require('express');
let ejs = require('ejs');
let bodyParser = require('body-parser')
let mongodb = require('mongodb');
let ObjectId = require('mongodb').ObjectID;
let mongoose = require('mongoose');

let app = express();
let mongodbClient = mongodb.MongoClient;
let url = "mongodb://localhost:27017/week7";
let db = null;
let col = null;
let query = {};
let Task = require('./models/task')
let Developer = require('./models/developer')

app.use(express.static('img'));
app.use(express.static('css'));

app.use(bodyParser.urlencoded({
    extended: false
}))


app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.set('port', 8888);

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
},function(err,client){
    if (!err) {
        console.log("Mongoose Connected Successfully");
    }else{
        console.log("Mongoose Error:", err);
    };

    // db = client.db('week6');
    // col = db.collection('tasks');
    });



app.get('/', function(req,res){
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/newTask', function(req,res){
    res.sendFile(__dirname + '/views/newTask.html');
});

app.post('/newTask', function(req,res){
    let taskDate = req.body.taskDate;
    let date = new Date(taskDate);
    let task = new Task({
        name: req.body.taskName,
        assignTo: req.body.assignID,
        dueDate: date,
        status: req.body.status,
        desc: req.body.taskDesc
    });
    task.save(function(err){
        if(err){
            console.log(err);
        }else{
            console.log('Task Saved')
            Task.find({}, function (err, data) {
                res.render('listAll.html', { data: data });
            });
        }
    });
});

app.get('/newDeveloper', function(req,res){
    res.sendFile(__dirname + '/views/newDeveloper.html');
});

app.post('/newDeveloper', function(req,res){
    let developer = new Developer({
        name:{
            firstName: req.body.firstName,
            lastName: req.body.lastName
        },
        level: req.body.level,
        address: {
            unit: req.body.unit,
            street: req.body.street,
            suburb: req.body.suburb,
            state: req.body.state
        }
    });
    developer.save(function(err){
        if(err){
            console.log(err);
        }else{
            console.log('Developer Saved')
            Developer.find({}, function (err, data) {
                res.render('listDeveloper.html', { data: data });
            });
        }
    });
});

app.get('/listAll', function(req,res){
    Task.find({}, function (err, data) {
        res.render('listAll.html', { data: data });
    });
});

app.get('/listDeveloper', function(req,res){
    Developer.find({}, function (err, data) {
        res.render('listDeveloper.html', { data: data });
    });
});

app.get('/deleteTask', function(req,res){
    res.sendFile(__dirname + '/views/deleteTask.html')
});

app.post('/deleteTask', function(req,res){
    let deleteID = parseInt(req.body.taskID);
    query = {id: deleteID};
    Task.deleteMany(query, function(err, data){
        Task.find({}, function (err, data) {
            res.render('listAll.html', { data: data });
        });
    });
});

app.get('/deleteComplete', function(req,res){
    query = {status: "Complete"};
    Task.deleteMany(query, function(err, data){
        Task.find({}, function (err, data) {
            res.render('listAll.html', { data: data });
        });
    });
});

app.get('/deleteDate', function(req,res) {
    res.sendFile(__dirname + '/views/deleteDate.html')
});

app.post('/deleteDate', function(req,res) {
    let deleteDate = new Date(req.body.deleteDate);
    query = {dueDate: {$lt: deleteDate}};
    Task.deleteMany(query, function (err, data) {
        Task.find({}, function (err, data) {
            res.render('listAll.html', { data: data });
        });
    });
});

app.get('/updateStatus', function(req,res){
    res.render('updateStatus.html', {data: ""})
});

app.post('/updateStatus', function(req, res){
    let taskID = parseInt(req.body.taskID);
    let status = req.body.status.toLocaleLowerCase();
    query = {id: taskID};
    if (status == 'complete') {
        Task.updateOne(query, {$set: {status: 'Complete'}}, function(err, data){
            Task.find({}, function (err, data) {
                res.render('listAll.html', { data: data });
            });
        });
    }
    else if (status == 'inprogress') {
        col.updateOne(query, {$set: {status: 'InProgress'}}, function(err, data){
            col.find({}).toArray(function (err, data) {
                res.render('listAll.html', { data: data });
            });
        });
    }else{
        res.render('updateStatus.html', {data: "That was an invalid request"})
    };
});

app.listen(app.get('port'));