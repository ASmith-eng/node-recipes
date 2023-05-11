/**     Core modules                    **/
const path = require('path');
const http = require('http');

/**     Third-party modules             **/
const express = require('express');
const parser = require('body-parser');
const session = require('express-session');
const MongoSessionStore = require('connect-mongodb-session')(session);

/**     This app's custom modules              **/
const rootDir = require('./utils/path');
const errorController = require('./controllers/error-contr');
const dbConnect = require('./utils/database').mongoConnect;
const secrets = require('./utils/credentials');
const User = require('./models/user');

const app = express();
/** Set session store db and collection */
const store = new MongoSessionStore({
    uri: `mongodb+srv://${secrets.dbUser}:${secrets.dbPassword}@FirstCluster.e24lft6.mongodb.net/recipesData`,
    collection: 'sessions'
});

/** Declare templating engine (pug) **/
app.set('view engine', 'pug');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const recipeRoutes = require('./routes/recipe');
const authRoutes = require('./routes/auth');

app.use(parser.urlencoded({extended: false}));
/** Make directory 'public' statically accessible (read only access for anyone
 *  with direct filepath inside this folder) **/
app.use(express.static(path.join(rootDir, 'public')));
/** Define session using the express-session module  **/
app.use(session({secret: secrets.sessionKey, resave: false, saveUninitialized: false, store: store}));

app.use((req, res, next) => {
    // Skip if no session active (no session cookie received, so session properties return undefined)
    if(!req.session.user) {
        return next();
    }
    User.queryUserById(req.session.user._id)
        .then(result => {
            req.user = result;
            next();
        })
        .catch(err => console.log(err));
});

/** Incoming requests handled by imported adminRoutes if prefaced with /admin
 * otherwise we will look for a criteria match in userRoutes, authRoutes **/
app.use('/admin', adminRoutes);
app.use(recipeRoutes);
app.use(authRoutes);

/** If the request has not been picked up and a response sent from middleware in 
 * routes above we should send generic 404 page **/
app.use(errorController.getPageNotFound);

dbConnect(() => {
    app.listen(3000);
})