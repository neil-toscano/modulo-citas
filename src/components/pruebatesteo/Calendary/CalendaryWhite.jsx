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

  // Función para calcular los 3 días hábiles bloqueados desde initialDate
  const calculateBlockedDates = (startDate) => {
    const blocked = [];
    let date = new Date(startDate);
    let count = 0;

    while (count < 3) {
      if (date.getDay() !== 0) {
        // Excluir domingos
        blocked.push(new Date(date));
        count++;
      }

      date.setDate(date.getDate() + 1); // Avanzar un día
    }
    return blocked;
  };

  useEffect(() => {
    if (initialDate) {
      const blockedDays = calculateBlockedDates(initialDate);
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
    return !isBlocked(date) && !isPastDate(date) && !isSunday(date);
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
      : isSelectable(date)
      ? "green"
      : "gray";

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
        {!isPastDate(date) && !isSunday(date) && (
          <Indicator
            color={indicatorColor} // Mostrar indicador verde o rojo
            size={8}
            offset={-2}
            style={{ position: "absolute", top: 5, right: 4 }}
          />
        )}
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
        onChange={handleMonthChange}
        disableOutsideDates // Bloquear los meses anteriores
      />
    </div>
  );
};

export default CalendaryWhite;
