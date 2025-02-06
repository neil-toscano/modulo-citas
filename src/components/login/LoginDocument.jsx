import { useState } from "react";
import { useForm } from "@mantine/form";
import FormDocumentLogin from "./FormDocumentLogin";
const LoginDocument = ({view,setView}) => {
  
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      dni: "",
    },

    validate: {
      dni: (value) => (/^\d{8}$/.test(value) ? null : "Ingrese un DNI valido"),
    },
  });


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
      </div>

      {/* form */}
      {view && <FormDocumentLogin form={form} />}
      {/* link bottom nav */}
     
    </div>
  );
};

export default LoginDocument;
