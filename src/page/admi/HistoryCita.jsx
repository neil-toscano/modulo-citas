import Movil from "@/components/header/Movil";
import { useProduct } from "@/provider/ProviderContext";
import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import dataApi from "../../data/fetchData";
import { useLocation } from "react-router-dom";
import TableHistoyCita from "../../dashboard/components/tableUser/TableHistoyCita";

const HistoryCita = () => {
  const { user } = useProduct();
  const [refresh, setRefresh] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pageSize = searchParams.get("pageSize");
  const page = searchParams.get("page");
  const fromDate = searchParams.get("fromDate");
  const toDate = searchParams.get("toDate");
  const sectionId = searchParams.get("section");
  const status = searchParams.get("estado");

  useEffect(() => {
    console.log("renderizado xdddd");

    const getHistory = async () => {
      const res = await dataApi.HistoryCitaApi(
        user.token,
        pageSize,
        page,
        fromDate,
        toDate,
        sectionId,
        status
      );

      setDataTable(res);
      return res;
    };

    getHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, pageSize, page, fromDate, sectionId, toDate, status]);

  return (
    <div>
      {<Movil role={"administrator"} />}
      <main className="bg-white p-10 main-admi relative">
        <div className="flex gap-4 justify-between mb-4">
          <h1 className="text-2xl mb-3 font-bold uppercase">
            Tabla de Historial Citas
          </h1>
          <div className="flex gap-3 items-center">
            <Button
              variant="gradient"
              gradient={{ from: "violet", to: "indigo", deg: 90 }}
              onClick={() => setRefresh(!refresh)}
            >
              ACTUALIZAR LISTA
            </Button>
          </div>
        </div>
        <div>
          <TableHistoyCita
            statusQuery={status}
            setRefresh={setRefresh}
            refresh={refresh}
            fromDateQuery={fromDate}
            toDateQuery={toDate}
            sectionIdQuery={sectionId}
            pageSize={pageSize}
            page={Number(page)}
            totalPages={dataTable.totalPages}
            allUser={dataTable.data}
            setDataTable={setDataTable}
            token={user.token}
          />
        </div>
      </main>
    </div>
  );
};

export default HistoryCita;
