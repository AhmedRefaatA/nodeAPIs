const express = require("express");
const bodyParser = require("body-parser");
const mongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const app = express();
const bodyParserJson = bodyParser.json();


mongoClient.connect("mongodb://localhost:27017",function(err,client){
    app.db = client.db("SchoolSystem");
});


app.get("/",function(req,res){
    res.send({message:"welcome"});
});


app.get("/api/:col",function(req,res){
    app.db.collection(req.params.col).find(req.query).toArray(function(err,data){
        res.send(data);
    });
})

app.post("/api/:col/filter",bodyParserJson,function(req,res){
    app.db.collection(req.params.col).find(req.body).toArray(function(err,data){
        res.send(data);
    });
})

app.post("/api/:col",bodyParserJson,function(req,res){

    app.db.collection(req.params.col).insertOne(req.body);
    res.send({message:req.params.col+" added successfully"})
})


app.put("/api/:col",bodyParserJson,function(req,res){
    app.db.collection(req.params.col).updateOne({_id:req.body._id},{$set:req.body});
    res.send({message:req.params.col+" updated successfully"})
})

app.delete("/api/:col/:id",function(req,res){
    let id = new ObjectId(req.params.id);
    app.db.collection(req.params.col).removeOne({_id:id});
    res.send({message:req.params.col+" deleted"});
})

app.get("/api/:col/:id",function(req,res){
    app.db.collection(req.params.col).findOne({_id:new ObjectId(req.params.id)},function(err,data){
        res.send(data);
    });
    
})








/*
let students = [];
app.get("/",function(req,res){
    res.send({message:"welcome"});
});


app.get("/api/student",function(req,res){
    res.send(students);
})

app.post("/api/student/add",bodyParserJson,function(req,res){
    students.push(req.body);
    res.send({message:"student added successfully"})
})


app.post("/api/student/update",bodyParserJson,function(req,res){
    let id = Number(req.body.id);
    let index = students.findIndex((item)=>item.id==id);
    students[index]=req.body;
    res.send({message:"student updated successfully"})
})

app.get("/api/student/delete/:id",function(req,res){
    let id = Number(req.params.id);
    let index = students.findIndex((item)=>item.id==id);
    students.splice(index,1);
    res.send({message:"student deleted"});
})

app.get("/api/student/read/:id",function(req,res){
    let id = Number(req.params.id);
    let student = students.find((item)=>item.id==id);
    res.send(student);
})
*/
app.listen(8080);