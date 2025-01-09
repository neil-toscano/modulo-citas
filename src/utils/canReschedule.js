// Reprogramación: al menos 48 horas antes de la fecha de la cita
export const canReschedule = (appointmentDate, currentDate) => {
  const appointmentDateTime = new Date(appointmentDate); 
  const rescheduleDeadline = new Date(appointmentDateTime.getTime() - 48 * 60 * 60 * 1000); 
  // Validar si la fecha actual está dentro del plazo permitido
  return currentDate <= rescheduleDeadline;
};
