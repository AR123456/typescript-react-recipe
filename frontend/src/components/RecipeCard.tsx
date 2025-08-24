import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import type { Recipe } from "../types";

interface Props {
  recipe: Recipe;
  // getting isFaveorite from state via App.ts
  isFavorite: boolean;
  // on click has to be a function that accepts a recipe and returns nothing
  onClick: () => void;
  onFavoriteButtonClick: (recipe: Recipe) => void;
}

const RecipeCard = ({
  recipe,
  onClick,
  onFavoriteButtonClick,
  isFavorite,
}: Props) => {
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
          {isFavorite ? (
            <AiFillHeart size={25} color="red" />
          ) : (
            <AiOutlineHeart size={25} />
          )}
        </span>
        <h3>{recipe.title}</h3>
        <h3>{recipe.id}</h3>
      </div>
    </div>
  );
};

export default RecipeCard;
