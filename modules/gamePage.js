export function initGamePage(getGameData, translations) {
  // handle game click
  const mainElems = document.querySelector("main").children;
  const headerRow = document.querySelector(".header__row");
  const catalog = document.querySelector(".catalog");
  const gamePage = document.querySelector(".game-page");
  const profile = document.querySelector(".profile");

  document.addEventListener("gameClicked", (event) => {
    const selectedGame = event.detail.selectedReturnGame;
    const currentLang = localStorage.getItem("preferred-language") || "en";
    const { reviewBtn, steamReviews, released } =
      translations[currentLang].gamePage;

    getGameData(selectedGame.title).then((data) => {
      let currGame;

      data.forEach((item) => {
        if (item.title === selectedGame.title) currGame = item;
      });

      const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const gameDate = new Date(currGame.releaseDate * 1000);

      const gamePageImg = document.querySelector(".game-page .game__img img"),
        gamePageTitle = document.querySelector(".game-page .game__title"),
        gamePageReleased = document.querySelector(".game-page .game__release"),
        gamePageCount = document.querySelector(
          ".game-page .game__rating-count"
        ),
        gamePageScore = document.querySelector(
          ".game-page .game__rating-score"
        );

      gamePageReleased.innerHTML = "";
      gamePageCount.innerHTML = "";

      gamePageImg.src = currGame.thumb;
      gamePageTitle.innerText = currGame.title;
      gamePageReleased.innerHTML = `<span>${released} </span>${formatter.format(
        gameDate
      )}`;
      gamePageCount.innerHTML = `<span>${steamReviews} </span>${currGame.steamRatingCount}`;
      gamePageScore.innerText = currGame.steamRatingPercent + "%";

      for (const elem of mainElems) {
        catalog.classList.add("hidden");
        profile.classList.add("hidden");
        elem.classList.add("hidden");
      }
      gamePage.classList.remove("hidden");
      document.querySelector('[data-lang="review-btn"]').textContent =
        reviewBtn;
    });

    headerRow.addEventListener("click", (event) => {
      if (event.target.closest(".nav__item")) {
        for (const elem of mainElems) {
          elem.classList.add("hidden");
        }
        gamePage.classList.add("hidden");
      }
      if (event.target.closest(".logo")) {
        for (const elem of mainElems) {
          elem.classList.remove("hidden");
        }
        gamePage.classList.add("hidden");
      }
    });
  });
}
