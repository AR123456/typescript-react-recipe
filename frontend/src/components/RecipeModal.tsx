import React, { useState } from "react";
import { RecipeSummary } from "../types";

const RecipeModal = () => {
  // object of recipe data- account for in types.ts
  const [recipeSummary, setRecipeSummary] = useState<RecipeSummary>();
  if (!recipeSummary) {
    return <></>;
  }
  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{recipeSummary?.id}</h2>
            <span className="close-btn">&times;</span>
          </div>
          {/* rendering HTML from api generally a no no  */}

          <p
            dangerouslySetInnerHTML={{
              __html: recipeSummary.summary,
            }}
          ></p>
        </div>
      </div>
    </>
  );
};

export default RecipeModal;
