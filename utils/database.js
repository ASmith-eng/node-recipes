const { MongoClient, ServerApiVersion } = require('mongodb');

const dbCredentials = require('./credentials');

let uri = `mongodb+srv://${dbCredentials.dbUser}:${dbCredentials.dbPassword}@FirstCluster.e24lft6.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let _db;

const mongoConnect = (callback) => {
    console.log("Connecting to database...");
    client.connect()
        .then(result => {
            console.log("Connected!");
            _db = client.db('recipesData');
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;