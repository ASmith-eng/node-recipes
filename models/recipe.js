const getDb = require('../utils/database').getDb;
//const dbCredentials = require('../utils/credentials');

//Mongo client details
//let uri = `mongodb+srv://${dbCredentials.dbUser}:${dbCredentials.dbPassword}@FirstCluster.e24lft6.mongodb.net/?retryWrites=true&w=majority`;
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports = class Recipe {
    constructor(id, name, description, imageUrl) {
        this.id = id
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save() {
        const db = getDb();
        const collection = db.collection('recipeNames');
        collection.insertOne({recipeID: this.id, name: this.name, description: this.description, imgName: this.imageUrl})
            .then(result => {
                console.log(result);
            })
            .catch(err => {
            console.log(err);
        });
    }

    updateMongo(recipeID) {
        const updatedFields = {name: this.name, description: this.description, imgName: this.imageUrl};
        const db = getDb();
        const collection = db.collection('recipeNames');
        collection.updateOne(
            {recipeID: recipeID},
            {
                $set: updatedFields,
                //$currentDate: { lastModified: true }
            }
        )
            .then(result => {
                console.log(result);
            })
            .catch(err => {
            console.log(err);
        });
    }

    static fetchAllMongo(callback, itemLimit=100) {
        let allRecipes = [];
        const db = getDb();
        const collection = db.collection('recipeNames');
        async function query() {
            try {
                // Define collection we should access recipeNames from, use projection to modify what fields are returned,
                // define cursor that will receive the returned documents, limit to no of recipes required for homepage
                // 'featured' section, print output to console as a test
                const projection = {_id: 0, recipeID: 1, name: 1, description: 1}
                const recipeNamesCursor = await collection.find().project(projection).limit(itemLimit);
                await recipeNamesCursor.forEach(doc => {allRecipes.push(doc)});
                await recipeNamesCursor.close();
                callback(allRecipes);
            }
            finally {
                //await client.close();
            }
        }
        query().catch(console.dir);
    }

    static queryRecipeById(id, callback) {
        const options = {
            projection: {_id: 0, recipeID: 1, name: 1, description: 1, imgName: 1}
        };
        const db = getDb();
        const collection = db.collection('recipeNames');
        collection.findOne({recipeID: id}, options)
            .then(result => {
                callback(result);
            })
            .catch(err => {
            console.log(err);
        });
    }

    /**static fetchNamesMongo(callback) {
        this.fetchAllMongo((parsedObjArray) => {
            let recipeNames = parsedObjArray.map(recipe => recipe.name);
            callback(recipeNames);
        });
    }**/
}