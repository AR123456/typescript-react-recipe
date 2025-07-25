// dont need to import React - but do its componetns

import "./App.css";
import { useState } from "react";
const App = () => {
  const [searchTerm, setSearchTerm] = useState("burgers");
  // api returns an array of results -
  const [recipes, setRecipes] = useState([]);

  // event handler for front end back end twice
  const handleSearchSubmit = async () => {
    try {
      // passing in what back end expects a search term and page
      const recipes = await api.searchRecipes(searchTerm, 1);
    } catch (error) {
      console.log(error);
    }
  };

  return <div>Hello from recipe app! </div>;
};

export default App;
