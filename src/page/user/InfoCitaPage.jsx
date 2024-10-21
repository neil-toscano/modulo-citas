import VisualCita from "@/components/visualCita/VisualCita";
import { useProduct } from "@/provider/ProviderContext";
import { useSearchParams } from "react-router-dom";


const InfoCitaPage = () => {
  const { user } = useProduct();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  
  return (
    <div className="w-full h-screen login-page flex text-white justify-center items-center p-6">
      <VisualCita id={id} token={user.token} />
    </div>
  );
};

export default InfoCitaPage;
