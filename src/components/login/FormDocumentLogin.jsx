import { useLocalStorage } from "@mantine/hooks";
import {
  Button,
  Group,
  InputBase,
} from "@mantine/core";
import { LiaDigitalTachographSolid } from "react-icons/lia";
import { useNavigate } from 'react-router-dom';
import { notifications } from "@mantine/notifications";
import { IMaskInput } from "react-imask";
import pdfManual from "@/assets/pdf/ADMINISTRADO.pdf"
import { FaFilePdf } from "react-icons/fa";
import axios from "axios";

const FormDocumentLogin = ({ form }) => {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;

  const navigate = useNavigate();

  const [token, setToken] = useLocalStorage({
    key: "token",
    defaultValue: false,
  });

  const loginApi = async (e) => {
    notifications.show({
      id: 70,
      withCloseButton: true,
      autoClose: false,
      title: "Verificando",
      message: "espere mientras validamos su datos",
      color: "green",
      loading: true,
    });

    try {
      const { data } = await axios.post(`${apiUrl}/auth/document`, {
        documentNumber: e.dni,
      })
      setToken(data.token);

      if (data.roles[0] == "user") {
        notifications.update({
          id: 70,
          withCloseButton: true,
          autoClose: 3000,
          title: 'Bienvenido',
          message: "",
          color: "green",
          loading: false,
        });
        navigate("/tramite/documento/inscripcion-de-independizacion");
        return;
      } else if (jsondata.roles[0] == "platform-operator") {
        notifications.update({
          id: 70,
          withCloseButton: true,
          autoClose: 3000,
          title: 'Bienvenido',
          message: "",
          color: "green",
          className: "",
          loading: false,
        });

        navigate(`/dashboard/presentacion`);
        return;
      } else if (jsondata.roles[0] === "administrator") {
        notifications.update({
          id: 70,
          withCloseButton: true,
          autoClose: 3000,
          title: 'Bienvenido',
          message: "",
          color: "green",
          className: "",
          loading: false,
        });
        navigate("/dashboard/administrador/asignacion");
        return;
      }
    } catch (error) {
      const response = error.response;
      if (response.data) {
        notifications.update({
          id: 70,
          withCloseButton: true,
          autoClose: 3000,
          title: response.data.message[0],
          message: "",
          color: "red",
          className: "error-login",
          loading: false,
        });
      }
    }
  };

  const handleOpenPdf = () => {
    window.open(pdfManual, '_blank');
  }

  return (
    <>
      <form
        className="flex flex-col gap-3"
        onSubmit={
          form.onSubmit((values) => loginApi(values))
        }
      >
        <InputBase
          withAsterisk
          label="DNI"
          component={IMaskInput}
          mask="00000000"
          placeholder="Ingrese su dni"
          leftSection={
            <LiaDigitalTachographSolid
              className="flex justify-center items-center"
              size={16}
            />
          }
          key={form.key("dni")}
          {...form.getInputProps("dni")}
        />

        <Group className="w-full" mt="md">
          <Button type="submit" fullWidth>
            INGRESAR
          </Button>
          <Button leftSection={<FaFilePdf size={14} />} fullWidth variant="filled" color="red" onClick={handleOpenPdf}>Manual de usuario</Button>
        </Group>
      </form>
    </>
  );
};

export default FormDocumentLogin;
