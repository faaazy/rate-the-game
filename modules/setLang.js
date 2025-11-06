export const translations = {
  en: {
    title: "RateTheGame - Video Game Rating Platform & Collection Tracker",
    description:
      "RateTheGame - Platform for rating video games, writing reviews and tracking your game collection. Rate games, track completed and backlogged titles, organize by categories.",

    nav: {
      profile: "Profile",
      search: "Search",
    },

    hero: {
      title: "RateTheGame - Rate and Track Your Games",
      description:
        "Leading platform for rating video games, writing reviews and managing your game collection. Track completed games, create wishlists and share your ratings.",
    },

    stats: {
      played: "Played",
      playing: "Playing",
      reviews: "Reviews",
      dropped: "Dropped",
      wishlist: "Wishlist",
      favorite: "Favorites",
      profileStats: "Profile Stats",
      personalRatings: "Personal Ratings",
    },

    sales: {
      salesTitle: "Special Offers",
      showMore: "Show More",
    },

    gamePage: {
      reviewBtn: "Log or Review",
      steamReviews: "Steam Reviews",
      released: "Released on",
    },

    catalog: {
      catalog: "Catalog",
    },

    profile: {
      profileTitle: "Profile",
      profileGames: "Games",
      profileReviews: "Reviews",
    },

    profileStats: {
      wishlist: "Games Wishlist",
      total: "Total Games Played",
      reviews: "Games Reviews",
      downloadSaveFile: "Click here to download save file",
      fileInput: "Drop your data file to return games",
    },

    profileFilter: {
      all: "All",
      played: "Played",
      playing: "Playing",
      dropped: "Dropped",
      wishlist: "Wishlist",
      favorite: "Favorite",
    },

    modal: {
      played: "Played",
      playing: "Playing",
      dropped: "Dropped",
      wishlist: "Wishlist",
      favorite: "Favorite",
      clear: "Clear",
      rating: "Rating",
      review: "Review",
      placeholder: "How you feel about this game...",
      cancel: "Cancel",
      add: "Add to list",
    },
  },

  ru: {
    title:
      "RateTheGame - Платформа для оценки видеоигр и отслеживания коллекции",
    description:
      "RateTheGame — платформа для оценки видеоигр, написания рецензий и отслеживания игровой коллекции. Ставьте баллы играм, ведите списки пройденных и отложенных игр.",

    nav: {
      profile: "Профиль",
      search: "Поиск",
    },

    hero: {
      title: "RateTheGame - Оценивайте и отслеживайте ваши игры",
      description:
        "Ведущая платформа для оценки видеоигр, написания рецензий и управления игровой коллекцией. Отслеживайте пройденные игры, составляйте списки желаний и делитесь своими оценками.",
    },

    stats: {
      played: "Пройдено",
      playing: "Играю",
      reviews: "Рецензии",
      dropped: "Брошено",
      wishlist: "Желаемое",
      favorite: "Избранное",
      profileStats: "Статистика профиля",
      personalRatings: "Личные оценки",
    },

    sales: {
      salesTitle: "Специальные предложения",
      showMore: "Показать еще",
    },

    gamePage: {
      reviewBtn: "Записать или оценить",
      steamReviews: "Отзывы Steam",
      released: "Выпущена",
    },

    catalog: {
      catalog: "Каталог",
    },

    profile: {
      profileTitle: "Профиль",
      profileGames: "Игры",
      profileReviews: "Рецензии",
    },

    profileStats: {
      wishlist: "Список желаний",
      total: "Всего игр пройдено",
      reviews: "Рецензий на игры",
      downloadSaveFile: "Нажмите чтобы скачать файл сохранения",
      fileInput: "Перетащите файл данных чтобы вернуть игры",
    },

    profileFilter: {
      all: "Все",
      played: "Пройдено",
      playing: "Играю",
      dropped: "Брошено",
      wishlist: "Желаемое",
      favorite: "Избранное",
    },

    modal: {
      played: "Пройдено",
      playing: "Играю",
      dropped: "Брошено",
      wishlist: "Желаемое",
      favorite: "Избранное",
      clear: "Очистить",
      rating: "Оценка",
      review: "Рецензия",
      placeholder: "Ваши впечатления об этой игре...",
      cancel: "Отмена",
      add: "Добавить в список",
    },
  },
};

