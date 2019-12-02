export const convertToYear = date => new Date(date).getFullYear() || '';

export const convertToDate = date => {
  const newDate = new Date(date);

  return (
    `${newDate.getDate() + 1}/${newDate.getMonth() +
      1}/${newDate.getFullYear()}` || UNINFORMED
  );
};