import pool from "../db/pool";
import { FoodModel } from "../models/food.model";

class FoodRepository {
  async create(food: Omit<FoodModel, "id">): Promise<FoodModel> {
    const query = `
      INSERT INTO foods (name, image)
      VALUES ($1, $2)
      RETURNING id, name, image
    `;
    const values = [food.name, food.image || null];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  async findAll(): Promise<FoodModel[]> {
    const query = `SELECT id, name, image FROM foods ORDER BY id`;
    const result = await pool.query(query);
    return result.rows;
  }

  async findById(id: number | string): Promise<FoodModel | null> {
    const query = `SELECT id, name, image FROM foods WHERE id = $1`;
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  async update(id: number | string, food: Partial<Omit<FoodModel, "id">>): Promise<FoodModel | null> {
    const query = `
      UPDATE foods
      SET name = COALESCE($1, name),
          image = COALESCE($2, image)
      WHERE id = $3
      RETURNING id, name, image
    `;
    const values = [food.name || null, food.image || null, id];
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  async delete(id: number | string): Promise<boolean> {
    const query = `DELETE FROM foods WHERE id = $1`;
    await pool.query(query, [id]);
    return true;
  }
}

export default new FoodRepository();
