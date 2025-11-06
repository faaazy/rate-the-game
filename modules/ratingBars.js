export function initRatingBars(cardsData) {
  function countRatings(cards) {
    const ratings = Array(10).fill(0);

    cards.forEach((card) => {
      if (card.rating >= 1 && card.rating <= 10) {
        ratings[card.rating - 1]++;
      }
    });

    return ratings;
  }

  function updateRatingBars(cards) {
    const ratings = countRatings(cards);
    const totalRatings = ratings.reduce((sum, count) => sum + count, 0);

    for (let i = 0; i < 10; i++) {
      const percentage = totalRatings > 0 ? (ratings[i] / totalRatings) * 100 : 1;

      const ratingBar = document.querySelectorAll(".game-ratings__row-item")[i];

      if (ratingBar) {
        ratingBar.style.height = `${percentage + 2}%`;
      }
    }
  }

  updateRatingBars(cardsData);
}
