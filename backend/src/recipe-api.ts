// logic to search recipe api
const apiKey = process.env.API_KEY;

const searchRecipes = (searchTerm: string, page: number) => {
  if (!apiKey) {
    throw new Error("API Key not found ");
  }
  //    url of recipe endpoint
  const url = new URL("https://api.spoonacular.com/recipes/complexSearch");
  // query parameters
  const queryParams = {
    apiKey: apiKey,
    query: searchTerm,
    number: "10",
    offset: (page * 10).toString(),
  };
  url.search = new URLSearchParams(queryParams).toString();
};
