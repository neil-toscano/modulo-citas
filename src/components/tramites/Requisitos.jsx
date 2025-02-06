import React, { useEffect, useState } from "react";
import { List } from "@mantine/core";
import axios from "axios";
import { useProduct } from "../../provider/ProviderContext";

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

                const filteredDocuments = data?.filter(
                    (doc) => doc.sectionId === sectionId
                );
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

    if (loading) return <p>Cargando documentos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <List type="ordered">
            {requisitos.map((item, index) => (
                <List.Item key={item.id}>
                    {++index}.- {item.name}
                </List.Item>
            ))}
        </List>
    );
}
