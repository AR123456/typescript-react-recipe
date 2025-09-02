import React, { useEffect, useState } from "react";
import type { RecipeSummary } from "../types";
import * as RecipeAPI from "../api";
// get recipeId from app component
interface Props {
  recipeId: string;
  // from App.tsx
  onClose: () => void;
}

const RecipeModal = ({ recipeId, onClose }: Props) => {
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
  }, [recipeId]);
  if (!recipeSummary) {
    return <></>;
  }
  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h2>{recipeSummary.title}</h2>
            <span className="close-btn" onClick={onClose}>
              &times;
            </span>
          </div>
          {/* rendering HTML from api generally a no no  */}

          <h3>
            <a
              // rel="noopener noreferrer"
              target="_blank"
              href={recipeSummary.sourceUrl}
            >
              {recipeSummary.sourceName}
            </a>{" "}
          </h3>
          <h3>{recipeSummary.sourceUrl} </h3>
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
