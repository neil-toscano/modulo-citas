import dataApi from "@/data/fetchData";
import { Button, Input, Select } from "@mantine/core";
import { FaFilePdf } from "react-icons/fa6";
import ModalObservadoText from "../observado/ModalObservadoText";
import { useProduct } from "@/provider/ProviderContext";
import { Link } from "react-router-dom";

const IntestadaDocument = ({
  documentUser,
  token,
  paramsID,
  idSection,
  email = false,
  setRefresh,
  setVerified,
  setObserFile,
}) => {
  const { setDocumentUser } = useProduct();

  const url = `${import.meta.env.VITE_PUBLIC_URL}/files/pdf`;

  const handleChange = async (id, value) => {
    await dataApi.updateStatus(token, value, id, null, true);
    const data = await dataApi.getUserDocumentSection(
      token,
      idSection,
      paramsID
    );

    const allInProcess = data.some((doc) => doc.status == "EN PROCESO");
    const allVerified = data.every((doc) => doc.status == "VERIFICADO");
    const hasObserved = data.some((doc) => doc.status === "OBSERVADO");

    setObserFile(hasObserved);
    setDocumentUser(data);
    setVerified(allVerified);
    setRefresh(allInProcess);
  };


  const handleLinkPdf = async (fileUrl) => {
    try {
      const response = await fetch(`${url}/${fileUrl}`, {
        headers: {
          'ngrok-skip-browser-warning': 'true', // O cualquier valor
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
      } else {
        console.error('Error fetching the PDF:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }; 


  return (
    <div className="flex flex-col gap-3">
      {documentUser?.map((getfile, index) => (
        <div key={index} className="flex flex-col gap-2 w-full">
          <h3 className="font-semibold">{getfile.typeDocument.name}</h3>
          <div className="flex gap-3 w-full">
            <Input
              className="w-full"
              disabled
              placeholder={getfile.typeDocument.name}
            />
            {!email && (
              <Select
                className={`${
                  getfile.status === "EN PROCESO"
                    ? "bg-blue-select"
                    : getfile.status === "VERIFICADO"
                    ? "bg-green-select"
                    : "bg-red-select"
                }`}
                data={["EN PROCESO", "VERIFICADO", "OBSERVADO"]}
                value={getfile.status}
                allowDeselect={false}
                onChange={(value) => handleChange(getfile.id, value)} // Cambiado aquí
              />
            )}
            {email && (
              <Button
                variant="gradient"
                gradient={{ from: "lime", to: "green", deg: 90 }}
              >
                {getfile.status}
              </Button>
            )}
            {/* <Link target="_blank" to={`${url}/${getfile.fileUrl}`}> */}
              <Button
              onClick={()=>handleLinkPdf(getfile.fileUrl)}
                leftSection={<FaFilePdf size={14} />}
                variant="filled"
                color="red"
              >
                VER
              </Button>
            {/* </Link> */}
            {getfile.status === "OBSERVADO" && (
              <ModalObservadoText id={getfile.id} token={token} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IntestadaDocument;
