import dataApi from "@/data/fetchData";
import { useEffect, useState } from "react";

const VisualCita = ({ id, token }) => {
  const [data, setData] = useState({});
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    const getCita = async () => {
      const res = await dataApi.verifyCita(token, id);

      setData(res.appointment);

      const date = new Date(res.appointment.appointmentDate);
      // Formatear fecha
      const day = String(date.getUTCDate()).padStart(2, "0");
      const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Los meses son 0-indexed
      const year = date.getUTCFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      setFecha(formattedDate);
    };

    getCita();
  }, [id, token]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-300">
        {/* Tarjeta destacando la Municipalidad */}
        <div className="bg-green-800 text-white text-center py-4 px-6 rounded-lg shadow-md mb-6">
          <h2 className="text-lg lg:text-xl font-bold">
            Municipalidad de San Juan de Lurigancho
          </h2>
          <p className="text-sm lg:text-base">
            Este trámite es gestionado por su municipalidad.
          </p>
        </div>

        <h1 className="text-3xl lg:text-4xl font-bold text-green-800 mb-6 text-center">
          CONFIRMACIÓN DE CITA
        </h1>
        <div className="text-center bg-green-50 text-green-900 rounded-lg py-4 px-6 shadow-inner border border-green-200">
          <p className="text-lg lg:text-xl">
            Su cita fue programada para el día{" "}
            <span className="font-semibold text-green-700">{fecha}</span>, a horas{" "}
            <span className="font-semibold text-green-700">{data?.schedule?.startTime}</span>.
          </p>
        </div>
        <div className="mt-6">
          <h3 className="text-xl lg:text-2xl font-semibold text-green-800 mb-4">
            NOTA IMPORTANTE:
          </h3>
          <ul className="list-disc pl-6 space-y-3 text-slate-700 font-bold">
            <li>
              Presentarse a la CITA, el titular con su documento identidad.
            </li>
            <li>
              En caso de representante legal: Carta poder legalizada o vigencia de poder; según corresponda.
            </li>
            <li>Traer sus documentos: Físicos y originales.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VisualCita;
