const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));


app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
})

app.get("/login.html",function(req,res){
  res.sendFile(__dirname + "/login.html");
})

app.get("/signup.html",function(req,res){
  res.sendFile(__dirname + "/signup.html");
})

app.listen(3000,function(){
  console.log("Server started on 3000.");
})
