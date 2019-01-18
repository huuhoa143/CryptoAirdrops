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



module.exports = {
    getAllNews: getAllNews,
    getNewsByID: getNewsByID,
}