const getData = async function () {
  const res = await fetch(
    `https://www.cheapshark.com/api/1.0/deals?metacritic=80&upperprice=10&sortBy=Savings&lowerPrice=1`
  );
  const data = await res.json();
  return data;
};

async function getGameFromSearch(val) {
  const res = await fetch(
    `https://www.cheapshark.com/api/1.0/games?title=${val}&limit=20`
  );
  const data = res.json();
  return data;
}

const getGameData = async function (val) {
  const res = await fetch(
    `https://www.cheapshark.com/api/1.0/deals?sortBy=Reviews&title="${val}"`
  );
  const data = await res.json();
  return data;
};

import { initSales } from "./modules/sales.js";
import { initSearch } from "./modules/search.js";
import { initProfile } from "./modules/profile.js";
import { initModal } from "./modules/modal.js";
import { initLocalStorage } from "./modules/localStorage.js";
import { initGamePage } from "./modules/gamePage.js";
import { initRatingBars } from "./modules/ratingBars.js";
import { setLanguage, translations } from "./modules/setLang.js";

document.addEventListener("DOMContentLoaded", () => {
  const { cardsData, saveToLocalStorage } = initLocalStorage();
  const modal = initModal(cardsData, saveToLocalStorage, translations);

  initGamePage(getGameData, translations);

  initRatingBars(cardsData);
  initSales(getData);
  initSearch(getGameFromSearch);
  initProfile(cardsData);

  setLanguage("en");
});
