class RecipeDto {
    constructor(data) {
        this._id = data.id ?? data._id;
        this.name = data.name;
        this.ingredients = data.ingredients;
        this.preparation = data.preparation;
        this.userId = data.userId;
    }
} 

module.exports = RecipeDto;