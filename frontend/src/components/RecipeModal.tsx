import React from "react";

const RecipeModal = () => {
  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Recipe Title</h2>
            <span className="close-btn">&times;</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeModal;
