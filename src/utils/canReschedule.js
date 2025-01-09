// reprogramacion despues de las 48 horas
export const canReschedule = (startDate) => {
    const currentDate = new Date();
    const diffInHours = (currentDate - startDate) / (1000 * 60 * 60); 
    return diffInHours >= 48;
  };
  