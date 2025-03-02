const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')

let port = 8080;

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, 'public')));

let posts = [
    {
        id: uuidv4(),
        username: "harsh",
        content: "I use Quora to become another person, just for a while everyday. On bad days, I use Quora as a person who feels hope. On days where I'm anxious to have people around me, I type out ‘secrets' on Quora. It's an unimaginable interaction otherwise. When I'm confused myself, I try to offer advice. It makes me feel like something good will come out of it this time as well."
    }, 
    {
        id: uuidv4(),
        username: "apna_college",
        content: "Quora is a very good platform. But when people start making it a means of earning, it is bad. Money should not be earned everywhere. Money is not at all important. Somewhere you can also thank us for increasing/ Sharing our knowledge."
    },
    {
        id: uuidv4(),
        username: "rohit",
        content: "My topic is Cancer. Because I am suffering from it and have seen Life journey from top to bottom. You will see answers have crossed 2M views. I got 8000 upvotes for some answers. It is not that I have written something out of the world."
    }
]

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
})

app.post("/posts", (req, res) => {
    let id = uuidv4();
    let {username, content} = req.body;
    posts.push({id, username,content });
    res.redirect("/posts");
})

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})

app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((e) => e.id === id);
    res.render("show.ejs", { post });
})

app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((e) => e.id === id);
    post.content = newContent;
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((e) => e.id === id);
    res.render("edit.ejs", {post});
})

app.delete("/posts/:id/delete", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((e) => e.id !== id);
    res.redirect("/posts");
})


app.listen(port, () => {
    console.log("server is running!!");
})

