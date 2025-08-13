// logic to search recipe api - call this function from the get in
// const apiKey = process.env.API_KEY;

// export const searchRecipes = async (searchTerm: string, page: number) => {
//   if (!apiKey) {
//     throw new Error("API Key not found ");
//   }
//   //    url of recipe endpoint
//   const url = new URL("https://api.spoonacular.com/recipes/complexSearch");
//   // query parameters
//   const queryParams = {
//     apiKey: apiKey,
//     query: searchTerm,
//     number: "10",
//     offset: (page * 10).toString(),
//   };
//   url.search = new URLSearchParams(queryParams).toString();

//   try {
//     const searchResponse = await fetch(url);
//     // need data from body of http response
//     const resultsJson = await searchResponse.json();

//     return resultsJson;
//   } catch (error) {
//     console.log(error);
//   }
// };
// // pass in id as arg in the ts way
// export const getRecipeSummary = async (recipeId: string) => {
//   if (!apiKey) {
//     throw new Error("API Key not found");
//   }

//   const url = new URL(
//     `https://api.spoonacular.com/recipes/${recipeId}/summary`
//   );
//   const params = {
//     apiKey: apiKey,
//   };
//   url.search = new URLSearchParams(params).toString();

//   const response = await fetch(url);
//   const json = await response.json();

//   return json;
// };
// ///////////////re write from Chat GPT
// recipe-api.ts

export const searchRecipes = async (searchTerm: string, page: number) => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const url = new URL("https://api.spoonacular.com/recipes/complexSearch");
  const queryParams = {
    apiKey,
    query: searchTerm,
    number: "10",
    offset: (page * 10).toString(),
  };
  url.search = new URLSearchParams(queryParams).toString();

  console.log("Search request URL:", url.toString());

  const response = await fetch(url);
  if (!response.ok) {
    console.error(
      `Search request failed: ${response.status} ${response.statusText}`
    );
    throw new Error(await response.text());
  }

  return response.json();
};

export const getRecipeSummary = async (recipeId: string) => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const url = new URL(
    `https://api.spoonacular.com/recipes/${recipeId}/summary`
  );
  url.search = new URLSearchParams({ apiKey }).toString();

  console.log("Summary request URL:", url.toString());

  const response = await fetch(url);
  if (!response.ok) {
    console.error(
      `Summary request failed: ${response.status} ${response.statusText}`
    );
    throw new Error(await response.text());
  }

  return response.json();
};
