import { Request, Response } from "express";
import foodService from "../services/food.service";
import { HttpStatus } from "../constants/http.constants";

class FoodController {
  async createFood(req: Request, res: Response) {
    try {
      const food = await foodService.createFood(req.body.name, req.body.image);
      res.status(HttpStatus.CREATED).json(food);
    } catch (err: any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
  }

  async getAllFoods(_req: Request, res: Response) {
    try {
      const foods = await foodService.getAllFoods();
      res.status(HttpStatus.OK).json(foods);
    } catch (err: any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
  }

  async getFoodById(req: Request, res: Response) {
    try {
      const food = await foodService.getFoodById(req.params.id);
      if (!food) return res.status(HttpStatus.NOT_FOUND).json({ error: "Food not found" });
      res.status(HttpStatus.OK).json(food);
    } catch (err: any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
  }

  async updateFood(req: Request, res: Response) {
    try {
      const updatedFood = await foodService.updateFood(req.params.id, req.body.name, req.body.image);
      if (!updatedFood) return res.status(HttpStatus.NOT_FOUND).json({ error: "Food not found" });
      res.status(HttpStatus.OK).json(updatedFood);
    } catch (err: any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
  }

  async deleteFood(req: Request, res: Response) {
    try {
      const deleted = await foodService.deleteFood(req.params.id);
      if (!deleted) return res.status(HttpStatus.NOT_FOUND).json({ error: "Food not found" });
      res.status(HttpStatus.NO_CONTENT).send();
    } catch (err: any) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
  }
}

export default new FoodController();
