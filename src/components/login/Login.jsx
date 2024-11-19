import { useState } from "react";
import { useForm } from "@mantine/form";
import FormLogin from "./FormLogin";
import FormCreateUser from "./FormCreateUser";
import sjl from "@/assets/logo2.png";
import ModalPasswordReset from "../modalview/ModalPasswordReset";
import HoverInformation from "./HoverInformation";
const Login = () => {
  const [view, setView] = useState(true);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      dni: "",
      password: "",
    },

    validate: {
      dni: (value) => (/^\d{8}$/.test(value) ? null : "Ingrese un DNI valido"),
      password: (value) => {
        if (value.length > 5)
          return "La contraseña debe tener al maximo 5 caracteres";
        return null;
      },
    },
  });

  const registreForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      documentNumber: "",
      firstName: "",
      apellido_paterno: "",
      apellido_materno: "",
      address: "",
      district: "",
      mobileNumber: "",
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido"),
      documentNumber: (value) => (/^\d{8}$/.test(value) ? null : "Ingrese un DNI válido"),
      mobileNumber: (value) =>
        /^\d{9}$/.test(value) ? null : "Ingrese un número válido",
      firstName: (value) => (value.trim() ? null : "El nombre es obligatorio"),

      apellido_paterno: (value) =>
        value.trim() ? null : "El apellido paterno es obligatorio",
      apellido_materno: (value) =>
        value.trim() ? null : "El apellido materno es obligatorio",
      address: (value) => (value.trim() ? null : "La dirección es obligatoria"),
      district: (value) => (value.trim() ? null : "El distrito es obligatorio"),
      password: (value) => {
        if (value.length > 5)
          return "La contraseña debe tener máximo 5 caracteres";
        return null;
      },
    },
  });

  const handleReset = () => {
    registreForm.reset();
    setView(true);
  };

  return (
    <div
      className={` border-2 px-8 py-10 bg-white rounded-xl ${
        view ? "login" : "registre"
      } `}
    >
      {/* title */}
      <div className="flex justify-center items-center mb-2">
        <img src={sjl} className="logo-img" alt="logo san juan de lurigancho" />{" "}
      </div>
      <div className="mb-3">
        <h2 className={`text-center text-[1.2rem] font-medium mb-2`}>
          {view ? "INGRESAR A GENERADOR DE CITAS" : "CREAR CUENTA"}{" "}
        </h2>
        <HoverInformation />
      </div>

      {/* form */}
      {view && <FormLogin form={form} />}
      {!view && (
        <FormCreateUser registreForm={registreForm} setView={setView} />
      )}
      {/* link bottom nav */}
      {view && (
        <div className="flex justify-between mt-3">
          <ModalPasswordReset />
          <span className="flex gap-3">
            <p
              onClick={() => setView(false)}
              className="text-xs cursor-pointer-login"
            >
              Crear Cuenta
            </p>
          </span>
        </div>
      )}
      {!view && (
        <div className="mt-3 w-full">
          <p
            className="flex items-center justify-center text-xs cursor-pointer-login"
            onClick={() => handleReset()}
          >
            Ya tengo cuenta
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
