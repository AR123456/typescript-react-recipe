import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
//  to support multiple API calls to different consts
import * as RecipeAPI from "./recipe-api.ts";
// import the prisma client
import { PrismaClient } from "@prisma/client";
const app = express();

const prismaClient = new PrismaClient();

const PORT = process.env.PORT || 5000;

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
  const recipeId = req.params.recipeId;
  const results = await RecipeAPI.getRecipeSummary(recipeId);
  return res.json(results);
});
// create the favorite via a post
app.post("/api/recipes/favorite", async (req, res) => {
  //when route is called will be a recipe id in request body
  const recipeId = req.body.recipeId;
  // use prisma client to save id to db
  try {
    // save using model created in schema.prisma
    const favoriteRecipe = await prismaClient.favoriteRecipes.create({
      data: {
        // id will be auto generated
        recipeId: recipeId,
      },
    });
    // return success and send saved to front end
    return res.status(202).json(favoriteRecipe);
  } catch (error) {
    console.log(error);
    // send error and helpful text to front end - for safety do not send error to front end it has table structure in it
    return res.status(500).json({ error: "Something went wrong" });
  }
});
app.get("/api/recipes/favorite", async (req, res) => {
  try {
    // get the recipes and assign to the recipes variable
    const recipes = await prismaClient.favoriteRecipes.findMany();
    // call API and get the recipe back with the same data previously-
    //Get recipe information bulk- iterate over the list of the favorites to make array of favs for the get bulk
    const recipeIds = recipes.map((recipe) => recipe.recipeId.toString());
    // pass the recipeIds to spoonacular - logic in the recipe-api file
    const favorites = await RecipeAPI.getFavoriteRecipesByIDs(recipeIds);
    // send to front end
    return res.json(favorites);
  } catch (error) {
    console.log(error);
    // send error and helpful text to front end - for safety do not send error to front end it has table structure in it
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.delete("/api/recipes/favorite", async (req, res) => {
  // del from DB del request body
  const recipeId = req.body.recipeId;
  try {
    await prismaClient.favoriteRecipes.delete({
      where: {
        recipeId: recipeId,
      },
    });
    // success
    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
