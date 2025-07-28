// dont need to import React - but do its componetns

import "./App.css";
import { useState, type FormEvent } from "react";
import * as api from "./api";
// get recipe from the ts types file
import { Recipe } from "./types";
const App = () => {
  // update hard coded search term with empty string - tell ts its a string
  const [searchTerm, setSearchTerm] = useState<string>("");
  // api returns an array of results -
  const [recipes, setRecipes] = useState<Recipe[]>([]);

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
          recipe image location:{recipe.image}
          recipe title: {recipe.title}
        </div>
      ))}
    </div>
  );
};

export default App;
