const fs = require('fs');
const path = require('path');

//Third party modules
const { MongoClient, ServerApiVersion } = require('mongodb');

const rootDir = require('../utils/path');
const recipeNameDir = path.join(rootDir, 'data', 'recipeNames.json');

//Mongo client details
const username = encodeURIComponent("appUser");
const password = encodeURIComponent("U4g1ZxzhGXLjLWsj");
let uri = 'mongodb+srv://appUser:U4g1ZxzhGXLjLWsj@FirstCluster.e24lft6.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports = class Recipe {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }

    save() {
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

    update(dishName) {
        fs.readFile(recipeNameDir, (err, fileContent) => {
            let recipeList = [];
            if(!err) {
                recipeList = JSON.parse(fileContent);
            }
            const updatedRecipeList = recipeList.map(obj => {
                if (obj.name==dishName) {
                    obj.name = this.name;
                    obj.description = this.description;
                }
                return obj;
            });
            fs.writeFile(recipeNameDir, JSON.stringify(updatedRecipeList), (err) => {
                console.log(err);
            });
        });
        
    }

    static fetchAll(callback) {
        fs.readFile(recipeNameDir, (err, fileContent) => {
            if (err) {
                callback([]);
            }
            callback(JSON.parse(fileContent));
        });
    }

    static fetchNames(callback) {
        this.fetchAll((parsedObjArray) => {
            let recipeNames = parsedObjArray.map(recipe => recipe.name);
            callback(recipeNames);
        });
    }

    static fetchAllMongo() {
        async function run() {
            try {
                const collection = client.db('recipesData').collection('recipeNames');
                const recipe = await collection.findOne();
                console.log(recipe);
            }
            finally {
                await client.close();
            }
        }
        run().catch(console.dir);
    }
}