const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

const ObjectId = mongodb.ObjectId;

exports.RecipeName = class RecipeName {
    constructor(name, description, imageUrl, userId, _id) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.userId = userId;
        this._id = _id ? new mongodb.ObjectId(_id) : null;
    }

    save() {
        const db = getDb();
        const collection = db.collection('recipeNames');
        collection.insertOne(this)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
            console.log(err);
        });
    }

    update(id) {
        const updatedFields = {name: this.name, description: this.description, imgName: this.imageUrl};
        const db = getDb();
        const collection = db.collection('recipeNames');
        collection.updateOne(
            {_id: new ObjectId(id)},
            {
                $set: updatedFields,
                //$currentDate: { lastModified: true }
            }
        )
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(err));
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
                const projection = {_id: 1, recipeID: 1, name: 1, description: 1}
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
        /**const options = {
            projection: {_id: 1, recipeID: 1, name: 1, description: 1, imgName: 1}
        };**/
        const db = getDb();
        const collection = db.collection('recipeNames');
        collection.findOne({ _id: new ObjectId(id) })
            .then(result => {
                callback(result);
            })
            .catch(err => console.log(err));
    }
}

exports.RecipeIngredients = class RecipeIngredients {
    constructor(ingredients, _id) {
        this.ingredients = ingredients;
        this._id = _id ? new mongodb.ObjectId(_id) : null;
    }

    save(id) {
        const saveFields = {ingredients: this.ingredients}
        const db = getDb();
        const collection = db.collection('recipeNames');
        collection.updateOne(
            {_id: new ObjectId(id)},
            {
                $set: saveFields
            }
        )
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(err));
    }

    static queryIngredientsById(id, callback) {
        const options = {
            projection: {_id: 1, ingredients: 1}
        }
        const db = getDb();
        const collection = db.collection('recipeNames');
        collection.findOne({_id: new ObjectId(id)}, options)
            .then(result => {
                console.log(result);
                callback(result);
            })
            .catch(err => console.log(err));
    }
}