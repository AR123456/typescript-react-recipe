const searchRecipes = async (searchTerm: string, page: number) => {
  // the node back end  end point
  const baseUrl = new URL("http://localhost:5000/api/recipes/search");
  baseUrl.searchParams.append("searchTerm", searchTerm);
  //   page is a number but need to pass in as a string
  baseUrl.searchParams.append("page", String(page));
};
