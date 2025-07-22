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
