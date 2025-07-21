// logic to search recipe api
const apiKey = process.env.API_KEY;

const searchRecipes = (searchTerm: string, page: number) => {
  if (!apiKey) {
    throw new Error("API Key not found ");
  }
  //    url of recipe endpoint
};
