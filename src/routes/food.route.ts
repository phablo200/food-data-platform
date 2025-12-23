import express from "express";
import FoodController from "../controllers/food.controller";

const router = express.Router();

router.post("/foods", FoodController.createFood.bind(FoodController));
router.get("/foods", FoodController.getAllFoods.bind(FoodController));
router.get("/foods/:id", FoodController.getFoodById.bind(FoodController));
router.put("/foods/:id", FoodController.updateFood.bind(FoodController));
router.delete("/foods/:id", FoodController.deleteFood.bind(FoodController));

export default router;
