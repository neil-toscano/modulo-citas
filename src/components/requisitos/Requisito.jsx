import { List } from "@mantine/core";
import { useEffect, useState } from "react";

import { Stepper, Button, Group } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import FileGroup from "../intestada/FileGroup";
import LinkFollow from "../linkfollow/LinkFollow";
import dataApi from "@/data/fetchData";
import { useProduct } from "@/provider/ProviderContext";
import LodingFile from "../loading/LodingFile";
import { DatosUsuario } from "../datos-usuario/DatosUser";
import { Tramites } from "../tramites/Tramites";
import { RequisitosBySection } from "../tramites/Requisitos";
import axios from "axios";

const Requisito = ({ dataDocument, inestadaReq }) => {
  console.log(dataDocument, 'data')
  const idDocument = dataDocument?.sectionId;

  const { user } = useProduct();
  const [active, setActive] = useState(0);
  const [stateOk, setEstadoOk] = useState({});
  const [files, setFiles] = useState({}); // era objeto
  const matches = useMediaQuery("(min-width: 700px)");
  const [loadingFile, setLoadingFile] = useState(false);
  const [completFileInput, setCompletFileInput] = useState([]);
  const [memoryProcess, setMemoryProcess] = useState([]);

  const [sectionId, setSectionId] = useState(null);
  const [sectionData, setSectionData] = useState(null);
  const countFile = sectionData?.typedocument.length;

  const lengthState = Object.keys(stateOk).length;
  let allTrue = 0;
  if (lengthState !== 0)
    allTrue = Object.values(stateOk).filter((value) => value === true).length;

  useEffect(() => {
    if (user.mobileNumber && user.email) setActive(1);
  }, []);

  useEffect(() => {
    if (sectionId) verifyFileUser();
    // Limpiar o reiniciar los estados cuando cambie el idDocument
    // setActive(0);
    setEstadoOk({});
    setFiles({});
    setCompletFileInput([]);
    setMemoryProcess([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countFile, sectionId]);


  const verifyFileUser = async () => {
    console.log(stateOk, 'stateOk');
    console.log('entra');
    const res = await dataApi.getProcessFile(
      user.token,
      sectionId
    );
    console.log(res, 'respuesta/docu')
    const CompletFileInput = await dataApi.getCompletFilesInputs(
      user.token,
      sectionId
    );
    console.log(res, 'respu');
    console.log(completFileInput, 'completeFile');
    const incomplete = res?.status !== "INCOMPLETO";
    const completo = res?.status !== "COMPLETO";
    const errorStatus =
      (!res?.statusCode || res.statusCode !== 404) && res.statusCode !== 500;
    setCompletFileInput(CompletFileInput);
    setMemoryProcess(CompletFileInput);

    if (incomplete && errorStatus && completo) setActive(3);
  };


  //estados a confirmar
  const nextStep = async () => {
    //asegurate que llene el formulario
    if (active === 3) {
      const res = await dataApi.getProcessFile(user.token, sectionId);
      console.log(res, 'res');
      const resProcees = await dataApi.startTramiteDocument(user.token, res.id);
      console.log(resProcees, 'resProces');
      setActive(4);
      return;
    }
    setActive((current) => (current < 4 ? current + 1 : current));
  };

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  async function handleFormDatosSubmit(values) {
    const apiUrl = import.meta.env.VITE_PUBLIC_URL;
    const { data } = await axios.patch(`${apiUrl}/user/${user.id}`, {
      mobileNumber: values.telefono,
      email: values.email,
    }, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setActive(1);
  }

  function selectTramite(Id) {
    setSectionId(Id);
  }

  function handleTramiteSelected() {
    if (sectionId) {
      nextStep();
    }
  }

  function handleRequisitosTramite(payload) {
    setSectionData(payload);
    return;
  }

  return (
    <div className="bg-white px-10 py-10 full-call">
      <span>User: {JSON.stringify(user)}</span>
      {JSON.stringify(stateOk)}
      {JSON.stringify(allTrue)}
      {active}
      <span>countFile {countFile}</span>
      {/* <span>Requisito {JSON.stringify(sectionData)}</span> */}
      {loadingFile && <LodingFile />}
      <Stepper
        active={active}
        orientation={!matches ? "vertical" : "horizontal"}
      >

        <Stepper.Step label="DATOS DEL SOLICITANTE" description="Por ùnica vez complete sus datos">
          <List type="ordered">
            <DatosUsuario onSubmit={handleFormDatosSubmit} />
          </List>
        </Stepper.Step>

        <Stepper.Step label="TRAMITES DISPONIBLES" description="lista de tramites">
          <List type="ordered">
            <Tramites onSelect={selectTramite} />
          </List>
          <Group justify="center" mt="xl">
            <Button variant="default" onClick={prevStep}>
              Atras
            </Button>

            <Button
              onClick={handleTramiteSelected}
            >
              Continuar
            </Button>
          </Group>
        </Stepper.Step>

        <Stepper.Step label="REQUISITOS" description="Lea los requisitos">
          <RequisitosBySection sectionId={sectionId} sectionData={handleRequisitosTramite} />
          <Group justify="center" mt="xl">

            <Button variant="default" onClick={prevStep}>
              Atras
            </Button>
            <Button
              onClick={nextStep}
            >
              Continuar
            </Button>
          </Group>
        </Stepper.Step>

        <Stepper.Step label="CARGA DOCUMENTOS" description="solo archivos PDF">
          <div className="relative flex flex-col gap-3">
            <FileGroup
              setMemoryProcess={setMemoryProcess}
              memoryProcess={memoryProcess}
              setCompletFileInput={setCompletFileInput}
              completFileInput={completFileInput}
              idDocument={sectionId}
              setLoadingFile={setLoadingFile}
              dataDocument={sectionData}
              files={files}
              setFiles={setFiles}
              stateOk={stateOk}
              setEstadoOk={setEstadoOk}
            />
          </div>

          <Group justify="center" mt="xl">

            <Button variant="default" onClick={prevStep}>
              Atras
            </Button>


            <Button
              disabled={
                active === 3 &&
                !(lengthState.length === countFile) &&
                allTrue !== countFile
              }
              onClick={nextStep}
            >
              INICIAR TRÁMITE
            </Button>
          </Group>

        </Stepper.Step>

        <Stepper.Completed
          label="PROCESO COMPLETADO"
          description="Archivos completados"
        >
          <LinkFollow
            idDocument={idDocument}
            sectionSlug={dataDocument?.sectionSlug}
          />
        </Stepper.Completed>
      </Stepper>

      {/* {active !== 3 && (
        <Group justify="center" mt="xl">
          {active !== 0 && (
            <Button variant="default" onClick={prevStep}>
              Atras
            </Button>
          )}

          <Button
            disabled={
              active === 1 &&
              !(lengthState.length === countFile) &&
              allTrue !== countFile
            }
            onClick={nextStep}
          >
            {active === 0 ? "INICIAR TRAMITE" : "INICIAR TRAMITE"}
          </Button>
        </Group>
      )} */}
    </div>
  );
};

export default Requisito;
