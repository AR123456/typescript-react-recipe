// logic to search recipe api - call this function from the get in
const apiKey = process.env.API_KEY;

export const searchRecipes = async (searchTerm: string, page: number) => {
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

  try {
    const searchResponse = await fetch(url);
    // need data from body of http response
    const resultsJson = await searchResponse.json();
    return resultsJson;
  } catch (error) {
    console.log(error);
  }
};
// pass in id as arg in the ts way
export const getRecipeSummary = async (recipeId: string) => {
  // take care of the ts undefined error
  if (!apiKey) {
    throw new Error("API Key not found ");
  }
  const url = new URL(
    // `https://api.spoonacular.com/recipes/${recipeId}/summary`
    `https://api.spoonacular.com/recipes/649307/summary`
  );
  const params = {
    apiKey: apiKey,
  };
  url.search = new URLSearchParams(params).toString();
  // make request  to recipe api
  const response = await fetch(url);
  // convert response to json
  console.log(response);
};
