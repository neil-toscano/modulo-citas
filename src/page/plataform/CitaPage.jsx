import Movil from "@/components/header/Movil";
import TablesCita from "@/dashboard/components/tableUser/TableCitas";
import dataApi from "@/data/fetchData";
import { useProduct } from "@/provider/ProviderContext";
import { useQuery } from "@tanstack/react-query";

const CitaPage = () => {
  const { user } = useProduct();

  const { data: allCita = [], refetch } = useQuery({
    queryKey: ['citaReserv'], // Clave de la consulta
    queryFn: () => dataApi.getAllCitaReserv(user.token),
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
