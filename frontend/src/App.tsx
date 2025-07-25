// dont need to import React - but do its componetns

import "./App.css";
import { useState } from "react";
import * as api from "./api";
const App = () => {
  const [searchTerm, setSearchTerm] = useState("burgers");
  // api returns an array of results -
  const [recipes, setRecipes] = useState([]);

  // event handler for front end to back will be on submit button
  const handleSearchSubmit = async () => {
    try {
      // passing in what back end expects a search term and page
      const recipes = await api.searchRecipes(searchTerm, 1);
      // set what comes back- triggers component to rerender
      setRecipes(recipes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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
