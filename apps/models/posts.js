var db = require('../common/database');
var q = require('q');

var conn = db.getConnection();

function getAllPosts() {
    var defer = q.defer();
    var query = conn.query('SELECT * FROM posts', function (err, posts) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(posts);
        }
    });

    return defer.promise;
}

function addPost(params) {
    if(params) {
        var defer = q.defer();
        var query = conn.query('INSERT INTO posts SET ?', params, function (err, result) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });

        return defer.promise;
    }

    return false;
}

function getPostByID(id) {
    var defer = q.defer();
    var query = conn.query('SELECT * FROM posts WHERE ?', {id: id}, function (err, posts) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(posts);
        }
    });

    return defer.promise;
}

function updatePost(params) {
    if(params) {
        var defer = q.defer();
        var query = conn.query('UPDATE posts SET title = ?, content = ?, website = ?, icoprice = ?, ticker = ?, totalsupply = ?, twitter = ?, facebook = ?, telegram = ?, bolt = ?, platform = ?, start = ?, updated_at = ? WHERE id = ?', [params.title, params.content, params.website, params.icoprice, params.ticker, params.totalsupply, params.twitter, params.facebook, params.telegram, params.bolt, params.platform, params.start, new Date(), params.id], function (err, result) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });

        return defer.promise;
    }
    return false;
}

function deletePost(id) {
    if(id) {
        var defer = q.defer();
        var query = conn.query('DELETE FROM posts WHERE id = ?', [id], function (err, result) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });

        return defer.promise;
    }
    return false;
}

module.exports = {
    getAllPosts: getAllPosts,
    addPost: addPost,
    getPostByID: getPostByID,
    updatePost: updatePost,
    deletePost: deletePost
}