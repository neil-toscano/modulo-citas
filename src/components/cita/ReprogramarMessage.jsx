import {  Button, Alert } from "@mantine/core";
import { useState } from "react";
import dataApi from "@/data/fetchData";
import { FaRegStickyNote } from "react-icons/fa";
import { notifications } from "@mantine/notifications";
import { FiAlertOctagon } from "react-icons/fi";

function ReprogramarMessage({ id, token, setRefresh, refresh }) {

  const [alert, setAlert] = useState(false);

  const handleDetail = async () => {
    notifications.show({
      id: id,
      withCloseButton: true,
      autoClose: false,
      title: "Espere un momento...",
      message: "",
      color: "green",
      icon: <FaRegStickyNote />,
      className: "my-notification-class",
      loading: true,
    });
    const body = {
      status:"CLOSED",
      isRescheduled:true
    }

    const res = await dataApi.updateMessageCite(token, id, body);

    if (res.id) {
      notifications.update({
        id: id,
        withCloseButton: true,
        autoClose: 3000,
        title: "Ya puede reprogramar, gracias.",
        message: "",
        color: "green",
        icon: <FaRegStickyNote />,
        className: "my-notification-class",
        loading: false,
      });
      setRefresh(!refresh);
    }
  };



  const handleAlert = () => {
    setAlert(true);
  };

  const handleModalView = () => {
    handleDetail();
    setAlert(false);
  };

  if (alert) {
    return (
      <div className="absolute alert-repro flex justify-center items-center px-3">
        <div className="max-width-reprogramar">
          <Alert
            className="border-color-orange"
            variant="white"
            color="orange"
            radius="md"
            title="Alert title"
            icon={<FiAlertOctagon />}
          >
            <div className="py-4">
              <h3 className="text-3xl font-semibold mb-3 uppercase">
                ¿Estás seguro de que deseas reprogramar tu cita?
              </h3>
              <p>
                {" "}
                Para reprogramar tu cita, asegúrate de que la nueva fecha
                solicitada tenga al menos <b>48 horas de anticipación</b>.
                ¿Deseas continuar con la reprogramación de tu cita?
              </p>

              <div className="flex gap-3 mt-6">
                {" "}
                <Button
                  onClick={handleModalView}
                  fullWidth
                  variant="light"
                  color="green"
                >
                  CONTINUAR
                </Button>
                <Button
                  onClick={() => setAlert(false)}
                  fullWidth
                  variant="light"
                  color="red"
                >
                  CANCELAR
                </Button>
              </div>
            </div>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <>
      {
        <Button onClick={() => handleAlert()} color="red">
          REPROGRAMAR
        </Button>
      }
      {/* {message?.length > 0 && (
        <Button color="green">Reprogramación exitosa</Button>
      )} */}
    </>
  );
}

export default ReprogramarMessage;
