import express, { Request, Response } from "express";
import foodRoutes from "./routes/food.route";
import authRoutes from "./routes/auth.route";
import { version } from "../package.json";


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
    version: version,
  });
});

// Food routes
app.use("/api", foodRoutes);
app.use("/api", authRoutes);

// Server
app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
});
