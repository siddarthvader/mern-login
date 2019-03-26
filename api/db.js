require("dotenv").config();

const MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

const state = {
    db: null,
}

exports.connect = function (done) {
    if (state.db) return done();
    return new Promise((resolve, reject) => {
        MongoClient.connect(process.env.MONGODB_URI, {
            poolSize: 10
            // other options can go here
        }, (err, db) => {
            if (err) return reject(err)
            state.db = db;
            db.authenticate(process.env.DB_USERNAME, process.env.DB_PWD, (err, result) => {
                assert.equal(true, result);
                if (err) {
                    reject(err)
                }
                console.log('connected');
                resolve();
            });
        })
    })
}

exports.get = () => {
    return state.db
}

exports.close = (done) => {
    if (state.db) {
        state.db.close(function (err, result) {
            state.db = null
            state.mode = null
            done(err)
        })
    }
}