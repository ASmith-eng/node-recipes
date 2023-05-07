/**     Core modules                    **/
const path = require('path');
const http = require('http');

/**     Third-party modules             **/
const express = require('express');
const parser = require('body-parser');

/**     This app's custom modules              **/
const rootDir = require('./utils/path');
const errorController = require('./controllers/error-contr');
const dbConnect = require('./utils/database').mongoConnect;

const app = express();

/** Declare templating engine (pug) **/
app.set('view engine', 'pug');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

app.use(parser.urlencoded({extended: false}));
/** Make directory 'public' statically accessible (read only access for anyone
 *  with direct filepath inside this folder) **/
app.use(express.static(path.join(rootDir, 'public')));

/** Incoming requests handled by imported adminRoutes if prefaced with /admin
 * otherwise we will look for a criteria match in userRoutes **/
app.use('/admin', adminRoutes);
app.use(userRoutes);

/** If the request has not been picked up and a response sent from middleware in 
 * routes above we should send generic 404 page **/
app.use(errorController.getPageNotFound);

dbConnect(() => {
    app.listen(3000);
})

//app.listen(3000);