const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('./auth/login');
};

exports.postLogin = (req, res, next) => {
    User.queryUserById('645a89cc5238b8f44235c293')
        .then(user => {
            req.session.isAuthenticated = true;
            req.session.user = user;
            res.redirect('/');
        })
        .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};