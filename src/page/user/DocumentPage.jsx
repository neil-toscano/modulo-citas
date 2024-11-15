import Header from "@/components/header/Header";
import Movil from "@/components/header/Movil";
import Requisito from "@/components/requisitos/Requisito";
import Username from "@/components/username/Username";
import { useProduct } from "@/provider/ProviderContext";
import { useMediaQuery } from "@mantine/hooks";
import { useSelector } from "react-redux";
import useFindSlug from "../../hooks/useFindSlug";
import { useParams } from "react-router-dom";

const DocumentPage = () => {
  const { user } = useProduct();
  const { allDocumets } = useSelector((state) => state.DocumentsGlobalRedux);
  const fetDataSlug = useFindSlug(allDocumets);
  const matches = useMediaQuery("(min-width: 1099px)");
  const { slug } = useParams();
  return (
    <div className="body-grid">
      {!matches && <Movil />}
      {matches && <Header />}
      <main className="bg-img w-full relative">
        {matches && (
          <Username
            firstName={user.firstName}
            paterno={user.apellido_paterno}
            materno={user.apellido_materno}
          />
        )}
        <Requisito inestadaReq={slug === "sucesion-intestada"} dataDocument={fetDataSlug} />
      </main>
    </div>
  );
};

export default DocumentPage;
