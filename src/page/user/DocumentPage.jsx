import Requisito from "@/components/requisitos/Requisito";
import { useProduct } from "@/provider/ProviderContext";
import { UsernameHeader } from "../../components/username/UsernameHeader";

const DocumentPage = () => {
  const { user } = useProduct();
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
