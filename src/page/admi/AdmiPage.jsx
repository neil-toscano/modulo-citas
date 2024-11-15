import Movil from "@/components/header/Movil";
import TableAsignacion from "@/dashboard/components/tableUser/TableAsignacion";
import { useProduct } from "@/provider/ProviderContext";
import { getAllPlataform } from "@/redux/dashboard/actions";
import { Button } from "@mantine/core";
import  { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import pdfManual from "@/assets/pdf/ADMINISTRADOR.pdf"


const AdmiPage = () => {
  const dispatch = useDispatch();
  const { user } = useProduct();
  const [refresh, setRefresh] = useState(false);
  const { allDocumets } = useSelector((state) => state.DocumentsGlobalRedux);

  const { allTablePlataform } = useSelector(
    (state) => state.DashboarAdmidRedux
  );

  const [dataSelect, setDataSelect] = useState([]);

  useEffect(() => {
    const dataSection = allDocumets.map((section) => ({
      value: section.sectionId,
      label: `${section.sectionName}`,
      statusCounts: section.statusCounts,
    }));
    setDataSelect(dataSection);
    dispatch(getAllPlataform({ token: user.token }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDocumets, dispatch, refresh]);

  const handleOpenPdf = ()=>{
    window.open(pdfManual, '_blank');
  }

  return (
    <div>
      {<Movil role={"administrator"} />}
      <main className="bg-white p-10 main-admi relative">
        <div className="flex gap-4 justify-between mb-4">
          <h1 className="text-2xl mb-3 font-bold uppercase">
            Tabla de Asignaciónes
          </h1>
          <div className="flex gap-3 items-center">
            <Button
              leftSection={<FaFilePdf size={14} />}
              variant="filled"
              color="red"
              onClick={handleOpenPdf}
            >
              Manual de administrador
            </Button>
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
          <TableAsignacion
            allUser={allTablePlataform}
            dataSelect={dataSelect}
          />
        </div>
      </main>
    </div>
  );
};

export default AdmiPage;
