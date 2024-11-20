import Movil from "@/components/header/Movil";
import { useProduct } from "@/provider/ProviderContext";
import { BarChart } from "@mantine/charts";
import "@mantine/charts/styles.css";
import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import dataApi from "../../data/fetchData";
import FilterTables from "../../dashboard/components/tableUser/FilterTables";
const data = [
    { month: "January", Revisiones: 12 },
    { month: "February", Revisiones: 8 },
    { month: "March", Revisiones: 15 },
    { month: "April", Revisiones: 22 },
    { month: "May", Revisiones: 18 },
    { month: "June", Revisiones: 30 },
    { month: "July", Revisiones: 25 },
    { month: "August", Revisiones: 35 },
    { month: "September", Revisiones: 20 },
    { month: "October", Revisiones: 28 },
    { month: "November", Revisiones: 50 },
    { month: "December", Revisiones: 40 },
  ];

const ChartPage = () => {
  const { user } = useProduct();

  const [refresh, setRefresh] = useState(false);
  const [dataTable, setDataTable] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const fromDate = searchParams.get("fromDate");
  const toDate = searchParams.get("toDate");
  const sectionId = searchParams.get("section");

  useEffect(() => {
    const getHistory = async () => {
      const res = await dataApi.ChartDataApi(
        user.token,
        fromDate,
        toDate,
        sectionId
      );
      const fomrDataChart = res.map(charts =>{
        return {month:charts.data[0], label:charts.labels[0]}
      })
      setDataTable(fomrDataChart);
      return res;
    };

    getHistory();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, fromDate, sectionId, toDate]);

  
  return (
    <div>
      {<Movil role={"administrator"} />}
      <main className="bg-white p-10 main-admi relative">
        <div className="flex gap-4 justify-between mb-4">
          <h1 className="text-[1.2rem] lg:text-2xl mb-3 font-bold uppercase">
            Estadisticas de citas
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
        <div className="flex flex-col gap-10">
          <FilterTables />
          <BarChart
            h={300}
            data={data}
            dataKey="month"
            series={[
              { name: "Revisiones", color: 'blue' }, // Representa las revisiones
            ]}
            tickLine="y"
          />
        </div>
      </main>
    </div>
  );
};

export default ChartPage;
