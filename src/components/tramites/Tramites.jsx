import { useEffect, useState } from "react";
import axios from "axios";
import { Radio, Group, Text } from '@mantine/core';
import { useProduct } from "../../provider/ProviderContext";
import dataApi from "@/data/fetchData";
import { useNavigate } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";

export function Tramites({ onSelect }) {
    const apiUrl = import.meta.env.VITE_PUBLIC_URL;
    const { user } = useProduct();

    const navigate = useNavigate();

    const estadosPermitidos = ['EN_PROCESO', 'OBSERVADO', 'VERIFICADO', 'CITA_PROGRAMADA', 'CORREGIDO'];
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

                const tramitesConEstado = await Promise.all(data.map(async (tramite) => {
                    try {
                        const res = await dataApi.getProcessFile(user.token, tramite.id);
                        const estadoValido = estadosPermitidos.includes(res.status);
                        return {
                            ...tramite,
                            estado: estadoValido ? true : false,
                        };
                    } catch (err) {
                        console.log('errores');
                        return {
                            ...tramite,
                            estado: 'NO_INICIADO',
                        };
                    }
                }));

                setItems(tramitesConEstado);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setError("Error al cargar los trámites");
                setLoading(false);
            }
        };

        fetchTramites();
    }, []);

    const handleChange = (selectedValue) => {

        const selectedItem = items.find(item => item.id === selectedValue);
        if (selectedItem.estado) {
            navigate(`/tramite/documento-seguimiento/${selectedItem.sectionSlug}?id=${selectedItem.id}`);
            return;
        }
        setValue(selectedValue);
        onSelect(selectedValue);

    };

    if (loading) return <p>Cargando trámites...</p>;
    if (error) return <p>{error}</p>;

    const cards = items.map((item) => {
        const cardStyle = item.estado
            ? {
                border: '1px solid #28a745',
                backgroundColor: '#f2f3f4',
                boxShadow: '0 0 7px #28a745',
            }
            : {
                border: '2px solid #dee2e6',
                backgroundColor: 'white',
            };

        return (
            <Radio.Card
                className={`relative p-4 transition-colors duration-150 hover:bg-gray-50`}
                style={cardStyle}
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
                        <Text className="mt-2 text-gray-500 text-xs flex items-center">
                            <FaCircleCheck className="w-4 h-4 text-black-500 mr-1" />
                            {item.sectionSlug}
                        </Text>
                        {
                            item.estado && (
                                <div className="flex items-center">
                                    <FaCircleCheck className="w-4 h-4 text-orange-500 mr-1" />
                                    <span className="text-orange-400 text-md font-medium">
                                        Proceso iniciado
                                    </span>
                                </div>
                            )
                        }
                        <br />
                        {item.estado && (
                            <>
                                <div className="mt-4 inline-flex items-center px-3 py-1 bg-green-100 border border-green-400 rounded-full">
                                    <span
                                        className="ml-2 text-green-700 text-sm font-medium flex items-center cursor-pointer"
                                    >
                                        Ver seguimiento
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4 ml-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </Group>
            </Radio.Card>
        );
    });


    return (
        <>
            <Radio.Group
                value={value}
                onChange={handleChange}
                label="Seleccione el trámite que desea realizar"
                className="flex flex-col items-center"
                styles={{
                    label: {
                        fontSize: '1.25rem', // Cambia el tamaño según tus necesidades
                        fontWeight: 'bold',
                        color: '#2689ec'  // Opcional: para hacer el texto más grueso
                    },
                }}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4 pt-4">
                    {cards}
                </div>
            </Radio.Group>
        </>
    );
}