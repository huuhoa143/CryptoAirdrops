var express = require("express");

var router = express.Router();

var user_md = require('../models/users');
var post_md = require('../models/posts');
var news_md = require('../models/news');
var helper = require('../helpers/helper');

router.get("/", function (req, res) {
    if (req.session.user) {
        //res.json({"message": "This is admin Page"})
        var data = post_md.getAllPosts();
        data.then(function (posts) {
            var data = {
                posts: posts,
                error: false
            }
            res.render("admin/dashboard", {data: data});
        }).catch(function (err) {
            res.render("admin/dashboard", {data: {error: "Get Post data is Error"}});

        });
    } else {
        res.redirect("/admin/signin");
    }

});

// Sign Up
router.get("/signup", function (req, res) {
    res.render("signup", {data: {}});
});

router.post("/signup", function (req, res) {
    var user = req.body;

    if (user.email.trim().length == 0) {
        var data = {
            error: "Email is required"
        };
        res.render("signup", {data: data});
    } else if (user.passwd != user.repasswd && user.passwd.trim().length != 0) {
        var data = {
            error: "Password is not Match"
        };
        res.render("signup", {data: data});
    } else {
        // Insert to DB

        var password = helper.hash_password(user.passwd);

        user = {
            email: user.email,
            password: password
        }

        var result = user_md.addUser(user);

        result.then(function (data) {
            res.redirect("/admin/signin");
        }).catch(function (err) {
            var data = {
                error: "Could not insert user"
            };
            res.render("signup", {data: data});
        });

    }

});

// Sign In
router.get("/signin", function (req, res) {
    res.render("signin", {data: {}});
});

router.post("/signin", function (req, res) {
    var params = req.body;

    if (params.email.trim().length == 0) {
        var data = {
            error: "Please enter an email"
        };
        res.render("signin", {data: data});
    } else {
        var data = user_md.getUserByEmail(params.email);

        if (data) {
            data.then(function (users) {
                var user = users[0];

                var status = helper.compare_password(params.password, user.password);

                if (!status) {
                    res.render("signin", {data: {error: "Password Wrong"}});
                } else {
                    req.session.user = user;
                    console.log(req.session.user);
                    res.redirect("/admin/")
                }
            })
        } else {
            var data = {
                error: "User not exists"
            }
            res.render("signin", {data: data});

        }
    }
});

/*
 * Tab Post
 */

// Add New Post

router.get("/post/new", function (req, res) {
    if (req.session.user) {
        res.render("admin/post/new", {data: {error: false}});

    } else {
        res.redirect("/admin/signin");
    }
});

router.post("/post/new", function (req, res) {
    var params = req.body;

    if (params.title.trim().length == 0) {
        var data = {
            error: "Please enter a title"
        };

        res.render("admin/post/new", {data: data});
    } else {
        var now = new Date();
        params.created_at = now;
        params.updated_at = now;

        var data = post_md.addPost(params);
        data.then(function (result) {
            res.redirect("/admin");
        }).catch(function (err) {
            var data = {
                error: "Could not insert"
            };

            res.render("admin/post/new", {data: data});
        });
    }

});

// Edit Post

router.get("/post/edit/:id", function (req, res) {
    if (req.session.user) {
        var params = req.params;

        var id = params.id;

        var data = post_md.getPostByID(id);

        if (data) {
            data.then(function (posts) {
                var post = posts[0];

                var data = {
                    post: post,
                    error: false
                }

                res.render("admin/post/edit", {data: data});
            }).catch(function (err) {
                var data = {
                    error: "Could not get Post By ID"
                };

                res.render("admin/post/edit", {data: data});
            });
        } else {
            var data = {
                error: "Could not get Post By ID"
            };

            res.render("admin/post/edit", {data: data});
        }
    } else {
        res.redirect("/admin/signin");
    }

});

router.put("/post/edit", function (req, res) {
    var params = req.body;

    var data = post_md.updatePost(params);
    if (!data) {
        res.json({status_code: 500});
    } else {
        data.then(function (result) {
            res.json({status_code: 200});
        }).catch(function (err) {
            console.log(err);
            res.json({status_code: 500});
        })
    }
});

router.delete("/post/delete", function (req, res) {
    var post_id = req.body.id;

    var data = post_md.deletePost(post_id);

    if (!data) {
        res.json({status_code: 500});
    } else {
        data.then(function (result) {
            res.json({status_code: 200});
        }).catch(function (err) {
            res.json({status_code: 500});
        });
    }
});

router.get("/post", function (req, res) {
    if (req.session.user) {
        res.redirect("/admin");
    } else {
        res.redirect("/admin/signin");
    }
});


/*
 * Tab user
 */
router.get("/user", function (req, res) {
    if (req.session.user) {
        var data = user_md.getAllUser();
        data.then(function (users) {
            var data = {
                users: users,
                error: false
            }
            res.render("admin/user", {data: data});
        }).catch(function (err) {
            var data = {
                error: "Could not get user info"
            };
            res.render("admin/user", {data: data});
        })
    } else {
        res.redirect("/admin/signin");
    }

});

/*
 * Tab News
 */

router.get("/news", function (req, res) {
    if (req.session.user) {
        var data = news_md.getAllNews();
        data.then(function (news) {
            var data = {
                news: news,
                error: false
            }
            res.render("admin/news", {data: data});
        }).catch(function (err) {
            res.render("admin/news", {data: {error: "Get Post data is Error"}});

        });
    } else {
        res.redirect("/admin/signin");
    }
});

// Add new News

router.get("/news/new", function (req, res) {
    if (req.session.user) {
        res.render("admin/news/new", {data: {error: false}});

    } else {
        res.redirect("/admin/signin");
    }
});

router.post("/news/new", function (req, res) {
    var params = req.body;

    if (params.title.trim().length == 0) {
        var data = {
            error: "Please enter a title"
        };

        res.render("admin/news/new", {data: data});
    } else {
        var now = new Date();
        params.created_at = now;
        params.updated_at = now;

        var data = news_md.addNews(params);
        data.then(function (result) {
            res.redirect("/admin");
        }).catch(function (err) {
            var data = {
                error: "Could not insert"
            };

            res.render("admin/news/new", {data: data});
        });
    }

});

// Edit News

router.get("/news/edit/:id", function (req, res) {
    if (req.session.user) {
        var params = req.params;

        var id = params.id;

        var data = news_md.getNewsByID(id);

        if (data) {
            data.then(function (news) {
                var post = news[0];

                var data = {
                    news: post,
                    error: false
                };

                res.render("admin/news/edit", {data: data});
            }).catch(function (err) {
                var data = {
                    error: "Could not get News By ID"
                };

                res.render("admin/news/edit", {data: data});
            });
        } else {
            var data = {
                error: "Could not get News By ID"
            };

            res.render("admin/news/edit", {data: data});
        }
    } else {
        res.redirect("/admin/signin");
    }

});

router.put("/new/edit", function (req, res) {
    var params = req.body;

    var data = news_md.updateNews(params);
    if (!data) {
        res.json({status_code: 500});
    } else {
        data.then(function (result) {
            res.json({status_code: 200});
        }).catch(function (err) {
            res.json({status_code: 500});
        })
    }
});

router.delete("/news/delete", function (req, res) {
    var news_id = req.body.id;

    var data = news_md.deleteNews(news_id);

    if (!data) {
        res.json({status_code: 500});
    } else {
        data.then(function (result) {
            res.json({status_code: 200});
        }).catch(function (err) {
            res.json({status_code: 500});
        });
    }
});

module.exports = router;