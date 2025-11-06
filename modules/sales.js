export function initSales(getData) {
  let itemsCounter = 0;
  const showMoreBtn = document.querySelector("[data-show-more-btn]");
  const salesContainer = document.querySelector(".sales__row");

  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", () => {
      getData().then((data) => {
        createSpecialOffers(data);
      });
    });
  }

  getData().then((data) => {
    createSpecialOffers(data);
  });

  function createSpecialOffers(data) {
    const newArr = data.filter((item, pos, arr) => {
      return arr.findIndex((el) => el.title === item.title) === pos;
    });

    const itemsLeft = Math.min(10, newArr.length - itemsCounter);

    if (showMoreBtn) {
      itemsLeft === 0 ? (showMoreBtn.disabled = true) : true;
    }

    for (let i = 0; i < itemsLeft; i++) {
      const { title, metacriticScore, normalPrice, salePrice, savings, thumb } =
        newArr[itemsCounter];
      itemsCounter++;

      const html = `
          <div class="sales__item">
            <div class="sales__item-img">
              <img src="${thumb}" alt="${title}" />
            </div>
            <div class="sales__item-text">
              <h2 class="sales__item-title">${title}</h2>
              <div class="sales__item-rating">Rating <br> <span>${metacriticScore}</span> / 100</div>
              <div class="sales__item-price__wrapper">
                <div class="sales__item-percent">-${parseFloat(savings).toFixed(0)}%</div>
                <div class="sales__item-price">
                  <span>$${parseFloat(normalPrice)}</span> <br />
                  $${parseFloat(salePrice)}
                </div>
              </div>
            </div>
          </div>
        `;

      salesContainer.insertAdjacentHTML("beforeend", html);
    }
  }
}
