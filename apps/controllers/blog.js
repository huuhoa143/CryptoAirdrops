var express = require("express");
var router = express.Router();

var post_md = require("../models/posts");

router.get("/", function (req, res) {
    var data = post_md.getAllPosts();
    data.then(function (posts) {
        var data = {
            posts: posts,
            error: false
        };
        res.render("blog/index", {data: data});
    }).catch(function (err) {
        var data = {
            error: "Could not get posts data"
        };
        res.render("blog/index", {data: data});
    })
    //res.render("blog/index");
});


router.get("/post/:id", function (req, res) {
    var data = post_md.getPostByID(req.params.id);

    data.then(function (posts) {
        var post = posts[0];
        var result = {
            post: post,
            error: false
        };
        res.render("blog/post", {data: result});
    }).catch(function (err) {
        var result = {
            err: "Could not get post detail"
        };
        res.render("blog/post", {data: result});
    });
});

// Contact
router.get("/contact", function (req, res) {
    res.render("blog/contact");
});

// Archive Page
router.get("/archive-page", function (req, res) {
    res.render("blog/archive-page");
});

// Events
router.get("/events", function (req, res) {
    res.render("blog/events");
});

// Airdrop & Bounty
router.get("/airdrop_bounty", function (req, res) {
   res.render("blog/airdrop_bounty");
});

// Concept
router.get("/concepts", function (req, res) {
    res.render("blog/concepts");
});

// Trading
router.get("/trading_page", function (req, res) {
    res.render("blog/trading_page");
});

// Experience
router.get("/experience", function (req, res) {
    res.render("blog/experience");
});

//Exchanges
router.get("/exchanges", function (req, res) {
    res.render("blog/exchanges");
});

// Analysis
router.get("/analysis", function (req, res) {
    res.render("blog/analysis");
});



module.exports = router;