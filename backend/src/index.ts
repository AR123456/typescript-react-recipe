import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());
//  to support multiple API calls to different consts
import * as RecipeAPI from "./recipe-api";
// routes
// for testing set up
// app.get("/api/recipe/search", async (req: Request, res: Response) => {
//   res.json({ message: "success" });
// });
app.get("/api/recipe/search", async (req: Request, res: Response) => {
  const searchTerm = req.query.searchTerm as string;
  const page = parseInt(req.query.page as string);
  // GET   http://localhost:5000/api/recipe/search?searchTerm=burgers&page=1
  const results = await RecipeAPI.searchRecipes(searchTerm, page);
  return res.json(results);
});
app.get("/api/recipes/:recipeId/summary", async (req, res) => {});
app.post("/api/recipes/favorite", async (req, res) => {});
app.get("/api/recipes/favorite", async (req, res) => {});

app.delete("/api/recipes/favorite", async (req, res) => {});
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
