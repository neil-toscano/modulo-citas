
import { Navigate, Outlet } from "react-router-dom";
import tokenLoginUser from "./token"; // Asegúrate de que la ruta sea correcta
import { useProduct } from "@/provider/ProviderContext";
import LoadingSJL from "@/components/loading/LoadingSJL";
import dataApi from "@/data/fetchData";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { getAllDocumentsSection } from "@/redux/documents/actions";

const PrivateRoute = ({ children, requiredRole }) => {

  const dispatch = useDispatch();
  const { setUser, setDocumentSection } = useProduct();

  // Función para verificar el token y obtener los datos del usuario
  const fetchUserData = async (token) => {
    const userData = await tokenLoginUser(token);

    if (!userData || userData.message === "Unauthorized") {
      throw new Error("Unauthorized");
    }

    
    const document = await dataApi.sectionDocument(token);

    dispatch(getAllDocumentsSection({ token }));
    setDocumentSection(document);
    setUser(userData);

    if (requiredRole && userData.roles[0] !== requiredRole) {
      throw new Error("Unauthorized role");
    }

    return userData;
  };

  const {
    data: userData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["userData"], // Clave única para la consulta
    queryFn: () => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      return fetchUserData(token);
    },
    retry: false, // No reintentar en caso de error
    refetchOnWindowFocus: false, // No revalidar al enfocar la ventana
    onError: (error) => {
      console.error("Error during authentication:", error);
      localStorage.removeItem("token");
    },
  });

  if (isLoading) {
    return <LoadingSJL />;
  }

  if (error) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
