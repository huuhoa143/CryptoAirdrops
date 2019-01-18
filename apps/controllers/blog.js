var express = require("express");
var router = express.Router();

var news_md = require('../models/news');

router.get("/", function (req, res) {
    var data = news_md.getAllNews();
    console.log(data);
    data.then(function (news) {
        var data = {
            posts: news,
            error: false
        };
        console.log(data);
        res.render("blog/index", {data: data});
    }).catch(function (err) {
        error: "Could not get posts news data";
        res.render("blog/index", {data: data});
    });
})


router.get("/post/:id", function (req, res) {
    var data = news_md.getNewsByID(req.params.id);
    data.then(function (news) {
        var post = news[0];
        var result = {
            post: post,
            error: false
        };
        res.render("blog/post", {data: result});
    }).catch(function (err) {
        var result = {
            error: "Could not get post news detail"
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