export const getAvarageRating = score => {
  const avarage = score > 5 ? Math.round(score) : score;

  if (avarage >= 5) {
    const length =
      avarage !== 10 ? parseInt(`${avarage}`.charAt(0)) - 5 : avarage - 5;

    return [...Array(length)].map((_, i) => i);
  }

  return [];
};
