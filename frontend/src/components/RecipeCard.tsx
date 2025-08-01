import type { Recipe } from "../types";

interface Props {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: Props) => {
  return (
    <div className="recipe-card" onClick={getRecipeSummary}>
      <img src={recipe.image} alt="recipe image" />
      <div className="recipe-card-title">
        <h3>{recipe.title}</h3>
        <h2>{recipe.id}</h2>
      </div>
    </div>
  );
};

export default RecipeCard;
