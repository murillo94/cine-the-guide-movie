export const convertToDolar = (value) =>
  typeof value === 'number'
    ? `$${value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
    : 'Uninformed';
