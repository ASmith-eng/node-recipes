exports.getLogin = (req, res, next) => {
    res.render('./auth/login');
};

exports.postLogin = (req, res, next) => {
    req.session.isAuthenticated = true;
    res.redirect('/');
};