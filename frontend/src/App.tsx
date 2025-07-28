// dont need to import React - but do its componetns

import "./App.css";
import { useState, type FormEvent, useRef } from "react";
import * as api from "./api";
// get recipe from the ts types file
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";
const App = () => {
  // update hard coded search term with empty string - tell ts its a string
  const [searchTerm, setSearchTerm] = useState<string>("");
  // api returns an array of results -
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  // useRef hook for page number- page wont have to re render every time page increments
  const pageNumber = useRef(1);

  // event handler for front end to back will be on submit button
  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      // passing in what back end expects a search term and page
      const recipes = await api.searchRecipes(searchTerm, 1);
      // set what comes back- triggers component to rerender
      setRecipes(recipes.results);
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
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
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
      {recipes.map((recipe) => (
        <div>
          <RecipeCard recipe={recipe} />
        </div>
      ))}
      <button className="view-more-button" onClick={handleViewMoreClick}>
        View More
      </button>
    </div>
  );
};

export default App;
