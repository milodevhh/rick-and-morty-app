import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States

let maxPage = 42;
let page = 1;
let searchQuery = "";

async function fetchCharacters() {
  cardContainer.innerHTML = "";
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`
    );
    const data = await response.json();
    const characters = data.results;
    maxPage = data.info.pages;
    pagination.textContent = `${page} / ${maxPage}`;
    characters.forEach((character) => {
      cardContainer.append(createCharacterCard(character));
    });
  } catch (error) {}
}
fetchCharacters(page);

prevButton.addEventListener("click", () => {
  page--;
  fetchCharacters(page);
  if (page === 1) {
    prevButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }
  pagination.textContent = `${page} / ${maxPage}`;
});

nextButton.addEventListener("click", () => {
  page++;
  fetchCharacters(page);
  if (page === maxPage) {
    nextButton.disabled = true;
  } else {
    prevButton.disabled = false;
  }
  pagination.textContent = `${page} / ${maxPage}`;
});

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  searchQuery = event.target.elements.query.value;
  page = 1;
  fetchCharacters();
});
