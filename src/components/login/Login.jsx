import { useState } from "react";
import { useForm } from "@mantine/form";
import FormLogin from "./FormLogin";
import FormCreateUser from "./FormCreateUser";
import ModalPasswordReset from "../modalview/ModalPasswordReset";
import HoverInformation from "./HoverInformation";
const Login = ({view,setView}) => {
  
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      dni: "",
      password: "",
    },

    validate: {
      dni: (value) => (/^\d{8}$/.test(value) ? null : "Ingrese un DNI valido"),
      password: (value) => {
        const regex = /^[a-zA-Z0-9]{1,5}$/; // Expresión regular para máximo 5 caracteres, solo números y letras.
        if (!regex.test(value)) {
          return "La contraseña debe tener máximo 5 caracteres y solo contener números o letras.";
        }
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
        const regex = /^[a-zA-Z0-9]{1,5}$/; // Expresión regular para máximo 5 caracteres, solo números y letras.
        if (!regex.test(value)) {
          return "La contraseña debe tener máximo 5 caracteres y solo contener números o letras.";
        }
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
      className={` px-8 py-10 z-[2] ${
        view ? "login" : "registre"
      } `}
    >
      {/* title */}
      <div className="flex justify-center items-center mb-6">
        <h1 className="text-8xl text-center font-bold text-[red] ">Jesús <p className="text-5xl text-black">Alcalde</p></h1>
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
