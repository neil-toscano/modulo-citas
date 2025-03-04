import Movil from "@/components/header/Movil";
import { useProduct } from "@/provider/ProviderContext";
import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import dataApi from "../../data/fetchData";
import TableAdmiReport from "../../dashboard/components/tableUser/TableAdmiReport";
import { useLocation } from "react-router-dom";

const ReportAtencion = () => {
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

  useEffect(() => {
    const getHistory = async () => {
      const res = await dataApi.PageHistoryProcess(
        user.token,
        pageSize,
        page,
        fromDate,
        toDate,
        sectionId
      );
      setDataTable(res);
      return res;
    };

    getHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, pageSize, page, fromDate, sectionId,toDate]);
 
 
  return (
    <div>
      {<Movil role={"administrator"} />}
      <main className="bg-white p-10 main-admi relative">
        <div className="flex gap-4 justify-between mb-4">
          <h1 className="text-[1.2rem] lg:text-2xl mb-3 font-bold uppercase">
            Tabla de Historial de Atenciones
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
           <TableAdmiReport
            setRefresh={setRefresh}
            refresh={refresh}
            fromDateQuery={fromDate}
            toDateQuery={toDate}
            sectionIdQuery={sectionId}
            pageSize={pageSize}
            page={Number(page)}
            totalPages={dataTable?.totalPages}
            allUser={dataTable.data}
            setDataTable={setDataTable}
          />
        </div>
      </main>
    </div>
  );
};

export default ReportAtencion;
