export const getAvarageRating = score => {
  const average = score > 5 ? Math.round(score) : score;
  const length =
    average !== 10 ? parseInt(`${average}`.charAt(0)) - 5 : average - 5;
  return average <= 5 ? null : [...Array(length)];
};
