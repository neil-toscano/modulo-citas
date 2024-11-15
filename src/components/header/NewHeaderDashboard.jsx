import { Badge, Box, Divider, NavLink } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { RiFolderUserFill } from "react-icons/ri";
import { FaHouseUser } from "react-icons/fa6";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { useProduct } from "@/provider/ProviderContext";
import { BsCalendar2DateFill } from "react-icons/bs";
import Logout from "../buttons/Logout";
import { useQuery } from "@tanstack/react-query";
import logoSjl from "@/assets/logo2.png";
import dataApi from "@/data/fetchData";
const data2 = [
  {
    icon: RiFolderUserFill,
    label: "INSCRIPCIÓN DE INDEPENDIZACIÓN",
    description: "Distribución de bienes sin testamento",
    link: "/dashboard/documento/",
  },
  {
    icon: FaHouseUser,
    label: "INSCRIPCIÓN DE SUBDIVISIÓN DE LOTES",
    description: "Registro de división de terrenos",
    link: "/dashboard/documento/",
  },
  {
    icon: MdOutlineFamilyRestroom,
    label: "SUCESIÓN INTESTADA",
    description: "Registro de separación legal",
    link: "/dashboard/documento/",
  },
];

const NewHeaderDashboard = ({ Followid }) => {
  const { user } = useProduct();

  const fetchAllDocument = async (token) => {
    const response = await dataApi.sectionDocument2(token);
    return response;
  };

  const { data: documentSection = [] } = useQuery({
    queryKey: ["documentSection"], // Clave de la consulta
    queryFn: () => fetchAllDocument(user.token),
    refetchOnWindowFocus: true, // No revalidar al enfocar la ventana
    enabled: !!user.token,
    retry: false,
  });

  const [countProcess, setCountProcess] = useState(0);
  const location = useLocation();
  const arrayPathname = location.pathname.split("/");
  const slug = arrayPathname[arrayPathname.length - 1];
  const slug2 = arrayPathname[arrayPathname.length - 2];

  useEffect(() => {
    const totalCount = documentSection?.reduce((acc, item) => {
      const completeStatus = item.statusCounts.filter(
        (status) => status.status === "EN_PROCESO"
      );

      const completeCount = completeStatus.reduce(
        (sum, status) => sum + parseInt(status.count, 10),
        0
      );

      return acc + completeCount;
    }, 0);

    setCountProcess(totalCount);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentSection]);
  // Usa useMemo para memorizar el cálculo de items y pendientes
  const documentNew = useMemo(() => {
    return documentSection?.map((data, index) => ({
      ...data,
      ...(data2[index] || {}),
    }));
  }, [documentSection]);

  const items = useMemo(() => {
    return (
      <NavLink
        label={
          <div className="flex gap-3">
            LISTA DE DOCUMENTOS NUEVOS
            <Badge
              variant="gradient"
              gradient={{ from: "blue", to: "violet", deg: 90 }}
              size="md"
              circle
            >
              {countProcess}
            </Badge>
          </div>
        }
        description="Documentos que se ingresan por primera vez."
        // active={`${item.sectionSlug}-nuevos` === slug}
        active={slug.split("-")[slug.split("-").length - 1] === "nuevos"}
        color="#F1A405"
        variant="filled"
      >
        {documentNew?.map((item) => {
          const WithCompleteStatus = item.statusCounts.find(
            (itemStatus) => itemStatus.status === "EN_PROCESO"
          );
          return (
            <Link
              to={`${item.link}${item.sectionSlug}-nuevos?idnuevo=${item.sectionId}`}
              key={`${item.sectionSlug}-nuevos`}
            >
              <NavLink
                active={`${item.sectionSlug}-nuevos` === slug}
                label={
                  <div className="flex gap-3">
                    {item.sectionName}{" "}
                    <Badge
                      variant="gradient"
                      gradient={{ from: "blue", to: "violet", deg: 90 }}
                      size="md"
                      circle
                    >
                      {WithCompleteStatus?.count || 0}
                    </Badge>
                  </div>
                }
                description={item.description}
                leftSection={<item.icon size="1rem" stroke={1.5} />}
                color="#f2ca00"
              />
            </Link>
          );
        })}
      </NavLink>
    );
  }, [countProcess, documentNew, slug]); // Dependencias

  const pedientes = useMemo(() => {
    return documentNew?.map((item) => {
      const WithCompleteStatusOb = item.statusCounts.find(
        (itemStatus) => itemStatus.status === "OBSERVADO"
      );

      const WithCompleteStatusPend = item.statusCounts.find(
        (itemStatus) => itemStatus.status === "CORREGIDO"
      );

      const veriPend =
        WithCompleteStatusPend?.count === undefined
          ? 0
          : WithCompleteStatusPend?.count;
      const veriOb =
        WithCompleteStatusOb?.count === undefined
          ? 0
          : WithCompleteStatusOb?.count;

      const countMax = parseInt(veriPend) + parseInt(veriOb);

      return (
        <Link
          to={`${item.link}${item.sectionSlug}-pendientes?idpendiente=${item.sectionId}`}
          key={`${item.sectionSlug}-pendientes`}
        >
          <NavLink
            active={
              `${item.sectionSlug}-pendientes-corregido` === slug ||
              `${item.sectionSlug}-pendientes-no-corregido` === slug
            }
            label={
              <div className="flex gap-3">
                {item.sectionName}
                <Badge
                  variant="gradient"
                  gradient={{ from: "blue", to: "violet", deg: 90 }}
                  size="md"
                  circle
                >
                  {countMax || 0}
                </Badge>
              </div>
            }
            description={item.description}
            leftSection={<item.icon size="1rem" stroke={1.5} />}
            color="#F1A405"
            variant="filled"
          >
            <Link
              to={`${item.link}${item.sectionSlug}-pendientes-corregido?idpendiente=${item.sectionId}`}
            >
              <NavLink
                active={`${item.sectionSlug}-pendientes-corregido` === slug}
                label={
                  <div className="flex gap-3">
                    PENDIENTE YA CORREGIDOS{" "}
                    <Badge
                      variant="gradient"
                      gradient={{ from: "blue", to: "violet", deg: 90 }}
                      size="md"
                      circle
                    >
                      {WithCompleteStatusPend?.count || 0}
                    </Badge>
                  </div>
                }
                description="Documentos que el usuario ya corrigió"
                color="#f2ca00"
              />
            </Link>
            <Link
              to={`${item.link}${item.sectionSlug}-pendientes-no-corregido?id-subpendiente=${item.sectionId}`}
            >
              <NavLink
                active={`${item.sectionSlug}-pendientes-no-corregido` === slug}
                color="#f2ca00"
                label={
                  <div className="flex gap-3">
                    PENDIENTE NO CORREGIDO{" "}
                    <Badge
                      variant="gradient"
                      gradient={{ from: "blue", to: "violet", deg: 90 }}
                      size="md"
                      circle
                    >
                      {WithCompleteStatusOb?.count || 0}
                    </Badge>
                  </div>
                }
                description="Documentos que el usuario no corrigió"
              />
            </Link>
          </NavLink>
        </Link>
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, documentNew]); // Dependencias

  const follows = useMemo(() => {
    return (
      // <Link to={`/dashboard/cita-reservada`}>

      <NavLink
        active={slug2 === "cita-reservada"}
        label="LISTA DE CITAS RESERVADAS"
        description="Visualizar todas las citas reservadas."
        leftSection={<BsCalendar2DateFill />}
        color="#F1A405"
        variant="filled"
      >
        {documentNew?.map((item) => (
          <Link
            key={item.sectionId}
            to={`/dashboard/cita-reservada/${item.sectionId}`}
          >
            <NavLink
              label={item.label} // Mostrar el nombre o descripción de la cita
              leftSection={<item.icon size="1rem" stroke={1.5} />}
              color="#f2ca00"
              active={slug === item.sectionId}
            />
          </Link>
        ))}
      </NavLink>
      // </Link>
    );
  }, [documentNew, slug]); // Dependencias

 

  return (
    <div className="w-full headerdas flex gap-0 flex-col justify-between items-center py-4  text-[white]">
      <div className="w-full flex flex-col items-center gap-4">
        <img
          className="logo-header"
          src={logoSjl}
          alt="san juan de lurigancho citas"
        />
        <h1 className="text-center text-[1.4rem] font-semibold">
          Navegación de Plataformista
        </h1>
        <div>
          <Divider
            my="xs"
            label="LISTA DE DOCUMENTOS NUEVOS"
            labelPosition="center"
          />
          <Box className="text-white-css" w={400}>
            {items}
          </Box>
        </div>

        <div>
          <Divider
            my="xs"
            label="LISTA DE DOCUMENTOS PENDIENTES"
            labelPosition="center"
          />
          <Box className="text-white-css" w={400}>
            {pedientes}
          </Box>
        </div>

        <div>
          <Divider my="xs" label="CITA RESERVADA" labelPosition="center" />
          <Box w={400}>{follows}</Box>
        </div>
      </div>

      <div className="w-full">
        <div className="w-full">
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default NewHeaderDashboard;
