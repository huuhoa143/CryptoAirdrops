var express = require("express");

var router = express.Router();

var news_md = require("../models/news");

router.use("/admin", require(__dirname + "/admin"));
router.use("/blog", require(__dirname + "/blog"));

router.get("/", function (req, res) {
    let data = news_md.getAllNews();
    data.then(function (news) {
        let data = {
            posts: news,
            error: false
        };
        res.render("blog/index", {data: data});
    }).catch(function (err) {
        error: "Could not get posts news data";
        res.render("blog/index", {data: data});
    });
});
router.get("/chat", function (req, res) {
    res.render("chat");
});

module.exports = router;