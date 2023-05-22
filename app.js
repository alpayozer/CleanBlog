const express = require("express");
const mongoose = require('mongoose');
const ejs = require("ejs");
const Blog = require("./models/Blog");

const app = express();

//connect db
mongoose.connect("mongodb://localhost/myblog",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

//template engine
app.set("view engine","ejs");

//middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/",async(req,res)=>{
    const blogs = await Blog.find({});
    res.render("index",{
        blogs
    })
})
app.get("/about",(req,res)=>{
    res.render("about")
})
app.get("/add_post",(req,res)=>{
    res.render("add_post")
})
app.get("/post",(req,res)=>{
    res.render("post")
})
app.post("/blogs",async(req,res)=>{
    await Blog.create(req.body);
    res.redirect("/");
})


const port = 3000;

app.listen(port,()=>{
    console.log(`${port} portunda çalışmaya başladı.`);
})