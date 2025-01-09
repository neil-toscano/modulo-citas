// reprogramacion despues de las 48 horas
export const canReschedule = (startDate, currentDate) => {
  const diffInHours = (currentDate - startDate) / (1000 * 60 * 60); // Diferencia en horas
  return diffInHours >= 48;
};