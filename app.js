/**     Core modules                    **/
const path = require('path');
const http = require('http');

/**     Third-party modules             **/
const express = require('express');
const parser = require('body-parser');

/**     This app's custom modules              **/
const rootDir = require('./utils/path');

const app = express();

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/recipes');

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
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, 'views', 'page-not-found.html'));
});

app.listen(3000);