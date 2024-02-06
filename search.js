function initSearch() {
  const client = algoliasearch(
    "N7G6DG8U1J",
    "6eb10a3c4aef0775ac7c49d2a9e2c74b"
  );
  const index = client.initIndex("aroma_institute");
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  const iconSearch = document.getElementById("iconSearch");
  const iconClose = document.getElementById("iconClose");

  // Function to display search results
  function displayResults(hits) {
    searchResults.innerHTML = ""; // Clear previous results

    hits.forEach((hit) => {
      const link = document.createElement("a");
      link.href = `#${hit.link}`;
      link.classList.add("search-result-item");

      const itemContainer = document.createElement("div");
      itemContainer.classList.add("result-container");

      const name = document.createElement("h4");
      name.textContent = hit.name;

      const country = document.createElement("p");
      country.textContent = `${hit.countries.join(", ")}`;

      const city = document.createElement("p");
      city.textContent = `${hit.cities.join(", ")}`;

      itemContainer.appendChild(name);
      itemContainer.appendChild(country);
      itemContainer.appendChild(city);
      link.appendChild(itemContainer);

      searchResults.appendChild(link);
    });
  }

  // Event listener for the search input
  searchInput.addEventListener("input", function () {
    const searchText = searchInput.value;
    if (searchText.length >= 3) {
      index.search(searchText).then(({ hits }) => {
        displayResults(hits);
      });
    } else {
      searchResults.innerHTML = "";
    }
  });
}
