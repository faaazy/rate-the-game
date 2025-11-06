export function initProfile(cardsData) {
  const mainElems = document.querySelector("main").children;
  const catalog = document.querySelector(".catalog");
  const profile = document.querySelector(".profile");
  const headerRow = document.querySelector(".header__row");
  const gamePage = document.querySelector(".game-page");

  function getEnglishStatus(russianStatus) {
    const statusMap = {
      Все: "All",
      Пройдено: "Played",
      Играю: "Playing",
      Брошено: "Dropped",
      Желаемое: "Wishlist",
      Избранное: "Favorite",
    };
    return statusMap[russianStatus] || russianStatus;
  }

  function getRussianStatus(englishStatus) {
    const statusMap = {
      All: "Все",
      Played: "Пройдено",
      Playing: "Играю",
      Dropped: "Брошено",
      Wishlist: "Желаемое",
      Favorite: "Избранное",
    };
    return statusMap[englishStatus] || englishStatus;
  }

  headerRow.addEventListener("click", (event) => {
    if (event.target.closest(".logo") || event.target.closest(".nav__item")) {
      catalog.classList.add("hidden");
      gamePage.classList.add("hidden");
      headerRow.classList.remove("header__row--mobile");
      document.querySelector(".nav").classList.remove("nav--mobile");
      document.querySelector(".menu-icon").classList.remove("menu-icon-active");
    }

    if (event.target.closest(".nav__item")) {
      profile.classList.remove("hidden");
      for (const elem of mainElems) {
        elem.classList.add("hidden");
      }
      applyCurrentFilter();
    }
    if (event.target.closest(".logo")) {
      profile.classList.add("hidden");
      for (const elem of mainElems) {
        elem.classList.remove("hidden");
      }
      gamePage.classList.add("hidden");
    }
  });

  const tabsBtns = document.querySelectorAll(".profile__nav-item");
  const profileTabs = document.querySelectorAll("[data-profile-tab]");

  tabsBtns.forEach((item, index) => {
    item.addEventListener("click", () => {
      tabsBtns.forEach((item) =>
        item.classList.remove(
          "profile__tab--active",
          "profile__nav-item--active"
        )
      );

      item.classList.add("profile__tab--active");
      item.classList.add("profile__nav-item--active");

      profileTabs.forEach((item) => item.classList.add("hidden"));
      profileTabs[index].classList.remove("hidden");

      if (profileTabs[index].classList.contains("profile__reviews")) {
        addReviewToProfile();
      }
    });
  });

  let currentFilter = "All";
  const profileGamesFilter = document.querySelector(".profile__games-filter");

  profileGamesFilter.addEventListener("click", (event) => {
    if (event.target.matches(".profile__games-filter__item")) {
      const profileGamesFilterItems = document.querySelectorAll(
        ".profile__games-filter__item"
      );

      profileGamesFilterItems.forEach((item) =>
        item.classList.remove("profile__games-filter__item--active")
      );

      event.target.classList.add("profile__games-filter__item--active");

      const russianFilter = event.target.innerText;
      currentFilter = getEnglishStatus(russianFilter);

      if (currentFilter === "All") {
        addGameToProfile(cardsData);
      } else {
        const filteredArr = cardsData.filter(
          (item) => item.selected == currentFilter
        );
        addGameToProfile(filteredArr);
      }
    }
  });

  function applyCurrentFilter() {
    const profileGamesFilterItems = document.querySelectorAll(
      ".profile__games-filter__item"
    );
    profileGamesFilterItems.forEach((item) =>
      item.classList.remove("profile__games-filter__item--active")
    );

    const currentLang = document.documentElement.getAttribute("lang") || "en";

    let filterTextToFind;
    if (currentLang === "ru") {
      filterTextToFind = getRussianStatus(currentFilter);
    } else {
      filterTextToFind = getEnglishStatusForDisplay(currentFilter);
    }

    const activeFilter = Array.from(profileGamesFilterItems).find(
      (item) => item.innerText === filterTextToFind
    );

    if (activeFilter)
      activeFilter.classList.add("profile__games-filter__item--active");

    if (currentFilter === "All") {
      addGameToProfile(cardsData);
    } else {
      const filteredGames = cardsData.filter(
        (item) => item.selected == currentFilter
      );
      addGameToProfile(filteredGames);
    }
  }

  function getEnglishStatusForDisplay(englishStatus) {
    const statusMap = {
      All: "All",
      Played: "Played",
      Playing: "Playing",
      Dropped: "Dropped",
      Wishlist: "Wishlist",
      Favorite: "Favorite",
    };
    return statusMap[englishStatus] || englishStatus;
  }

  function addGameToProfile(arr = cardsData) {
    const profileGamesContainer = document.querySelector(
      ".profile__games-grid"
    );
    profileGamesContainer.innerHTML = "";

    for (const item of arr) {
      const { img, selected, title } = item;

      const russianStatus = getRussianStatus(selected);

      const html = `
          <div class="profile-game__item">
            <h2 class="profile-game__name">${title}</h2>
            <div class="profile-game__img">
              <img src=${img} alt=${title}>
            </div>
            <div class="profile-game__selected">${russianStatus}</div>
          </div>
        `;

      profileGamesContainer.insertAdjacentHTML("beforeend", html);
    }
  }

  function addReviewToProfile(arr = cardsData) {
    const profileReviewsContainer = document.querySelector(
      ".profile__reviews-row"
    );
    profileReviewsContainer.innerHTML = "";

    for (const item of arr) {
      let { img, title, review, rating } = item;

      if (review == undefined) {
        review = "";
      }

      let ratingHTML = "";
      for (let i = 0; i < rating; i++) {
        ratingHTML += "<i class='fa-solid fa-star'></i>";
      }

      const html = `
          <div class="profile__reviews-item">
            <div class="profile__reviews-item__img">
              <img src="${img}" alt="" />
            </div>
            <div class="profile__reviews-item__content">
                <div class="profile__reviews-title">${title}</div>
                <div class="profile__reviews-item__content-rating">${ratingHTML}<span>(${rating})</span></div>
                <div class="profile__reviews-item__content-text">${review}</div>
              </div>
            </div>
        `;

      profileReviewsContainer.insertAdjacentHTML("beforeend", html);
    }
  }

  const profileStats = document.querySelectorAll(".profile__stats-item");

  function updateProfileStats() {
    const profileStatsCounter = {
      total: 0,
      wishlist: 0,
      reviews: 0,
    };

    for (const card of cardsData) {
      if (
        card.selected === "Played" ||
        card.selected === "Dropped" ||
        card.selected === "Favorite"
      ) {
        profileStatsCounter.total += 1;
      }

      if (card.selected === "Wishlist") {
        profileStatsCounter.wishlist += 1;
      }

      if (card.review && card.review.trim() !== "") {
        profileStatsCounter.reviews += 1;
      }
    }

    // Обновляем DOM
    profileStats.forEach((item) => {
      const profileStatNum = item.querySelector(".profile__stats-item__num");
      const category = profileStatNum.dataset.profile;

      if (category === "total") {
        addZerosToProfileStat("total", profileStatNum, profileStatsCounter);
      } else if (category === "wishlist") {
        addZerosToProfileStat("wishlist", profileStatNum, profileStatsCounter);
      } else if (category === "reviews") {
        addZerosToProfileStat("reviews", profileStatNum, profileStatsCounter);
      }
    });
  }

  function addZerosToProfileStat(category, stat, counter) {
    let numberStat = counter[category].toString();

    if (numberStat.length === 1) {
      numberStat = `00${numberStat}`;
    } else if (numberStat.length === 2) {
      numberStat = `0${numberStat}`;
    }

    stat.innerText = numberStat;
  }

  const menuIconWrapper = document.querySelector(".menu-icon-wrapper");
  const nav = document.querySelector(".nav");

  menuIconWrapper.addEventListener("click", () => {
    document.querySelector(".menu-icon").classList.toggle("menu-icon-active");
    headerRow.classList.toggle("header__row--mobile");
    nav.classList.toggle("nav--mobile");
  });

  document.addEventListener("cardsDataUpdated", (event) => {
    cardsData = event.detail.cardsData;
    updateProfileStats();
    changeStats(cardsData);

    if (currentFilter !== "All") {
      const filteredGames = cardsData.filter(
        (item) => item.selected == currentFilter
      );
      addGameToProfile(filteredGames);
    } else {
      addGameToProfile(cardsData);
    }
  });

  document.addEventListener("languageChanged", () => {
    applyCurrentFilter();
    updateProfileStats();
    changeStats(cardsData);
  });

  updateProfileStats();
  changeStats(cardsData);
}

