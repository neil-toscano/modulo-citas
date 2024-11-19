import { useNavigate } from "react-router-dom";
import DatePicketFilter from "../inputs/DatePicketFilter";
import SelectSection from "../inputs/SelectSection";
import { Button } from "@mantine/core";
import { FaFilter } from "react-icons/fa";
import { useState } from "react";

const FilterTables = ({ fromDateQuery, toDateQuery, sectionIdQuery }) => {
  const [fromDate, setFromDate] = useState(fromDateQuery);
  const [toDate, setTomDate] = useState(toDateQuery);
  const [sectionId, setSectionId] = useState(sectionIdQuery);

  const navigate = useNavigate();
  const buildUrl = ({ fromDate, toDate, sectionId, status }) => {
    const params = new URLSearchParams();
    if (fromDate) params.append("fromDate", fromDate);
    if (toDate) params.append("toDate", toDate);
    if (sectionId) params.append("section", sectionId);
    if (status) params.append("estado", status);
    return `/dashboard/administrador/historial-chart?${params.toString()}`;
  };

  const handleFilterDate = () => {
    const url = buildUrl({
      pageSize: 2, // Puedes ajustar el tamaño de página aquí
      page: 1,
      fromDate,
      toDate,
      sectionId,
      status,
    });

    navigate(url);
  };

  const handleResetFilter = () => {
    setSectionId(null);
    setTomDate(null);
    setFromDate(null);

    navigate(
      `/dashboard/administrador/historial-chart`
    );
  };

  return (
    <div className="flex flex-col gap-5 mb-4 max-w-[700px]">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <Button
          onClick={handleFilterDate}
          rightSection={<FaFilter size={14} />}
        >
          FILTRAR
        </Button>

        <Button
          rightSection={<FaFilter size={14} />}
          color="red"
          onClick={handleResetFilter}
        >
          RESTAURAR FILTRO
        </Button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        <label className="flex flex-col gap-3 font-semibold">
          Inicio de fecha
          <DatePicketFilter dateTime={fromDate} setDate={setFromDate} />
        </label>
        <label className="flex flex-col gap-3 font-semibold">
          Fin de fecha
          <DatePicketFilter dateTime={toDate} setDate={setTomDate} />
        </label>
        <SelectSection sectionId={sectionId} setSectionId={setSectionId} />
      </div>
    </div>
  );
};

export default FilterTables;
