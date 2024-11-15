
const DatePicketFilter = ({ dateTime, setDate }) => {

    const handleDateChange = (event) => {
      setDate(event.target.value); 
    };
  
    return (
      <input
        placeholder="Search"
        value={dateTime || ""}
        onChange={handleDateChange}
        className="inputDateFilter"
        type="date"
        // min={today} // Deshabilitar fechas anteriores a hoy
      />
    );
  };
  
export default DatePicketFilter;
