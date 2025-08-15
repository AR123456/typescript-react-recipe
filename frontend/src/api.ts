export const searchRecipes = async (searchTerm: string, page: number) => {
  // the node back end  end point -note this is recipes not recipe
  const baseUrl = new URL("http://localhost:5000/api/recipes/search");

  baseUrl.searchParams.append("searchTerm", searchTerm);
  //   page is a number but need to pass in as a string
  baseUrl.searchParams.append("page", String(page));
  // fetch request
  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error(`HTTP error Status: ${response.status}`);
  }
  //   send the json on
  return response.json();
};
export const getRecipeSummary = async (recipeId: string) => {
  // GET https://api.spoonacular.com/recipes/4632/summary
  // const url = new URL(
  //   `https://api.spoonacular.com/recipes/${recipeId}/summary`
  // );
  //  need to get from back end not directly from spooonacular
  const url = new URL(`http://localhost:5000/api/recipes/${recipeId}/summary`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error Status: ${response.status}`);
  }
  // sending this to recipe modal
  return response.json();
};
