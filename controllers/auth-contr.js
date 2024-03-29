const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('./auth/login');
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
        .then(returnedUser => {
            if(!returnedUser) {
                return res.redirect('/login');
            }
            bcrypt.compare(password, returnedUser.password)
                .then(passwordMatch => {
                    if(passwordMatch) {
                        req.session.isAuthenticated = true
                        req.session.user = returnedUser;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                        });
                    }
                    res.redirect('/login');
                })
                .catch((err) => {
                    console.log(err)
                    res.redirect('/login')
                });
        })
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        err ? console.log(err) :
        res.redirect('/');
    });
};

exports.getSignup = (req, res, next) => {
    res.render('./auth/signup');
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({email: email})
        .then(returnedUser => {
            if(returnedUser) {
                return res.redirect('/signup');
            }
            return bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const user = new User(email, hashedPassword);
                    return user.save();
                })
                .then(result => {
                    res.redirect('/login');
                })
        })
        .catch(err => console.log(err));
};