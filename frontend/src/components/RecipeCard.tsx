// import type { Recipe } from "../types";

// interface Props {
//   recipe: Recipe;
// }

// const RecipeCard = ({ recipe }: Props) => {
//   return (
//     <div className="recipe-card">
//       <img src={recipe.image} alt="recipe image" />
//       <div className="recipe-card-title">
//         <h3>{recipe.title}</h3>
//       </div>
//     </div>
//   );
// };

// export default RecipeCard;
import { Recipe } from "../types";
// import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Props {
  recipe: Recipe;

  onClick: () => void;
  onFavouriteButtonClick: (recipe: Recipe) => void;
}

const RecipeCard = ({ recipe, onClick }: Props) => {
  return (
    <div className="recipe-card" onClick={onClick}>
      <img src={recipe.image}></img>
      <div className="recipe-card-title">
        <span
          onClick={(event) => {
            event.stopPropagation();
            onFavouriteButtonClick(recipe);
          }}
        ></span>
        <h3>{recipe.title}</h3>
      </div>
    </div>
  );
};

export default RecipeCard;
