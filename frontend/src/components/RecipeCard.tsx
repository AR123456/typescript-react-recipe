import type { Recipe } from "../types";

interface Props {
  recipe: Recipe;
  // on click has to be a function that accepts a recipe and returns nothing
  onClick: (recipe: Recipe) => void;
}

const RecipeCard = ({ recipe }: Props) => {
  return (
    <div className="recipe-card">
      <img src={recipe.image} alt="recipe image" />
      <div className="recipe-card-title">
        <h3>{recipe.title}</h3>
      </div>
    </div>
  );
};

export default RecipeCard;
