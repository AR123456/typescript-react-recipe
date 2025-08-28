// dont need to import React - but do its componetns

import "./App.css";
import { useState, type FormEvent, useRef, useEffect } from "react";
import * as api from "./api";
// get recipe from the ts types file
import type { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";
// tabs type string for useState can only be one of these two
type Tabs = "search" | "favorites";

const App = () => {
  // State variables
  // update hard coded search term with empty string - tell ts its a string
  const [searchTerm, setSearchTerm] = useState<string>("");
  // api returns an array of results -
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  // for recipe modal
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(
    undefined
  );
  // favorites tab- either search or favorites
  const [selectedTab, setSelectedTab] = useState<Tabs>("search");
  // store favorite recipes in state - re using type from api returns
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  // useRef hook for page number- page wont have to re render every time page increments
  const pageNumber = useRef(1);
  // fetch favorite data when app loads
  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        // logic in api.ts
        const favoriteRecipes = await api.getFavoriteRecipes();
        // call the use state setter
        setFavoriteRecipes(favoriteRecipes.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFavoriteRecipes();
  }, []);
  // event =>[handler for front end to back will be on submit button
  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      // passing in what back end expects a search term and page
      const recipes = await api.searchRecipes(searchTerm, 1);
      // set what comes back- triggers component to rerender
      setRecipes(recipes.results);
      // reset page number with a new search
      pageNumber.current = 1;
    } catch (error) {
      console.log(error);
    }
  };
  const handleViewMoreClick = async () => {
    // call recipes api pass in query page
    // calculate what page number should be and pass along to the API
    const nextPage = pageNumber.current + 1;
    try {
      // nextRecipes needs to be appended to the recipes array so the new result dosent blow away the page
      const nextRecipes = await api.searchRecipes(searchTerm, nextPage);
      // copy the recipes array add next page of recipes to it - save to state- trigger re render
      setRecipes([...recipes, ...nextRecipes.results]);
      // save current page number
      pageNumber.current = nextPage;
    } catch (error) {
      console.log(error);
    }
  };
  // heart click adds or removes
  const addFavoriteRecipe = async (recipe: Recipe) => {
    try {
      // persist to db
      await api.addFavoriteRecipe(recipe);
      // Add new fav to state, copy it into the array
      setFavoriteRecipes([...favoriteRecipes, recipe]);
    } catch (error) {
      console.log(error);
    }
  };
  const removeFavoriteRecipe = async (recipe: Recipe) => {
    try {
      // call api
      await api.removeFavoriteRecipe(recipe);
      // filter out the removed recipe
      const updatedRecipes = favoriteRecipes.filter(
        (favRecipe) => recipe.id !== favRecipe.id
      );
      setFavoriteRecipes(updatedRecipes);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="app-container">
      <div className="header">
        <img src="/hero-image.jpg" alt="hero" />
        <div className="title">My Recipe App</div>
      </div>
      {/* tabs  */}
      <div className="tabs">
        <h1
          className={selectedTab === "search" ? "tab-active" : ""}
          onClick={() => setSelectedTab("search")}
        >
          Recipe Search
        </h1>
        <h1 onClick={() => setSelectedTab("favorites")}>Favorites</h1>
      </div>
      {/* conditionally render tab */}
      {selectedTab === "search" && (
        <>
          <form onSubmit={(event) => handleSearchSubmit(event)}>
            <input
              type="text"
              required
              placeholder="Enter a search term... "
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
          {/* typescript needs to know why the type is of image and title, go to types.ts */}
          {recipes.map((recipe) => {
            // state object - this function will return true if the recipe is in the fav recipe array - pass to recipe card
            const isFavorite = favoriteRecipes.some(
              (favRecipe) => recipe.id === favRecipe.id
            );
            return (
              <div key={recipe.id}>
                <RecipeCard
                  recipe={recipe}
                  onClick={() => setSelectedRecipe(recipe)}
                  onFavoriteButtonClick={
                    isFavorite ? removeFavoriteRecipe : addFavoriteRecipe
                  }
                  isFavorite={isFavorite}
                />
              </div>
            );
          })}
          <button className="view-more-button" onClick={handleViewMoreClick}>
            View More
          </button>
        </>
      )}
      {selectedTab === "favorites" && (
        <div>
          {favoriteRecipes.map((recipe) => (
            <RecipeCard
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
              // click of heart will remove from favs
              onFavoriteButtonClick={removeFavoriteRecipe}
              // this is the favs tab so every heart should be red
              isFavorite={true}
            />
          ))}
        </div>
      )}

      {/* conditionally render modal if there is a recipe */}
      {selectedRecipe ? (
        <RecipeModal
          recipeId={selectedRecipe.id.toString()}
          onClose={() => setSelectedRecipe(undefined)}
        />
      ) : null}
    </div>
  );
};

export default App;
