//jshint esversion:6
let posts = [];
const _ = require('lodash');

// packages 
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

// lorem ipsum 
const homeStartingContent = "Welcome to my public-diary , this is my space to share my thoughts. This was a satisfying experience to work in this than I thought it'd be, also a self confidence boost for me.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// connection
mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String 
};
const Post = mongoose.model("Post", postSchema);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// rendering ejs files 
app.get("/",function(req,res){
  res.render("home.ejs",{homeContent:homeStartingContent,posts:posts});

  
});

app.get("/about",function(req,res){
  res.render("about.ejs",{aboutPageContent:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact.ejs",{contactPageContent:contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose.ejs");
});

app.post("/compose",function(req,res){

  const post = {
    title: req.body.title,
    content: req.body.content
  };

  posts.push(post);

  res.redirect("/");
});

app.get("/posts/:routeParameter",function(req,res){
  // const obj = req.params;
  // console.log(obj.par);(
  const requestedTitle = _.lowerCase(req.params.routeParameter);
  posts.forEach(function(i_post){
    const storedTitle = _.lowerCase(i_post.title);

    if (storedTitle === requestedTitle){
      const post ={
        title: i_post.title,
        body: i_post.content
      };
      console.log(post);
      res.render("post.ejs",{title:post.title,content:post.body});
    }
  });
  
});

// hosting port 
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
