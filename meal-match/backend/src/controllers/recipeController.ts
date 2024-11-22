import { Request, Response } from 'express';
import axios from 'axios';
import CachedRecipe from '../models/cachedRecipesModel';
import { SPOONACULAR_API_KEY } from '../config/env';

export const searchRecipe = async (req: Request, res: Response) => {
    const { ingredient } = req.query;
    res.json({ message: `Searching for recipes with ingredient: ${ingredient}` });
};

//Check cache for recipes by ingredient.
const getCachedRecipes = async (ingredient: string) => {
    return await CachedRecipe.findOne({ ingredient });
};

//Fetch recipes from the external API.
const fetchRecipesFromAPI = async (ingredient: string) => {
    const response = await axios.get(
        `https://api.spoonacular.com/recipes/search?query=${ingredient}&apiKey=${SPOONACULAR_API_KEY}`
    );
    return response.data;
};

//Save recipes to the cache.
const cacheRecipes = async (ingredient: string, recipes: any) => {
    const cacheEntry = new CachedRecipe({ ingredient, recipes });
    await cacheEntry.save();
};

//Fetch recipes with caching logic.
export const fetchRecipes = async (req: Request, res: Response) => {
    const { ingredient } = req.query as { ingredient?: string };

    if (!ingredient) {
        return res.status(400).json({ message: 'Ingredient is required' });
    }

    try {
        // Check cache
        const cachedData = await getCachedRecipes(ingredient);
        if (cachedData) {
            console.log('Returning cached data');
            return res.status(200).json({ recipes: cachedData.recipes });
        }

        // Fetch from external API
        const recipes = await fetchRecipesFromAPI(ingredient);

        // Save to cache
        await cacheRecipes(ingredient, recipes);

        // Return fetched recipes
        res.status(200).json({ recipes });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ message: 'Failed to fetch recipes', error });
    }
};
