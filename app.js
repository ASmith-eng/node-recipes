/**     Core modules                    **/
const path = require('path');
const http = require('http');

/**     Third-party modules             **/
const express = require('express');
const parser = require('body-parser');

/**     This app's modules              **/


const app = express();

const adminRoutes = require('./routes/admin');

app.use(parser.urlencoded({extended: false}));

app.use('/admin', adminRoutes);

/** If the request has not been picked up and a response sent from middleware in 
 * routes above we should send generic 404 page **/
app.use((req, res, next) => {
    res.status(404).sendFile(path.join('__dirname', 'views', 'page-not-found.html'));
});

app.listen(3000);