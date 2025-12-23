import express, { Request, Response } from "express";
import foodRoutes from "./routes/food.route"; // Adjust the path if needed

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health check
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

// Root
app.get("/", (_req: Request, res: Response) => {
  res.json({
    service: "food-data-platform",
    version: "0.1.0",
  });
});

// Food routes
app.use("/api", foodRoutes);

// Server
app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});
