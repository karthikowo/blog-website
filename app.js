//jshint esversion:6
const _ = require('lodash');

// packages 
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// lorem ipsum 
const homeStartingContent = "Welcome to my public-diary , this is my space to share my thoughts. This was a satisfying experience to work in this than I thought it'd be, also a self confidence boost for me.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// connection
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
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
  // res.render("home.ejs",{homeContent:homeStartingContent,posts:posts});
  Post.find({}, function(err, posts){

    res.render("home.ejs", {
      homeContent: homeStartingContent,
      posts: posts
      });
  })
 
 
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

  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  // post.save(function(err){
  //   if (!err){
  //     res.redirect("/");
  //   }
  // }); 
  post.save();

  res.redirect("/");
});

app.get("/posts/:postId",function(req,res){
  // const obj = req.params;
  // console.log(obj.par);(
  const requestedPostId = req.params.postId;
  Post.findOne({_id: requestedPostId}, function(err, post){ 
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });
  
});

app.get("/posts/delete/:postId",function(req,res){
  const requestedPostId = req.params.postId;

  Post.findOneAndDelete({_id: requestedPostId}, function(err, post){ 
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

  res.redirect("/");
});
// hosting port 
app.listen(process.env.PORT, function() {
  console.log(`Server started on  ${process.env.PORT}`);
});
