const recipes = [];


module.exports = class Recipe {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }

    save() {
        recipes.push(this);
    }

    static fetchAll() {
        return recipes;
    }
}