import React, { useState } from "react";

const RecipeModal = () => {
  // object of recipe data- account for in types.ts
  const [recipeSummary, setRecipeSummary] = useState();
  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Recipe Title</h2>
            <span className="close-btn">&times;</span>
          </div>
          <p>Recipe Summary</p>
        </div>
      </div>
    </>
  );
};

export default RecipeModal;
