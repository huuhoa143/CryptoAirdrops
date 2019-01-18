var express = require("express");
var router = express.Router();

var news_md = require('../models/news');
var axios = require("axios");

var idList = [];
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


function getAllId(encode_name) {
    var url = "http://api.nhac.vn/client/search?type=song&limit=30&offset=0&keyword=" + encode_name;
    console.log(url);
    return axios.get(url).then(function (response) {
        var data = response.data.data;
        console.log(data.length);
        for(var i = 0; i < data.length; i++) {
            idList.push(data[i].id);
        }
        return Promise.resolve(idList);
        //console.log(data);
    }).catch(function (err) {
        console.log("erro");
    });
}

router.post("/tool", function (req, res) {
    var data = req.body;
    // console.log(data.url);
    var encode_name = encodeURI(data.url);
    getAllId(encode_name).then(function (data) {
        if(data) {
            res.render("blog/exchanges", {data: idList});

        }
    }).catch(function (err) {
        res.render("blog/exchanges", {data:idList});
    });
});



module.exports = router;