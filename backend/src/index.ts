import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
//  to support multiple API calls to different consts
import * as RecipeAPI from "./recipe-api.ts";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

// routes

app.get("/api/recipes/search", async (req, res) => {
  const searchTerm = req.query.searchTerm as string;
  const page = parseInt(req.query.page as string);

  const results = await RecipeAPI.searchRecipes(searchTerm, page);
  return res.json(results);
});
// call  the get recipe summary from recipe-api.ts
app.get("/api/recipes/:recipeId/summary", async (req, res) => {
  // get the recipe id from the front end
  const recipeId = req.params.recipeId;

  // pass to get recipe from api file
  const results = await RecipeAPI.getRecipeSummary(recipeId);

  return res.json(results);
});
app.post("/api/recipes/favorite", async (req, res) => {});
app.get("/api/recipes/favorite", async (req, res) => {});

app.delete("/api/recipes/favorite", async (req, res) => {});
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
