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
export const getRecipeSummary = async (id: number) => {
  // GET https://api.spoonacular.com/recipes/4632/summary
  const baseUrl = new URL(
    "https://api.spoonacular.com/recipes/`${id}`/summary"
  );
  baseUrl.searchParams.append("id", id);

  const response = await fetch(baseUrl);
  if (!response.ok) {
    throw new Error(``);
  }
  return response.json();
};
