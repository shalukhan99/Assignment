//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/yehlosoftDB", { useNewUrlParser: true, useUnifiedTopology: true});

const testSchema = {
  email: String,
  password: String
};

const Test = new mongoose.model("Test", testSchema);


app.get("/", function(req, res){
  res.render("home");
});

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/register", function(req, res){
  res.render("register");
});

app.post("/register", function(req, res){
  const newTest = new Test({
    email: req.body.username,
    password: req.body.password
  });
  newTest.save(function(err){
    if(err){
      console.log(err);
    } else{
      res.render("welcomeRegister");
    }
  })

});
app.post("/login", function(req, res){
  res.render("welcomeLogin");
});
app.get("/logout", function(req, res){
  res.redirect("/");
});
app.listen(3000, function(){
  console.log("Server started at port 3000");
});
