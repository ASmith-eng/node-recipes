const fs = require('fs');
const path = require('path');

const rootDir = require('../utils/path');
const recipeNameDir = path.join(rootDir, 'data', 'recipeNames.json');


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
            callback(recipeNames)
        });
    }
}