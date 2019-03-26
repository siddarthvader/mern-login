var db = require('../db');
var jwt = require('jsonwebtoken');
var moment = require('moment');

exports.login = (req, res) => {
    console.log('hit');
    console.log(req.body.email, req.body.password);
    db.get().collection('login').findOne({
            email: req.body.email,
            password: req.body.password
        }, {
            email: 1
        },
        (err, results) => {
            console.log(results, "results", err);
            if (err) {
                res.status(500).end('Interal server error');
            }
            if (results) {
                res.json(this.generateJWT(results));
                // res.json(results);
            } else {
                res.json({
                    err: true,
                    msg: 'no records found'
                });
            }
        })
};



exports.generateJWT = (pwdRes, done) => {
    // //console.log(pwdRes, 'generate jwt');
    let token = jwt.sign({
        _id: pwdRes._id,
        email: pwdRes.email
    }, process.env.JWT_RANDO, {
        expiresIn: '15d'
    });
    return {
        token
    }
}

exports.signup = (req, res) => {
    console.log('hite');
    db.get().collection('login').findOne({
        email: req.body.email
    }, function (err, results) {
        //console.log(body,'adduser',results);
        if (!results) {
            let userObj = {
                "name": req.body.name,
                "email": req.body.email,
                "password": req.body.email,
                "address": req.body.address,
                "created_on": moment().unix()
            }
            db.get().collection('login').insert(userObj, function (err, results) {
                //console.log(results,'sendUserAddDataToClient');
                if (err) {
                    res.status(500).end('Interal server error');
                }
                res.json(results);
            });
        } else {
            res.send(400).end('user already exists');
        }
    })
};