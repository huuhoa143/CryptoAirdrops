var db = require('../common/database');
var q = require('q');

var conn = db.getConnection();

function getAllNews() {
    var defer = q.defer();
    var query = conn.query('SELECT * FROM news', function (err, news) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(news);
        }
    });

    return defer.promise;
}

function addNews(params) {
    if(params) {
        var defer = q.defer();
        var query = conn.query('INSERT INTO news SET ?', params, function (err, result) {
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

function getNewsByID(id) {
    var defer = q.defer();
    var query = conn.query('SELECT * FROM news WHERE ?', {id: id}, function (err, news) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(news);
        }
    });

    return defer.promise;
}

function updateNews(params) {
    if(params) {
        var defer = q.defer();
        var query = conn.query('UPDATE news SET title = ?, content = ?, author = ?, updated_at = ? WHERE id = ?', [params.title, params.content, params.author, new Date(), params.id], function (err, result) {
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

function deleteNews(id) {
    if(id) {
        var defer = q.defer();
        var query = conn.query('DELETE FROM news WHERE id = ?', [id], function (err, result) {
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
    getAllNews: getAllNews,
    addNews: addNews,
    getNewsByID: getNewsByID,
    updateNews: updateNews,
    deleteNews: deleteNews
}