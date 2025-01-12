import { useState, useEffect } from "react";
import { Calendar } from "@mantine/dates";
import { Paper, Text, Indicator } from "@mantine/core";
import "dayjs/locale/es";

const CalendaryWhite = ({
  selectedDate,
  setSelectedDate,
  setIdTime,
  initialDate,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [blockedDates, setBlockedDates] = useState([]);

  // Función para calcular los 18 días hábiles bloqueados desde initialDate
  const calculateBlockedDates = (startDate) => {
    const blocked = [];
    let date = new Date(startDate);
    let count = 0;
  
    while (count < 18) {
      blocked.push(new Date(date)); // Agregar cada fecha al arreglo
  
      // Incrementar el contador solo si el día no es domingo
      if (date.getDay() !== 0) {
        count++;
      }
  
      // Avanzar un día
      date.setDate(date.getDate() + 1);
    }
  
    return blocked;
  };

  useEffect(() => {
    if (initialDate) {
      const blockedDays = calculateBlockedDates(initialDate);
      console.log("Fechas bloqueadas:", blockedDays); // Para verificar las fechas bloqueadas
      setBlockedDates(blockedDays);
    }
  }, [initialDate]);

  const isSunday = (date) => date.getDay() === 0;

  const isPastDate = (date) => {
    const today = new Date();
    return date < today;
  };

  const isBlocked = (date) => {
    return blockedDates.some(
      (blockedDate) =>
        blockedDate.toISOString().split("T")[0] ===
        date.toISOString().split("T")[0]
    );
  };

  const isSelectable = (date) => {
    return !isBlocked(date) && !isSunday(date) && !isPastDate(date);
  };

  const handleFormatTime = (dateString) => {
    const date = new Date(dateString);
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    setIdTime(null);
    setSelectedDate(utcDate.toISOString().split("T")[0]);
  };

  const handleMonthChange = (newMonth) => {
    if (newMonth > currentMonth) {
      setCurrentMonth(newMonth);
    }
  };

  const renderDay = (date) => {
    const isDisabled = !isSelectable(date);
    const isSelected = selectedDate === date.toISOString().split("T")[0];
    const backgroundColor = isSelected ? "rgb(217 255 3)" : "white";
    const indicatorColor = isBlocked(date)
      ? "red"
      : isDisabled
      ? "gray"
      : "green";

    return (
      <Paper
        padding="xs"
        style={{
          backgroundColor: backgroundColor,
          width: "100%",
          height: "50%",
          position: "relative",
          cursor: isDisabled ? "not-allowed" : "pointer",
        }}
        onClick={() => !isDisabled && handleFormatTime(date)}
        key={date.toString()}
      >
        <Text align="center">{date.getDate()}</Text>
        <Indicator
          color={indicatorColor}
          size={8}
          offset={-2}
          style={{ position: "absolute", top: 5, right: 4 }}
        />
      </Paper>
    );
  };

  return (
    <div className="w-full">
      <Calendar
        size="lg"
        locale="es"
        renderDay={renderDay}
        value={currentMonth}
        onMonthChange={handleMonthChange}
        // Removed disableOutsideDates (not supported in Mantine Calendar)
      />
    </div>
  );
};

export default CalendaryWhite;
