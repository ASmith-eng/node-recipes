module.exports = (req, recipeUserId) => {
    if(req.session.isAuthenticated && recipeUserId.equals(req.user._id)) {
        return true;
    }
    else return false;
}