
import CardUser from "@/components/carduser/CardUser";
import Movil from "@/components/header/Movil";
import TablesUser from "@/dashboard/components/tableUser/TableUser";
import { useProduct } from "@/provider/ProviderContext";

import  { useEffect, useState } from "react";
// Redux
import { useDispatch } from "react-redux";
import {
  fetchhAllNewTables,
  getAllPeding,
  getAllPedingUnresolved,
} from "@/redux/dashboard/actions";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";

const fetchData = async ({
  token,
  idSection,
  idSectionPendiente,
  idSectionSubPendiente,
  dispatch,
}) => {
  if (idSection) {
    return dispatch(
      fetchhAllNewTables({ token, idSection, message: false })
    ).unwrap();
  } else if (idSectionPendiente) {
    return dispatch(
      getAllPeding({ token, idSection: idSectionPendiente, message: false })
    ).unwrap();
  } else if (idSectionSubPendiente) {
    return dispatch(
      getAllPedingUnresolved({
        token,
        idSection: idSectionSubPendiente,
        message: false,
      })
    ).unwrap();
  } else {
    throw new Error("No section selected");
  }
};

const DocumentoPage = () => {
  const { user } = useProduct();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idSection = searchParams.get("idnuevo");
  const idSectionPendiente = searchParams.get("idpendiente");
  const idSectionSubPendiente = searchParams.get("id-subpendiente");
  const { namesection } = useParams();

  
  const dispatch = useDispatch();

  const { data, error, isLoading } = useQuery({
    queryKey: [
      "fetchAllNewTables",
      user.token,
      idSection,
      idSectionPendiente,
      idSectionSubPendiente,
    ],
    queryFn: () =>
      fetchData({
        token: user.token,
        idSection,
        idSectionPendiente,
        idSectionSubPendiente,
        dispatch,
      }),
    refetchInterval: 10000, // Intervalo de actualización
    staleTime: 30000, // Considerar datos frescos durante 30 segundos
    cacheTime: 60000, // Mantener datos en caché durante 60 segundos
    refetchOnWindowFocus: true, // si revalidar al enfocar la ventana
    onError: (error) => {
      console.error("Error fetching data:", error);
    },
    onSuccess: (data) => {
      console.log("Data fetched successfully:", data);
    },
  });

  const [previousData, setPreviousData] = useState(null);

  useEffect(() => {
    if (data) {
      // Si hay datos nuevos, actualiza previousData
      if (JSON.stringify(data) !== JSON.stringify(previousData)) {
        setPreviousData(data);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="">
      <Movil role={"super user"} />
      <main className="flex gap-4 flex-col py-5">
        <h2 className="font-semibold uppercase text-2xl text-center">{namesection}</h2>

        <div className="py-4 px-10">
          <div className="flex gap-3 items-center py-4">
            {idSection && (
              <CardUser
                idSection={idSection}
                pendiente={false}
                nuevo={true}
                slug={namesection}
              />
            )}
            {idSectionPendiente && (
              <CardUser
                idSection={idSectionPendiente}
                pendiente={true}
                nuevo={false}
                slug={namesection}
              />
            )}
          </div>
          {error && <div>Error loading data: {error.message}</div>} 
          <TablesUser
            nameSection={namesection}
            idSectionSubPendiente={idSectionSubPendiente}
            allUser={previousData || data}
          />
        </div>
      </main>
    </div>
  );
};

export default DocumentoPage
