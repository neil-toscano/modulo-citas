import Movil from "@/components/header/Movil";
import TablesCita from "@/dashboard/components/tableUser/TableCitas";
import dataApi from "@/data/fetchData";
import { useProduct } from "@/provider/ProviderContext";
import { useEffect, useState } from "react";

const CitaPage = () => {
  const [allCita, setAllCita] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { user } = useProduct();
  useEffect(() => {
    const getCita = async () => {
      const res = await dataApi.getAllCitaReserv(user.token);
      setAllCita(res);
    };
    getCita();
  }, [user.token, refresh]);

  return (
    <div className="">
      {<Movil role={"super user"} />}
      <main className="bg-white p-10">
        {
          <TablesCita
            allUser={allCita}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        }
      </main>
    </div>
  );
};

export default CitaPage;
