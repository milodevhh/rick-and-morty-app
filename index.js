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

const maxPage = 42;
let page = 1;
const searchQuery = "";
pagination.textContent = `${page} / ${maxPage}`;

async function fetchCharacters(page) {
  cardContainer.innerHTML = "";
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    console.log(`https://rickandmortyapi.com/api/character?page=${page}`);
    const data = await response.json();
    const characters = data.results;

    characters.forEach((character) => {
      cardContainer.append(createCharacterCard(character));
    });
  } catch (error) {
    console.log();
  }
}
fetchCharacters(page);

prevButton.addEventListener("click", () => {
  page--;
  fetchCharacters(page);
  if (page === 1) {
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
  }
  pagination.textContent = `${page} / ${maxPage}`;
});

nextButton.addEventListener("click", () => {
  page++;
  fetchCharacters(page);
  if (page === 42) {
    nextButtonButton.disabled = true;
  } else {
    prevButton.disabled = false;
  }

  pagination.textContent = `${page} / ${maxPage}`;
});
