import { FoodModel } from "../models/food.model";
import foodRepository from "../repositories/food.repository";

class FoodService {
  async createFood(name: string, image?: string): Promise<FoodModel> {
    const food: Omit<FoodModel, "id"> = { name, image };
    return await foodRepository.create(food);
  }

  async getAllFoods(): Promise<FoodModel[]> {
    return await foodRepository.findAll();
  }

  async getFoodById(id: string): Promise<FoodModel | null> {
    return await foodRepository.findById(id);
  }

  async updateFood(id: string, name?: string, image?: string): Promise<FoodModel | null> {
    const updatedData: Partial<Omit<FoodModel, "id">> = { name, image };
    return await foodRepository.update(id, updatedData);
  }

  async deleteFood(id: string): Promise<boolean> {
    return await foodRepository.delete(id);
  }
}

export default new FoodService();
