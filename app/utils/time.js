export const convertMinsToHrsMins = time => {
  let hour = Math.floor(time / 60);
  let minutes = time % 60;
  hour = hour < 10 ? `0${hour}` : hour;
  minutes = minutes < 10 ? `0${minutes}` : minutesm;
  return hour && minutes ? `${hour}h ${minutes}m` : 'Uninformed';
};
