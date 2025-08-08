// interface is basicaly types but more versital

export interface Recipe {
  // id,title,image and type
  id: number;
  title: string;
  image: string;
  imageType: string;
}
// types for the RecipeSummary response coming back from api in the RecipeModal
export interface RecipeSummary {
  id: number;
  title: string;
  summary: string;
}
