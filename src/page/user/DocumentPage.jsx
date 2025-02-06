import Requisito from "@/components/requisitos/Requisito";
import { useProduct } from "@/provider/ProviderContext";
import { useMediaQuery } from "@mantine/hooks";
import { useSelector } from "react-redux";
import useFindSlug from "../../hooks/useFindSlug";
import { useParams } from "react-router-dom";
import { UsernameHeader } from "../../components/username/UsernameHeader";

const DocumentPage = () => {
  const { user } = useProduct();
  const { allDocumets } = useSelector((state) => state.DocumentsGlobalRedux);
  const fetDataSlug = useFindSlug(allDocumets);
  console.log(fetDataSlug, 'data2');
  const { slug } = useParams();
  return (
    <div>
      <main className="bg-img w-full relative">
        <UsernameHeader documento={user.documentNumber} />
        <Requisito/>
      </main>
    </div>
  );
};

export default DocumentPage;
