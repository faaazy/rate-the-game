import { debounce } from "./debounce.js";

export function initSearch(getGameFromSearch) {
  const mainElems = document.querySelector("main").children;
  const catalog = document.querySelector(".catalog");
  const profile = document.querySelector(".profile");
  const searchInput = document.querySelector(".search__input");

  if (!searchInput) return;

  const debouncedSearch = debounce((value) => {
    for (const elem of mainElems) {
      if (value === "") {
        elem.classList.remove("hidden");
        catalog.classList.add("hidden");
      } else {
        catalog.classList.remove("hidden");
        elem.classList.add("hidden");
        if (profile) profile.classList.add("hidden");
      }
    }

    const catalogContainer = document.querySelector(".catalog__grid");
    catalogContainer.innerHTML = "";

    const loader = document.querySelector(".loader");
    if (loader) loader.classList.remove("hidden");

    getGameFromSearch(value).then((data) => {
      if (loader) loader.classList.add("hidden");

      const newArr = data.filter((item, pos, arr) => {
        return arr.findIndex((el) => el.external === item.external) === pos;
      });

      newArr.forEach((item) => {
        const { cheapest, external, steamAppID, thumb } = item;

        const html = `
          <div class="catalog__item">
            <h2 class="catalog__item-name">${external}</h2>
            <div class="catalog__item-img">
              <img src=${thumb} alt=${external}>
            </div>
            <div class="catalog__item-price">$${cheapest}</div>
            <div class="catalog__item-link">
              <a href="https://store.steampowered.com/app/${steamAppID}">Check this game on Steam</a>
            </div>
          </div>
        `;

        catalogContainer.insertAdjacentHTML("beforeend", html);
      });
    });
  }, 500);

  searchInput.addEventListener("input", () => {
    debouncedSearch(searchInput.value);
  });
}
