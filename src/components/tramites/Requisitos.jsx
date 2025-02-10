import React, { useEffect, useState } from "react";
import { List, Loader, Alert } from "@mantine/core";
import axios from "axios";
import { useProduct } from "../../provider/ProviderContext";
import { FiFileText, FiAlertCircle } from "react-icons/fi";
import { MdOutlineCheckCircle } from "react-icons/md";

export function RequisitosBySection({ sectionId, sectionData }) {
  const apiUrl = import.meta.env.VITE_PUBLIC_URL;
  const { user } = useProduct();

  const [requisitos, setRequisitos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/section-type-document`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const filteredDocuments = data?.filter((doc) => doc.sectionId === sectionId);
        setRequisitos(filteredDocuments[0].typedocument);
        sectionData(filteredDocuments[0]);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los documentos.");
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  if (loading) return <Loader color="blue" size="lg" className="mt-4" />;
  if (error)
    return (
      <Alert icon={<FiAlertCircle size={16} />} title="Error" color="red" className="mt-4">
        {error}
      </Alert>
    );

  return (
    <div
      className="p-4 mx-auto rounded-lg shadow-lg"
      style={{
        width: "100%",
        maxWidth: "70%",
        backgroundColor: "#f7fafc", // Un color neutro claro
      }}
    >
      <List type="ordered" spacing="sm" size="md" className="text-gray-800">
        {requisitos.map((item, index) => (
          <List.Item
            key={item.id}
            icon={<FiFileText className="text-blue-600" size={20} />}
            className="flex items-center"
          >
            <div className="flex gap-2 items-center">
              <MdOutlineCheckCircle className="text-green-500" size={20} />
              {index + 1}.- {item.name}
            </div>
          </List.Item>
        ))}
      </List>
    </div>
  );
}
