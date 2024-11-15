import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import esLocaleText from "./traductor";
import { Button } from "@mantine/core";

// import handleExport from "../../../utils/exportExcel";
import DatePicketFilter from "../inputs/DatePicketFilter";
import PaginationAdmiTable from "../pagination/PaginationAdmiTable";
import { useNavigate } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { BsFiletypeXls } from "react-icons/bs";
import SelectSection from "../inputs/SelectSection";

export default function TableHistoyCita({
  allUser = [],
  totalPages,
  page,
  pageSize,
  sectionIdQuery,
  toDateQuery,
  fromDateQuery,
  setRefresh,
  refresh,
  statusQuery,
}) {
  const [rows, setRows] = React.useState();
  const [fromDate, setFromDate] = React.useState(fromDateQuery);
  const [toDate, setTomDate] = React.useState(toDateQuery);
  const [activePage, setPage] = React.useState(page);
  const [sectionId, setSectionId] = React.useState(sectionIdQuery);
  const [status, setStatus] = React.useState(statusQuery);
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log("renderzer tabla x");

    const formattedUsers = allUser.map((data, i) => {
      const [datePart, timePart] = data.appointmentDate
        ? data.appointmentDate.split("T") // Separa la fecha y la hora por "T"
        : ["", ""]; // Si no hay fecha, devuelve strings vacíos
      return {
        ...data,
        // plataformista: `${data.reservedBy?.firstName.toUpperCase()} ${data.reservedBy?.apellido_paterno?.toUpperCase()} ${data.reservedBy?.apellido_materno?.toUpperCase()}`,
        cliente: `${data.reservedBy.firstName?.toUpperCase()} ${data.reservedBy.apellido_paterno?.toUpperCase()} ${data.reservedBy.apellido_materno?.toUpperCase()}`,
        dni: data.reservedBy.mobileNumber,
        id: i,
        estado: data.status,
        pdf: data.fileUrl,
        sectionName: data.section?.sectionName,
        reportDate: datePart?.split("-").reverse().join("/"), // Formatea la fecha
        reportTime: timePart?.split(".")[0], // Toma solo la hora, sin milisegundos
      };
    });
    setRows(formattedUsers);
  }, [allUser]);



  const columns = [
    { field: "cliente", headerName: "CLIENTE", flex: 1, editable: false },
    {
      field: "dni",
      headerName: "DNI",
      flex: 1,
      editable: false,
    },
    {
      field: "sectionName",
      headerName: "SECCIÓN",
      flex: 1,
      editable: false,
    },
    {
      field: "estado",
      headerName: "ESTADO",
      flex: 1,
      editable: false,
    },
    {
      field: "reportDate",
      headerName: "FECHA DEL REPORTE",
      flex: 1,
      editable: false,
    },
    {
      field: "reportTime",
      headerName: "HORA DEL REPORTE",
      flex: 1,
      editable: false,
    },

  ];

  // Función para generar el URL con los parámetros necesarios
  const buildUrl = ({
    pageSize = 2,
    page = 1,
    fromDate,
    toDate,
    sectionId,
    status,
  }) => {
    const params = new URLSearchParams();
    params.append("pageSize", pageSize);
    params.append("page", page);

    if (fromDate) params.append("fromDate", fromDate);
    if (toDate) params.append("toDate", toDate);
    if (sectionId) params.append("section", sectionId);
    if (status) params.append("estado", status);

    return `/dashboard/administrador/historial-citas-estatico?${params.toString()}`;
  };

  const handlePagination = (e) => {
    const pageSize = e.pageSize || 2; // Valor por defecto
    const url = buildUrl({ pageSize, page: 1 });
    setPage(1);
    navigate(url);
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

    setPage(1);
    navigate(url);
  };

  const handleResetFilter = () => {
    setSectionId(null);
    setTomDate(null);
    setFromDate(null);

    setPage(1);
    setRefresh(!refresh);
    navigate(
      `/dashboard/administrador/historial-citas-estatico?pageSize=${2}&page=${1}`
    );
  };

  return (
    <>
      <div className="flex flex-col gap-5 mb-4  ">
        <div className="flex gap-3 ">
          <Button
            onClick={handleFilterDate}
            rightSection={<FaFilter size={14} />}
          >
            FILTRAR
          </Button>
          <Button
            rightSection={<BsFiletypeXls size={14} />}
            // onClick={() => handleExport(rows, "Historial Citas pdf")}
          >
            EXPORTAR EXCEL
          </Button>
          <Button
            rightSection={<FaFilter size={14} />}
            color="red"
            onClick={handleResetFilter}
          >
            RESTAURAR FILTRO
          </Button>
        </div>
        <div className="flex gap-5 items-center">
          <label className="flex flex-col gap-3 font-semibold">
            Inicio de fecha
            <DatePicketFilter dateTime={fromDate} setDate={setFromDate} />
          </label>
          <label className="flex flex-col gap-3 font-semibold">
            Fin de fecha
            <DatePicketFilter dateTime={toDate} setDate={setTomDate} />
          </label>
          <SelectSection sectionId={sectionId} setSectionId={setSectionId} />
          <SelectSection
            name={"ESTADO"}
            sectionId={status}
            setSectionId={setStatus}
          />
        </div>{" "}
      </div>

      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflow: "auto",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
          "& .MuiDataGrid-root": {
            backgroundColor: "#ffffff", // Fondo verde amarillento modificado
            border: "1px solid #ccc", // Añadir una rejilla general
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#9e9d24", // Encabezado verde
            color: "#000000", // Texto blanco en el encabezado
          },
          "& .MuiDataGrid-cell": {
            borderRight: "1px solid #e0e0e0", // Bordes suaves entre celdas
            borderBottom: "1px solid #e0e0e0", // Bordes suaves entre filas
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: "#ffffff", // Footer verde
            color: "#fff", // Texto blanco en el footer
          },
          "& .fila-par": {
            backgroundColor: "#edffee", // Color de fondo para filas pares
          },
          "& .fila-impar": {
            backgroundColor: "#ffffff", // Color de fondo para filas impares
          },
        }}
      >
        <DataGrid
          initialState={{
            pagination: {
              paginationModel: { pageSize: Number(pageSize), page: 0 },
            },
          }}
          autoHeight
          rows={rows}
          columns={columns}
          editMode="row"
          getRowId={(row) => row.id}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0
              ? "fila-par"
              : "fila-impar"
          }
          sx={{
            minWidth: "100%",
            overflow: "hidden",
          }}
          localeText={esLocaleText} // Aplicar el idioma en español
          onPaginationModelChange={(e) => handlePagination(e)}
          pageSizeOptions={[2, 4, 25, 50, 100, 200]}
        />
      </Box>
      <PaginationAdmiTable
        nameUrl={"historial-citas-estatico"}
        toDate={toDate}
        fromDate={fromDate}
        sectionId={sectionId}
        pageSize={pageSize}
        navigate={navigate}
        totalPages={totalPages}
        activePage={activePage}
        setPage={setPage}
      />
    </>
  );
}
