import { FoodModel } from "../models/food.model";

class FoodService {
  async createFood(name: string, image?: string): Promise<FoodModel> {
    throw new Error("createFood not implemented");
  }

  async getAllFoods(): Promise<FoodModel[]> {
    throw new Error("getAllFoods not implemented");
  }

  async getFoodById(id: string): Promise<FoodModel | null> {
    throw new Error("getFoodById not implemented");
  }

  async updateFood(id: string, name?: string, image?: string): Promise<FoodModel | null> {
    throw new Error("updateFood not implemented");
  }

  async deleteFood(id: string): Promise<boolean> {
    throw new Error("deleteFood not implemented");
  }
}

export default new FoodService();
