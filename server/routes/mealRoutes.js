import express from 'express';
import MealController from '../controllers/mealController';

const router = express.Router();

// These routes are to be prepended with "/meals"
router.get('/', MealController.getMeals);

router.post('/', MealController.createMeal);

// router.get('/:mealId', () => {});

// router.put("/:mealId",() => {});

// router.delete("/:mealId",() => {});

export default router;
