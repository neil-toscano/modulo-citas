import Header from "@/components/header/Header";
import Movil from "@/components/header/Movil";
import { useProduct } from "@/provider/ProviderContext";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Button, Select } from "@mantine/core";
import dataApi from "@/data/fetchData";

import "@mantine/dates/styles.css";
import { notifications } from "@mantine/notifications";
import Username from "@/components/username/Username";
// import Calendary from "@/components/pruebatesteo/Calendary/Calendary";
import LodingFile from "@/components/loading/LodingFile";
import { useNavigate, useSearchParams } from "react-router-dom";
import CalendaryWhite from "../../components/pruebatesteo/Calendary/CalendaryWhite";
import { UsernameHeader } from "../../components/username/UsernameHeader";

const CitaCalendaryPage = () => {
  const { user } = useProduct();
  const [dataTime, setDataTime] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [idTime, setIdTime] = useState(null);
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [timeInitial, setTimeInitial] = useState(false);
  const [update, setUpdate] = useState(false);
  const matches = useMediaQuery("(min-width: 1099px)");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("id");

  useEffect(() => {
    const getAdmi = async () => {
      const validCitaFetch = await dataApi.getValidCita(user.token, id);
      console.log(validCitaFetch, 'validCita');
      setTimeInitial(validCitaFetch?.processStatus?.verifiedAt);

      try {
        const resHorario = await dataApi.getTimeCita(user.token);

        let horarioArray = [];
        resHorario.forEach((time) => {
          horarioArray.push({
            value: time.id,
            label: `${time.startTime} ${time.endTime}`,
          });
        });

        setDataTime(horarioArray);
      } finally {
        setLoading(false);
      }
    };

    getAdmi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timeAvilid = async () => {
      setDisable(true);

      if (selectedDate) {
        //new horarios enpoint

        const getTimes = await await dataApi.getSuperTime(
          user.token,
          selectedDate,
          id
        );

        let horarioArray = [];
        getTimes.forEach((time) => {
          horarioArray.push({
            value: time.scheduleId,
            label: `${time.startTime} ${time.endTime}`,
            disabled: time.status !== "DISPONIBLE",
          });
        });

        setDisable(false);
        setDataTime(horarioArray);

        // setSelectedDate(null);
      }
    };

    timeAvilid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, update]);

  // setIdTime(null);

  const handleCreateCita = async () => {
    if (idTime && selectedDate) {
      setLoading(true);
      notifications.show({
        id: id,
        withCloseButton: true,
        autoClose: false,
        title: "Creando cita espere...",
        message: "",
        color: "green",
        // icon: <FaFilePdf />,
        className: "my-notification-class",
        loading: true,
      });
    }

    const res = await dataApi.getCreateCita(
      user.token,
      id,
      idTime,
      selectedDate
    );


    //todo valida si ya tiene cita de verdad
    await dataApi.verifyCita(user.token, id);

    if (res.status === "OPEN") {
      setLoading(false);
      notifications.update({
        id: id,
        withCloseButton: true,
        autoClose: 3000,
        title: "Cita creada exitosa",
        message: "",
        color: "green",
        // icon: <FaFilePdf />,
        className: "my-notification-class",
        loading: false,
      });
      window.open(`/tramite/confirmacion-de-cita?id=${id}`, "_blank");
      navigate(-1);
      return
    }
    if (res.ok) {
      setLoading(false);
      notifications.update({
        id: id,
        withCloseButton: true,
        autoClose: 3000,
        title: "Usted ya tiene una cita pediente",
        message: "",
        color: "red",
        // icon: <FaFilePdf />,
        className: "my-notification-class",
        loading: false,
      });
      return
    }
    if (res.error) {
      notifications.update({
        id: id,
        withCloseButton: true,
        autoClose: 3000,
        title: res.message,
        message: "",
        color: "red",
        // icon: <FaFilePdf />,
        className: "my-notification-class",
        loading: false,
      });
      setUpdate(!update);
      navigate(0);
      return;
    }

  };

  return (
    <>
      <div>
        {/* {!matches && <Movil />}
        {matches && <Header />} */}
        <main className="bg-img bg-white">
          <UsernameHeader documento={user.documentNumber} />
          <div className="px-10 py-4 relative min-h-screen">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 w-full lg:w-[70%] mx-auto">
              {loading && <LodingFile />}
              <h1 className="text-3xl font-bold uppercase text-gray-800">Reserve su cita</h1>
              <p className="text-gray-600 mt-2">Eliga su cita</p>
              <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 mt-4">
                <div className="">
                  <div className="flex gap-3 mb-4">
                    <Select
                      label="Seleccione primero una fecha"
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
                  <div className="mt-3">
                    <Button
                      disabled={!idTime || !selectedDate}
                      variant="filled"
                      color="green"
                      onClick={handleCreateCita}
                    >
                      SOLICITAR CITA
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CitaCalendaryPage;
