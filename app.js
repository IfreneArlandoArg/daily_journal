
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");



const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

//Telling express our static files(css for ex...) are held inside the public folder...
app.use(express.static("public"));

//connecting to Mongoose...
mongoose.connect('mongodb+srv://arlando_ifrene:1998@cluster0.u1wzg0y.mongodb.net/dailyJournalDB');

//Schema post title text
const composedPostsSchema = {
  title: String,
  post: String
}

//model composedPost
const ComposedPost = mongoose.model("ComposedPost",composedPostsSchema);

 ComposedPost.find({}).then((result) => {
  result.forEach((rslt => {

    
     const postTitle_Text = {
     title: rslt.title,
     post: rslt.post,
     };

  posts.push(postTitle_Text);

  })); 
});

app.get( "/", (req, res) => {

      res.render("home" , {
        homeStartingContent : homeStartingContent , 
        posts : posts 
        
      });
    
     
      
});

app.get( "/about", (req, res) => {
  res.render("about" , { aboutContent : aboutContent });  
});

app.get( "/contact", (req, res) => {
  res.render("contact" , { contactContent : contactContent });  
});

app.get( "/compose", (req, res) => {
  res.render("compose");  
});

app.post( "/compose", (req, res) => {
  
  
  const postTitle_Text = {
    title: req.body.titlePost,
    post: req.body.postText,
    
  };
  
  posts.push(postTitle_Text);

  const composedPost = new ComposedPost({
    title: req.body.titlePost,
    post: req.body.postText,
  });

  composedPost.save();
  
  res.redirect("/");
  
});

app.get("/posts/:route" , ( req , res ) => {

 //if(posts.length != 0){

    

    posts.forEach((pPost) => {

      if( _.lowerCase(pPost.title) === _.lowerCase(req.params.route) ){

        res.render( "post", {postPageTitle : pPost.title , postPageText : pPost.post});
        console.log("Match found\n" + pPost.title);
        
            
      }
    //  else{
        
      //  res.render("errorPage", {errorPageRoute : __dirname + "\\posts\\" + req.params.route});
        //console.log("No match found!!!")

      //}

    });

  //}else{
    
      //res.send("\<script\> alert(\"No articles available right now!\\nThank you for choosing Daily Journal.\\nwe´ll be back soon. \")\;  window.location.href = \"\/\"\; \<\/script\>");
      //console.log("No articles available right now!\nThank you for choosing Daily Journal.\nwe´ll be back soon.");
    //  res.render("errorPage", {errorPageRoute : __dirname + "\\posts\\" + req.params.route});
    
  //}

});






app.listen(3000, function() {
  console.log("Server started on port 3000");
});
