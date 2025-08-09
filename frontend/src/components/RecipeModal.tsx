import React, { useEffect, useState } from "react";
import { RecipeSummary } from "../types";
import * as RecipeAPI from "../api";
// get recipeId from app component
interface Props {}

const RecipeModal = () => {
  // object of recipe data- account for in types.ts
  const [recipeSummary, setRecipeSummary] = useState<RecipeSummary>();
  useEffect(() => {
    const fetchRecipeSummary = async () => {
      try {
        const summaryRecipe = await RecipeAPI.getRecipeSummary(recipeId);
        setRecipeSummary(summaryRecipe);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipeSummary();
  });
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
