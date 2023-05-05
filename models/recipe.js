const fs = require('fs');
const path = require('path');

//Third party modules
const { MongoClient, ServerApiVersion } = require('mongodb');

const dbCredentials = require('../utils/credentials');
const rootDir = require('../utils/path');
const recipeNameDir = path.join(rootDir, 'data', 'recipeNames.json');

//Mongo client details
let uri = `mongodb+srv://${dbCredentials.dbUser}:${dbCredentials.dbPassword}@FirstCluster.e24lft6.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports = class Recipe {
    constructor(id, name, description, imageUrl) {
        this.id = id
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    save() {
        this.id = Math.random().toString();
        fs.readFile(recipeNameDir, (err, fileContent) => {
            let recipeList = [];
            //If no error reading file, dump contents into recipeList
            if(!err) {
                recipeList = JSON.parse(fileContent);
            }
            //Add current object's value(s) to recipeList
            recipeList.push(this);
            //Write the now updated recipeList back to file
            fs.writeFile(recipeNameDir, JSON.stringify(recipeList), (err) => {
                console.log(err);
            });
        });
    }

    updateMongo(recipeID) {
        const updatedFields = {name: this.name, description: this.description, imgName: this.imageUrl};
        async function update() {
            try {
                const collection = client.db('recipesData').collection('recipeNames');
                await collection.updateOne(
                    {recipeID: recipeID},
                    {
                        $set: updatedFields,
                        //$currentDate: { lastModified: true }
                    }
                );
            }
            finally {
                //await client.close();
            }
        }
        update().catch(console.dir);
    }

    static fetchAllMongo(callback, itemLimit=100) {
        let allRecipes = [];
        async function query() {
            try {
                // Define collection we should access recipeNames from, use projection to modify what fields are returned,
                // define cursor that will receive the returned documents, limit to no of recipes required for homepage
                // 'featured' section, print output to console as a test
                const collection = client.db('recipesData').collection('recipeNames');
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
        async function query() {
            try {
                const collection = client.db('recipesData').collection('recipeNames');
                const options = {
                    projection: {_id: 0, recipeID: 1, name: 1, description: 1, imgName: 1}
                };
                const result = await collection.findOne({recipeID: id}, options);
                callback(result);
            }
            finally {
                //await client.close();
            }
        }
        query().catch(console.dir);
    }

    /**static fetchNamesMongo(callback) {
        this.fetchAllMongo((parsedObjArray) => {
            let recipeNames = parsedObjArray.map(recipe => recipe.name);
            callback(recipeNames);
        });
    }**/
}