export function setLanguage(lang) {
  const t = translations[lang];

  document.documentElement.setAttribute("lang", lang);

  document.title = t.title;
  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", t.description);

  document.querySelector('[data-lang="nav-profile"]').textContent =
    t.nav.profile;
  document.querySelector('[data-lang="search"]').placeholder = t.nav.search;

  document.querySelector('[data-lang="hero-title"]').textContent = t.hero.title;
  document.querySelector('[data-lang="hero-description"]').textContent =
    t.hero.description;

  document
    .querySelectorAll('[data-stats="played"]')
    .forEach((el) => (el.textContent = t.stats.played));
  document
    .querySelectorAll('[data-stats="playing"]')
    .forEach((el) => (el.textContent = t.stats.playing));
  document
    .querySelectorAll('[data-stats="reviews"]')
    .forEach((el) => (el.textContent = t.stats.reviews));
  document
    .querySelectorAll('[data-stats="dropped"]')
    .forEach((el) => (el.textContent = t.stats.dropped));
  document
    .querySelectorAll('[data-stats="wishlist"]')
    .forEach((el) => (el.textContent = t.stats.wishlist));
  document
    .querySelectorAll('[data-stats="favorite"]')
    .forEach((el) => (el.textContent = t.stats.favorite));

  document.querySelector('[data-lang="profile-stats"]').textContent =
    t.stats.profileStats;
  document.querySelector('[data-lang="personal-ratings"]').textContent =
    t.stats.personalRatings;

  document.querySelector('[data-lang="sales-title"]').textContent =
    t.sales.salesTitle;
  document.querySelector('[data-lang="show-more"]').textContent =
    t.sales.showMore;

  document.querySelector('[data-lang="catalog-title"]').textContent =
    t.catalog.catalog;

  document.querySelector('[data-lang="profile-title"]').textContent =
    t.profile.profileTitle;
  document.querySelector('[data-lang="profile-games"]').textContent =
    t.profile.profileGames;
  document.querySelector('[data-lang="profile-reviews"]').textContent =
    t.profile.profileReviews;

  document.querySelector('[data-lang="profile-stats-wishlist"]').textContent =
    t.profileStats.wishlist;
  document.querySelector('[data-lang="profile-stats-total"]').textContent =
    t.profileStats.total;
  document.querySelector('[data-lang="profile-stats-reviews"]').textContent =
    t.profileStats.reviews;
  document.querySelector('[data-lang="profile-stats-download"]').textContent =
    t.profileStats.downloadSaveFile;
  document.querySelector('[data-lang="profile-stats-file"]').textContent =
    t.profileStats.fileInput;

  document.querySelector('[data-lang="profile-filter-all"]').textContent =
    t.profileFilter.all;
  document.querySelector('[data-lang="profile-filter-played"]').textContent =
    t.profileFilter.played;
  document.querySelector('[data-lang="profile-filter-playing"]').textContent =
    t.profileFilter.playing;
  document.querySelector('[data-lang="profile-filter-dropped"]').textContent =
    t.profileFilter.dropped;
  document.querySelector('[data-lang="profile-filter-wishlist"]').textContent =
    t.profileFilter.wishlist;
  document.querySelector('[data-lang="profile-filter-favorite"]').textContent =
    t.profileFilter.favorite;

  document
    .querySelectorAll(".lang-btn")
    .forEach((btn) => btn.classList.remove("active"));
  document.querySelector(`[data-lang="${lang}"]`).classList.add("active");

  document.dispatchEvent(new CustomEvent("languageChanged"));

  localStorage.setItem("preferred-language", lang);
}

document.addEventListener("DOMContentLoaded", function () {
  const savedLang = localStorage.getItem("preferred-language") || "en";
  setLanguage(savedLang);

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const lang = this.getAttribute("data-lang");
      setLanguage(lang);
    });
  });
});
