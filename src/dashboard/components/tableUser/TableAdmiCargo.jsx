import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import esLocaleText from "./traductor";
import { Button } from "@mantine/core";

import handleExport from "../../../utils/exportExcel";
import DatePicketFilter from "../inputs/DatePicketFilter";
import PaginationAdmiTable from "../pagination/PaginationAdmiTable";
import { useNavigate } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import { BsFiletypeXls } from "react-icons/bs";
import SelectSection from "../inputs/SelectSection";

export default function TableAdmiCargo({
  allUser,
  totalPages,
  page,
  pageSize,
  sectionIdQuery,
  toDateQuery,
  fromDateQuery,
  setRefresh,
  refresh,
}) {
  const [rows, setRows] = React.useState(allUser);
  const [fromDate, setFromDate] = React.useState(fromDateQuery);
  const [toDate, setTomDate] = React.useState(toDateQuery);
  const [activePage, setPage] = React.useState(page);
  const [sectionId, setSectionId] = React.useState(sectionIdQuery);
  const navigate = useNavigate();
  

  React.useEffect(() => {
    const formattedUsers = allUser?.map((data, i) => {
      const [datePart, timePart] = data.createdAt
        ? data.createdAt.split("T") // Separa la fecha y la hora por "T"
        : ["", ""]; // Si no hay fecha, devuelve strings vacíos

      return {
        ...data,
        plataformista: `${data.platformUser?.firstName.toUpperCase()} ${data.platformUser?.apellido_paterno?.toUpperCase()} ${data.platformUser?.apellido_materno?.toUpperCase()}`,
        cliente: `${data.user.firstName?.toUpperCase()} ${data.user.apellido_paterno?.toUpperCase()} ${data.user.apellido_materno?.toUpperCase()}`,
        dni: data.user.mobileNumber,
        id: i,
        pdf: data.appointment.fileUrl,
        sectionName: data.section?.sectionName,
        reportDate: datePart?.split("-").reverse().join("/"), // Formatea la fecha
        reportTime: timePart?.split(".")[0], // Toma solo la hora, sin milisegundos
      };
    });
    setRows(formattedUsers);
  }, [allUser]);


  const handleButtonPdf = (pdf) => {
    const url = `${import.meta.env.VITE_PUBLIC_URL}/files/pdf/${pdf}`;
    window.open(url, "_blank");
  };

  const columns = [
    {
      field: "plataformista",
      headerName: "PLATAFORMISTA",
      flex: 1,
      editable: false,
    },
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
    {
      field: "Cargos", // Columna para el botón
      headerName: "Cargos",
      flex: 1,
      renderCell: (params) => (
        <Button
          disabled={!params.row.pdf}
          color="red"
          onClick={() => handleButtonPdf(params.row.pdf)}
        >
          REPORTE PDF
        </Button>
      ),
    },
  ];

  const handlePagination = async (e) => {
    setPage(1);
    navigate(
      `/dashboard/administrador/historial-reporte-cargo?pageSize=${
        e.pageSize
      }&page=${1}`
    );
  };
  const handleFilterDate = async () => {
    const urlPag = "/dashboard/administrador/historial-reporte-cargo";

    if (fromDate && toDate && !sectionId) {
      navigate(
        `${urlPag}?pageSize=${2}&page=${1}&fromDate=${fromDate}&toDate=${toDate}`
      );
      setPage(1);
      return;
    }
    if (fromDate && toDate && sectionId) {
      navigate(
        `${urlPag}?pageSize=${2}&page=${1}&section=${sectionId}&fromDate=${fromDate}&toDate=${toDate}`
      );
      setPage(1);
    }
    if (!fromDate && !toDate && sectionId) {
      navigate(`${urlPag}?pageSize=${2}&page=${1}&section=${sectionId}`);
      setPage(1);
    }
  };

  const handleResetFilter = () => {
    setSectionId(null);
    setTomDate(null);
    setFromDate(null);

    setPage(1);
    setRefresh(!refresh);
    navigate(
      `/dashboard/administrador/historial-reporte-cargo?pageSize=${2}&page=${1}`
    );
  };


  return (
    <>
      <div className="flex flex-col gap-5 mb-4  max-w-[700px]">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          <Button
            onClick={handleFilterDate}
            rightSection={<FaFilter size={14} />}
          >
            FILTRAR
          </Button>
          <Button
            rightSection={<BsFiletypeXls size={14} />}
            onClick={() => handleExport(rows, "Reporte cargo pdf")}
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
        nameUrl={"historial-reporte-cargo"}
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
