// Get references to the HTML elements
const main = document.getElementById("main");
const form = document.getElementById("search_form");
const search = document.getElementById("search");
const logo = document.querySelector(".logo");

// Use strict mode to avoid common JavaScript pitfalls
"use strict";

// Define API constants
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6d68fe3dae8502a44e3bd76de7d0a8e7&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_URL =
  'https://api.themoviedb.org/3/search/movie?api_key=6d68fe3dae8502a44e3bd76de7d0a8e7&query="';

// Call getMovies function with API_URL to display initial movies
getMovies(API_URL);

// Fetch movies from API
async function getMovies(url) {
  // Use try-catch to handle potential errors
  try {
    // Fetch data from API
    const res = await fetch(url);
    const data = await res.json();

    // Display movies or error message
    if (data.results.length === 0) {
      showErrorMessage("Oh no 🙅🏻 ! No such movie exists ");
    } else {
      showMovies(data.results);
    }
  } catch (error) {
    console.error(error);
    showErrorMessage("Sorry, an error occurred. Please try again later.");
  }
}

// Show error message
function showErrorMessage(message) {
  main.innerHTML = "";

  const errorEl = document.createElement("div");
  errorEl.classList.add("errorHandle");

  errorEl.innerHTML = `<h1>${message}</h1>`;

  main.appendChild(errorEl);
}

// Display movies
function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}" class="movie-img" />
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getOverviewRating(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3 class="overview">${overview}</h3>
      </div>
    `;

    main.appendChild(movieEl);
  });
}

// Get class name based on vote_average
function getOverviewRating(rating) {
  if (rating >= 8) {
    return "green";
  } else if (rating >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (searchTerm !== "") {
    getMovies(SEARCH_URL + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});

// Handle logo click
logo.addEventListener("click", () => {
  main.innerHTML = "";
  getMovies(API_URL);
});
