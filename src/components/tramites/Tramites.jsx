import { useEffect, useState } from "react";
import axios from "axios";
import { Radio, Group, Text } from '@mantine/core';
import { useProduct } from "../../provider/ProviderContext";
import { useNavigate } from "react-router-dom";
import dataApi from "@/data/fetchData";

export function Tramites({ onSelect }) {
    const apiUrl = import.meta.env.VITE_PUBLIC_URL;
    const { user } = useProduct();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [value, setValue] = useState(null);

    useEffect(() => {
        const fetchTramites = async () => {
            try {
                const { data } = await axios.get(`${apiUrl}/section-document`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setItems(data);
                console.log(data, 'tramites');
                const res = await dataApi.getProcessFile(user.token, sectionId);
                console.log(res, 'res');
                setLoading(false);
            } catch (err) {
                setError("Error al cargar los trámites");
                setLoading(false);
            }
        };

        fetchTramites();
    }, []);

    const handleChange = (selectedValue) => {
        setValue(selectedValue);
        onSelect(selectedValue);
    };

    if (loading) return <p>Cargando trámites...</p>;
    if (error) return <p>{error}</p>;

    const cards = items.map((item) => (
        <Radio.Card
            className="relative p-4 transition-colors duration-150 border hover:bg-gray-50 dark:hover:bg-gray-800 data-[checked]:border-blue-500"
            radius="md"
            value={item.id}
            key={item.id}
        >
            <Group align="flex-start" className="m-2">
                <Radio.Indicator />
                <div className="m-4">
                    <Text className="font-mono font-bold text-base leading-relaxed text-gray-800 dark:text-white">
                        {item.sectionName}
                    </Text>
                    <Text className="mt-2 text-gray-500 text-xs">
                        {item.sectionSlug}
                    </Text>
                </div>
            </Group>
        </Radio.Card>
    ));

    return (
        <>
            <Radio.Group
                value={value}
                onChange={handleChange}
                label="Seleccione el trámite que desea realizar"
                className="flex flex-col items-start"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
                    {cards}
                </div>
            </Radio.Group>

            <Text fz="xs" mt="md">
                Trámite seleccionado: {value || '–'}
            </Text>
        </>
    );
}
