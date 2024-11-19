import { Box, Divider, NavLink } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";

import { TbZoomCheckFilled } from "react-icons/tb";
import Logout from "../buttons/Logout";

import logoSjl from "@/assets/logo2.png";
import { FaCalendarAlt, FaFilePdf, FaRegChartBar, FaUserShield } from "react-icons/fa";

const data2 = [
  {
    icon: FaUserShield,
    label: "ASIGNACIÓN DE ROLES",
    description: "Gestión y asignación de roles a usuarios",
    link: "/dashboard/administrador/asignacion",
    active: "asignacion"
  },
  {
    icon: TbZoomCheckFilled ,
    label: "HISTORIAL DE REVISIÓN",
    description: "Registro de todas las revisiones realizadas",
    link: "/dashboard/administrador/historial-revision?pageSize=50&page=1",
    active: "historial-revision"
  },
  {
    icon: FaFilePdf,
    label: "REPORTE DE ATENCIONES",
    description: "Reporte detallado de las atenciones brindadas",
    link: "/dashboard/administrador/historial-reporte-cargo?pageSize=50&page=1",
    active: "historial-reporte-cargo"
  },
  {
    icon: FaCalendarAlt,
    label: "HISTORIAL CITA",
    description: "Historial de citas fijas o recurrentes",
    link: "/dashboard/administrador/historial-citas-estatico?pageSize=50&page=1",
    active: "historial-citas-estatico"
  },
  {
    icon: FaRegChartBar ,
    label: "DASHBOARD",
    description: "Visualización y análisis de datos relacionados con las citas",
    link: "/dashboard/administrador/historial-chart",
    active: "historial-chart"
  },
];


const AdmiHeader = ({ Followid }) => {
  const location = useLocation();
  const arrayPathname = location.pathname.split("/");
  const slug = arrayPathname[arrayPathname.length - 1];

  const items = useMemo(() => {
    return data2?.map((item) => {
      return (
        <Link
          to={`${item.link}`}
          key={item.label}
        >
          <NavLink
            variant="filled"
            active={item.active === slug}
            label={<div className="flex gap-3">{item.label} </div>}
            description={item.description}
            leftSection={<item.icon size="1rem" stroke={1.5} />}
            color="#F1A405"
          />
        </Link>
      );
    });
  }, [slug]); // Dependencias

  return (
    <div className="w-full headerdas flex gap-0 flex-col justify-between items-center py-4">
      <div className="w-full flex flex-col items-center gap-4">
        <img
          className="logo-header"
          src={logoSjl}
          alt="san juan de lurigancho citas"
        />
        <h1 className="text-center text-[1.4rem] font-semibold">
          Navegación de administrador
        </h1>
        <div>
          <Divider
            my="xs"
            label="LISTA DE REPORTES E HISTORIAS"
            labelPosition="center"
          />
          <Box className="text-white-css" w={400}>
            {items}
          </Box>
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

export default AdmiHeader;
