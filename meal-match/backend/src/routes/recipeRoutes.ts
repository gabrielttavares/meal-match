import express from 'express';
import { searchRecipe } from '../controllers/recipeController';

const router = express.Router();

router.get('/search', searchRecipe);

export default router;