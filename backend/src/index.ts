import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
// routes
app.get("/api/recipe/search", async (req: Request, res: Response) => {
  res.json({ message: "success" });
});
app.get("/api/recipes/:recipeId/summary", async (req, res) => {});
app.post("/api/recipes/favorite", async (req, res) => {});
app.get("/api/recipes/favorite", async (req, res) => {});
// app.get("/api/recipes/favorite", async (req, res) => {
//   try {
//     // Simple test query to check DB connection
//     const result = await prisma.$queryRaw`SELECT NOW() as now`;
//     res.json({
//       message: "Database connection successful",
//       serverTime: result[0].now,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Database connection failed", error });
//   }
// });
// app.get("/api/recipes/favorite", async (req, res) => {
//   try {
//     const result = await prisma.$queryRaw`SELECT NOW() as now`;
//     res.json({
//       message: "Database connection successful",
//       serverTime: result[0].now,
//     });
//   } catch (error) {
//     console.error("Detailed error:", error);
//     res
//       .status(500)
//       .json({
//         message: "Database connection failed",
//         error: error instanceof Error ? error.message : error,
//       });
//   }
// });

app.delete("/api/recipes/favorite", async (req, res) => {});
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
