import { AiOutlineHeart } from "react-icons/ai";
import type { Recipe } from "../types";

interface Props {
  recipe: Recipe;
  // on click has to be a function that accepts a recipe and returns nothing
  onClick: () => void;
  onFavoriteButtonClick: (recipe: Recipe) => void;
}

const RecipeCard = ({ recipe, onClick, onFavoriteButtonClick }: Props) => {
  return (
    <div className="recipe-card" onClick={onClick}>
      <img src={recipe.image} alt="recipe image" />
      <div className="recipe-card-title">
        <span
          onClick={(event) => {
            //take care of nested on click events with stopPropagation
            event.stopPropagation();
            onFavoriteButtonClick(recipe);
          }}
        >
          <AiOutlineHeart size={25} />
        </span>
        <h3>{recipe.title}</h3>
      </div>
    </div>
  );
};

export default RecipeCard;
