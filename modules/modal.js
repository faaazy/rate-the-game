import { initRatingBars } from "./ratingBars.js";

export function initModal(cardsData, saveToLocalStorage, translations) {
  const modal = document.querySelector(".modal-add");
  const modalCardTitle = document.querySelector(".modal-add__card-title");
  const modalCardImg = document.querySelector(".modal-add__card-img img");
  const modalReview = document.querySelector(".modal-review__text");
  const modalSelectedCategories = document.querySelectorAll(
    ".modal-add__card-select__item"
  );

  const currentLang = localStorage.getItem("preferred-language") || "en";
  const {
    played,
    playing,
    dropped,
    wishlist,
    favorite,
    clear,
    rating,
    review,
    placeholder,
    cancel,
    add,
  } = translations[currentLang].modal;

  const selectedCardInfo = {};

  const stars = document.querySelectorAll(".rating-box__stars i");
  stars.forEach((star, index1) => {
    star.addEventListener("click", () => {
      stars.forEach((star, index2) => {
        index1 >= index2
          ? star.classList.add("active")
          : star.classList.remove("active");
      });
    });
  });

  document.querySelector('[data-lang="modal-played"]').textContent = played;
  document.querySelector('[data-lang="modal-playing"]').textContent = playing;
  document.querySelector('[data-lang="modal-dropped"]').textContent = dropped;
  document.querySelector('[data-lang="modal-wishlist"]').textContent = wishlist;
  document.querySelector('[data-lang="modal-favorite"]').textContent = favorite;
  document.querySelector('[data-lang="modal-clear"]').textContent = clear;
  document.querySelector('[data-lang="modal-rating"]').textContent = rating;
  document.querySelector('[data-lang="modal-review"]').textContent = review;
  document.querySelector('[data-lang="modal-placeholder"]').textContent =
    placeholder;
  document.querySelector('[data-lang="modal-cancel"]').textContent = cancel;
  document.querySelector('[data-lang="modal-add"]').textContent = add;

  function updateSelectedInfo(card) {
    const modalGameBtn = document.querySelector(".game__modal-btn");
    modalGameBtn.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });

    selectedCardInfo.title = card.querySelector("h2").innerText;
    selectedCardInfo.img = card.querySelector("img").src;

    modalCardTitle.innerText = selectedCardInfo.title;
    modalCardImg.src = selectedCardInfo.img;

    const foundCard = cardsData.find(
      (item) => item.title === selectedCardInfo.title
    );

    if (foundCard && "review" in foundCard && foundCard.review !== undefined) {
      modalReview.value = foundCard.review;
    } else {
      modalReview.value = "";
    }

    modalSelectedCategories.forEach((item) => item.classList.remove("active"));

    modalSelectedCategories.forEach((item) => {
      if (foundCard && item.innerText.trim() == foundCard.selected.trim()) {
        item.classList.add("active");
      }
    });

    stars.forEach((star) => star.classList.remove("active"));
    if (foundCard) {
      for (let i = 0; i < foundCard.rating; i++) {
        if (stars[i]) {
          stars[i].classList.add("active");
        }
      }
    }
  }

  function handleModalButtonClick() {
    const newCardInfo = { ...selectedCardInfo };

    const noActiveButtons = ![...modalSelectedCategories].some((el) =>
      el.classList.contains("active")
    );

    if (noActiveButtons) {
      for (let i = 0; i < cardsData.length; i++) {
        const elem = cardsData[i];
        if (elem.title === selectedCardInfo.title) {
          cardsData.splice(i, 1);
          break;
        }
      }

      modal.classList.add("hidden");
      saveToLocalStorage(cardsData);
      document.dispatchEvent(
        new CustomEvent("cardsDataUpdated", {
          detail: { cardsData },
        })
      );

      return;
    }

    modalSelectedCategories.forEach((item) => {
      if (item.classList.contains("active")) {
        newCardInfo.selected = item.innerText;
      } else {
        return;
      }
    });

    let starsCount = 0;
    stars.forEach((item) => {
      if (item.classList.contains("active")) {
        starsCount++;
      } else {
        return;
      }
    });

    newCardInfo.rating = starsCount;
    newCardInfo.review = modalReview.value;

    let isUpdated = false;
    for (let i = 0; i < cardsData.length; i++) {
      if (newCardInfo.title === cardsData[i].title) {
        cardsData[i].selected = newCardInfo.selected;
        cardsData[i].rating = newCardInfo.rating;
        cardsData[i].review = newCardInfo.review;

        isUpdated = true;
        break;
      }
    }

    if (!isUpdated) {
      cardsData.push(newCardInfo);
    }

    modal.classList.add("hidden");
    saveToLocalStorage(cardsData);

    document.dispatchEvent(
      new CustomEvent("cardsDataUpdated", {
        detail: { cardsData },
      })
    );
  }

  modal.addEventListener("click", (event) => {
    if (!event.target.closest(".modal-add__card"))
      modal.classList.add("hidden");

    if (event.target.matches(".modal-add__card-select__item")) {
      modalSelectedCategories.forEach((item) =>
        item.classList.remove("active")
      );
      event.target.classList.add("active");
    }

    if (event.target.matches(".modal-add__card-btn")) {
      handleModalButtonClick();
      initRatingBars(cardsData);
    }

    if (event.target.matches(".modal-add__card-clear")) {
      modalSelectedCategories.forEach((item) =>
        item.classList.remove("active")
      );
      stars.forEach((item) => item.classList.remove("active"));
    }

    if (event.target.matches(".modal-add__card-cancel")) {
      modal.classList.add("hidden");
    }
  });

  document.addEventListener("click", (event) => {
    const card = event.target.closest(
      ".catalog__item, .sales__item, .profile-game__item"
    );
    if (!card) return;

    updateSelectedInfo(card);

    let selectedReturnGame = { ...selectedCardInfo };

    document.dispatchEvent(
      new CustomEvent("gameClicked", {
        detail: { selectedReturnGame },
      })
    );
  });
}
