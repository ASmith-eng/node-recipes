const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

const ObjectId = mongodb.ObjectId;

module.exports = class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    save() {
        const db = getDb();
        const collection = db.collection('users');
        collection.insertOne(this)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findOne(fields) {
        const db = getDb();
        const collection = db.collection('users');
        return collection.findOne(fields);
    }

    static queryUserById(id, callback) {
        const db = getDb();
        const collection = db.collection('users');
        return collection.findOne({ _id: new ObjectId(id)});
    }
}