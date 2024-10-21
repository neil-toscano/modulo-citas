import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tokenLoginUser from "./token";
import dataApi from "@/data/fetchData";
import { useDispatch } from "react-redux";
import { getAllDocumentsSection } from "@/redux/documents/actions";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await tokenLoginUser(token);
        if (userData.message === "Unauthorized") {
          throw new Error("Unauthorized");
        }

        const allUsers = await dataApi.getAllUser(token);
        const document = await dataApi.sectionDocument(token);

        dispatch(getAllDocumentsSection({ token }));
        setUser(userData);
      } catch (error) {
        localStorage.removeItem("token");
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [dispatch, navigate]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