function changeStats(cardsData) {
  const profileStatsTitles = document.querySelectorAll(
    ".profile-stats__grid-item__title"
  );

  for (const profileStatTitle of profileStatsTitles) {
    profileStatTitle.nextElementSibling.innerText = 0;
  }

  const currentLang = document.documentElement.getAttribute("lang") || "en";

  const statsMap = {
    ru: {
      played: "Пройдено",
      playing: "Играю",
      dropped: "Брошено",
      wishlist: "Желаемое",
      favorite: "Избранное",
      reviews: "Рецензии",
    },
    en: {
      played: "Played",
      playing: "Playing",
      dropped: "Dropped",
      wishlist: "Wishlist",
      favorite: "Favorite",
      reviews: "Reviews",
    },
  };

  cardsData.forEach((item) => {
    for (const profileStatTitle of profileStatsTitles) {
      const englishKey = profileStatTitle.dataset.stats.toLowerCase();

      const expectedText = statsMap[currentLang]?.[englishKey];

      if (profileStatTitle.textContent === expectedText) {
        if (englishKey === "reviews") {
          if (item.review && item.review.trim() !== "") {
            profileStatTitle.nextElementSibling.innerText =
              parseInt(profileStatTitle.nextElementSibling.innerText) + 1;
          }
        } else {
          if (item.selected.toLowerCase() === englishKey) {
            profileStatTitle.nextElementSibling.innerText =
              parseInt(profileStatTitle.nextElementSibling.innerText) + 1;
          }
        }
      }
    }
  });
}
