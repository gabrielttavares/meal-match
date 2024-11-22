import mongoose from "mongoose";

const CachedRecipeSchema = new mongoose.Schema({
    ingredient: {
        type: String,
        required: true
    },
    recipes: {
        type: Array,
        required: true
    },
    cachedAt: {
        type: Date,
        default: Date.now,
        expires: 3600
    },
});

const CachedRecipe = mongoose.model('CachedRecipe', CachedRecipeSchema);

export default CachedRecipe;