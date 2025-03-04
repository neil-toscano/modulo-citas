import * as React from "react";
import Box from "@mui/material/Box";
import { IoEyeSharp, IoInformationCircleOutline } from "react-icons/io5";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import esLocaleText from "./traductor"
import { useNavigate } from "react-router-dom";

export default function TablesUser({
  allUser,
  idSectionSubPendiente,
  nameSection,
}) {
  const [rows, setRows] = React.useState(allUser);
  const navigate = useNavigate();

  React.useEffect(() => {
    const formattedUsers = allUser?.map((all) => ({
      ...all.user,
      firstName: all.user.firstName?.toUpperCase() || "",
      lastName: all.user.lastName?.toUpperCase() || "",
      birthDate: all.user.birthDate?.split("-").reverse().join("/"),
      department: all.user.department?.toUpperCase() || "",
      province: all.user.province?.toUpperCase() || "",
      district: all.user.district?.toUpperCase() || "",
    }));
    setRows(formattedUsers);
  }, [allUser]);

  const handleCustomAction = (id) => {
    const cleanedString = nameSection
      .replace(/pendientes-no-corregido/g, "")
      .trim();

    navigate(
      `/dashboard/files/${cleanedString}nuevos/${idSectionSubPendiente}?nopendiente=true&iduser=${id}`
    );
  };

  const columns = [
    ...(idSectionSubPendiente
      ? [
        {
          field: "actions",
          headerName: "Ver usuario",
          width: 150,
          renderCell: (params) => (
            <GridActionsCellItem
              icon={<IoEyeSharp
                style={{
                  fontSize: "24px",
                  color: "teal",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />}
              label="Ver"
              onClick={() => handleCustomAction(params.id)}
            />
          ),
        },
      ]
      : []),
    { field: "documentNumber", headerName: "DNI", width: 150, editable: false },
    {
      field: "firstName",
      headerName: "Nombres",
      width: 150,
      editable: false,
      renderCell: (params) => (
        params.value ? (
          params.value
        ) : (
          <div className="flex items-center gap-2 text-gray-500 italic">
            <IoInformationCircleOutline className="text-orange-500" />
            Dato no completado
          </div>
        )
      ),
    },
    {
      field: "apellido_paterno",
      headerName: "Apellidos Paterno",
      width: 200,
      editable: false,
      renderCell: (params) => (
        params.value ? (
          params.value
        ) : (
          <div className="flex items-center gap-2 text-gray-500 italic">
            <IoInformationCircleOutline className="text-orange-500" />
            Dato no completado
          </div>
        )
      ),
    },
    {
      field: "apellido_materno",
      headerName: "Apellidos Materno",
      width: 200,
      editable: false,
      renderCell: (params) => (
        params.value ? (
          params.value
        ) : (
          <div className="flex items-center gap-2 text-gray-500 italic">
            <IoInformationCircleOutline className="text-orange-500" />
            Dato no completado
          </div>
        )
      ),
    },
    // {
    //   field: "address",
    //   headerName: "Dirección",
    //   width: 200,
    //   editable: false,
    // },
    // { field: "district", headerName: "Distrito", width: 150, editable: false },
    {
      field: "mobileNumber",
      headerName: "Teléfono",
      width: 150,
      editable: false,
    },
    { field: "email", headerName: "Gmail", width: 200, editable: false },
  ];


  return (
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
      />
    </Box>
  );
}
