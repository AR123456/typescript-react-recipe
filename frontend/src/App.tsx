// dont need to import React - but do its componetns

import "./App.css";
import { useState } from "react";
const App = () => {
  const [searchTerm, setSearchTerm] = useState("burgers");
  return <div>Hello from recipe app! </div>;
};

export default App;
