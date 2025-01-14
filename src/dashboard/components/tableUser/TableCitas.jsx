import * as React from "react";
import Box from "@mui/material/Box";
import { IoEyeSharp } from "react-icons/io5";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { Button, Modal, Select } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import esLocaleText from "./traductor"
import CalendaryWhite from "../../../components/pruebatesteo/Calendary/CalendaryWhite";
import dataApi from "../../../data/fetchData";
import { useProduct } from "@/provider/ProviderContext";
import { AiOutlineCheckCircle, AiOutlineExclamationCircle } from 'react-icons/ai';

// eslint-disable-next-line react/prop-types
export default function TablesCita({ allUser }) {
  const [rows, setRows] = React.useState([]);
  const [message, setMessage] = React.useState(null)
  const [opened, { open, close }] = useDisclosure(false);
  const Navigate = useNavigate()

  const { user } = useProduct();
  const [reservedByIdState, setReservedByIdState] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [idTime, setIdTime] = React.useState(null);
  const [timeInitial, setTimeInitial] = React.useState(false);
  const [dataTime, setDataTime] = React.useState([]);
  const [disable, setDisable] = React.useState(true);
  const [selectedAppointmentId, setSelectedAppointmentId] = React.useState(null);
  const [selectedSectionId, setSelectedSectionId] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorModalOpened, setErrorModalOpened] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [selectLabel, setSelectLabel] = React.useState("Seleccione primero una fecha");


  React.useEffect(() => {
    const getAdmi = async () => {
      setDisable(true);

      try {
        setSelectLabel("Cargando...");
        const resHorario = await dataApi.getSuperTime(user.token, selectedDate, selectedSectionId);
        let horarioArray = [];
        resHorario.forEach((time) => {
          horarioArray.push({
            value: time.scheduleId,
            label: `${time.startTime} ${time.endTime}`,
            disabled: time.status !== "DISPONIBLE",
          });
        });
        setDisable(false);
        setDataTime(horarioArray);
        setSelectLabel("Seleccione primero una fecha");
      } finally {
        // setLoading(false);
      }
    };
    if (selectedDate) {
      getAdmi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  React.useEffect(() => {
    if (allUser) {
      // eslint-disable-next-line react/prop-types
      const transformedRows = allUser.map((appointment, index) => ({
        idIndex: index,
        id: appointment.id,
        dni: appointment.reservedBy.documentNumber,
        firstName: appointment.reservedBy.firstName.toUpperCase(),
        apellido_paterno: appointment.reservedBy.apellido_paterno.toUpperCase(),
        apellido_materno: appointment.reservedBy.apellido_materno.toUpperCase(),
        mobileNumber: appointment.reservedBy.mobileNumber,
        email: appointment.reservedBy.email,
        appointmentDate: appointment.appointmentDate.split("T")[0].split("-").reverse().join("/"),
        sectionId: appointment.section.id,
        slug: appointment.section.sectionSlug,
        reservedById: appointment.reservedBy.id,
        sectionName: appointment.section.sectionName,
        timeCita: `${appointment.schedule.startTime} - ${appointment.schedule.endTime}`,
        message: appointment.message,
        isRescheduled: appointment.isRescheduled,
      }));
      setRows(transformedRows);
    }
  }, [allUser]);

  const handleReprogramarClick = async (sectionId, reservedById, message, appointmentId) => {
    const validCitaFetch = await dataApi.checkStatusUserQuery(user.token, reservedById, sectionId);
    setTimeInitial(validCitaFetch.verifiedAt);
    setSelectedSectionId(sectionId);
    setMessage(message);
    setSelectedAppointmentId(appointmentId);
    setReservedByIdState(reservedById);
    open(); // Abre el modal
  };

  const closeModal = () => {
    close();
    setSelectedDate(null);
    setDataTime(null);
    setIdTime(null);
    setSelectedAppointmentId(null);
    setSelectedSectionId(null);
    setMessage(null);
    setDisable(true);
  };

  const enviarReprogramacion = () => async () => {
    if (!selectedDate || !idTime) return;
    setIsSubmitting(true);
    const appointmentData = {
      isRescheduled: true,
      appointmentDate: selectedDate,
      scheduleId: idTime,
    }
    try {
      const response = await dataApi.updateAppointmentByPO(user.token, selectedAppointmentId, appointmentData);

      setSuccessMessage("Cita reprogramada correctamente."); // Mensaje de éxito
      setErrorMessage(null);
      closeModal();
      setErrorModalOpened(true);
    } catch (error) {
      console.error("Error al reprogramar la cita:", error);
      setSuccessMessage(null);
      setErrorMessage("Error al reprogramar la cita.");
      setErrorModalOpened(true);
      closeModal();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInformationClick = (sectionId, reservedById, slug, email, id) => () => {
    Navigate(`/dashboard/revision/${slug}/${reservedById}?id=${sectionId}&email=${email}&idCita=${id}`, {
      state: {
        id: sectionId,
        email,
        idCita: id,
      },
    })
  };

  const columns = [
    {
      field: "actions",
      type: "actions",
      headerName: "Ver usuario",
      cellClassName: "actions",
      getActions: ({ id, row }) => [
        <GridActionsCellItem
          key={id}
          icon={<IoEyeSharp size={20} />}
          label="Información"
          onClick={handleInformationClick(row.sectionId, row.reservedById, row.slug, row.email, row.id)}
        />,
      ],
    },
    {
      field: "reprogramar",
      type: "actions",
      headerName: "Reprogramar cita",
      cellClassName: "reprogramar",
      width: 200,
      getActions: ({ id, row, }) => [
        <Button
          disabled={row.isRescheduled || successMessage}
          onClick={() => handleReprogramarClick(row.sectionId, row.reservedById, row.message, row.id)}
          key={id}
          variant="gradient"
          gradient={{ from: "red", to: "pink", deg: 90 }}
        >
          REPROGRAMAR
        </Button>,
      ],
    },
    { field: "dni", headerName: "DNI", width: 150, editable: false },
    { field: "firstName", headerName: "Nombres", width: 150, editable: false },
    { field: "apellido_paterno", headerName: "Apellido Paterno", width: 150, editable: false },
    { field: "apellido_materno", headerName: "Apellido Materno", width: 150, editable: false },
    {
      field: "sectionName",
      headerName: "Sección de documento",
      width: 150,
      editable: false,
    },
    {
      field: "appointmentDate",
      headerName: "Fecha de Cita",
      width: 150,
      editable: false,
    },
    {
      field: "timeCita",
      headerName: "Horario de cita",
      width: 150,
      editable: false,
    },

    {
      field: "mobileNumber",
      headerName: "Teléfono",
      width: 150,
      editable: false,
    },
    { field: "email", headerName: "Gmail", width: 200, editable: false },
  ];

  return (
    <>
      <Box sx={{ width: "100%", height: "100%", overflow: "auto" }}>
        <Modal opened={opened} onClose={closeModal} title="Reprogramar para usuario" centered>
          <div className="flex gap-3 mb-4 ">
            <Select
              label={selectLabel}
              placeholder="Click aquí elige horario"
              data={dataTime}
              value={idTime}
              onChange={setIdTime}
              disabled={disable}
            />
          </div>
          <CalendaryWhite
            initialDate={timeInitial}
            setIdTime={setIdTime}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <Button variant="filled" onClick={enviarReprogramacion()} disabled={!selectedDate || !idTime || isSubmitting}>
            {isSubmitting ? "Reprogramando..." : "Guardar Reprogramación"}
          </Button>
        </Modal>

        <Modal opened={errorModalOpened} onClose={() => setErrorModalOpened(false)} title="Estado Cita" centered>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {successMessage ? (
              <AiOutlineCheckCircle size={24} color="green" style={{ marginRight: '10px' }} /> // Ícono de éxito
            ) : errorMessage ? (
              <AiOutlineExclamationCircle size={24} color="red" style={{ marginRight: '10px' }} /> // Ícono de error
            ) : null}
            <span>{successMessage || errorMessage}</span> {/* Mostrar el mensaje correspondiente */}
          </div>
        </Modal>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          editMode="row"
          localeText={esLocaleText} // Aplicar el idioma en español
          getRowId={(row) => row.idIndex}
          sx={{ minWidth: "100%", overflow: "hidden" }}
        />
      </Box>
    </>
  );
}
