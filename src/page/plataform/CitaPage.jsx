import Movil from "@/components/header/Movil";
import TablesCita from "@/dashboard/components/tableUser/TableCitas";
import dataApi from "@/data/fetchData";
import { useProduct } from "@/provider/ProviderContext";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const CitaPage = () => {
  const { user } = useProduct();
  const { idsection } = useParams();

  const { data: allCita = [], refetch } = useQuery({
    queryKey: ['citaReserv', idsection], // Clave de la consulta
    queryFn: () => dataApi.getAllCitaReserv(user.token, idsection),
    refetchInterval: 30000, // Refresca automáticamente cada 30 segundos
    enabled: !!user.token, // Solo ejecuta si el token está disponible
    refetchOnWindowFocus: true,
  });

  return (
    <div className="">
      <Movil role={"super user"} />
      <main className="bg-white p-10">
        <TablesCita
          allUser={allCita}
          setRefresh={refetch} // Usa refetch para actualizar manualmente
        />
      </main>
    </div>
  );
};

export default CitaPage;
