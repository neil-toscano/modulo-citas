import { Box, Divider, NavLink } from "@mantine/core";
import { RiFolderUserFill } from "react-icons/ri";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa6";

import { useSelector } from "react-redux";
import Logout from "../buttons/Logout";
import { Link, useLocation } from "react-router-dom";

const data2 = [
  {
    icon: RiFolderUserFill,
    label: "INSCRIPCIÓN DE INDEPENDIZACIÓN",
    description: "Distribución de bienes sin testamento",
    link: "/tramite/documento/inscripcion-de-independizacion",
  },
  {
    icon: FaHouseUser,
    label: "INSCRIPCIÓN DE SUBDIVISIÓN DE LOTES",
    description: "Registro de división de terrenos",
    link: "/tramite/documento/inscripcion-de-subdivision-de-lotes",
  },
  {
    icon: MdOutlineFamilyRestroom,
    label: "SUCESIÓN INTESTADA",
    description: "Registro de separación legal",
    link: "/tramite/documento/sucesion-intestada",
  },
];

const Header = () => {
  const location = useLocation();
  const { allDocumets } = useSelector((state) => state.DocumentsGlobalRedux);
  const arrayPhatname = location.pathname.split("/");
  console.log(arrayPhatname);

  const slug = arrayPhatname[arrayPhatname.length - 1];
  const documentNew = allDocumets.map((data, index) => ({
    ...data,
    ...(data2[index] || {}),
  }));

  const tramite = documentNew.map((item, index) => (
    <Link to={item.link} key={index}>
      <NavLink
        key={item.sectionId}
        active={item.sectionSlug == slug && arrayPhatname[2] === "documento"}
        label={item.sectionName}
        description={item.description}
        leftSection={<item.icon size="1rem" stroke={1.5} />}
        color="lime"
        variant="filled"
      />
    </Link>
  ));

  const follows = documentNew.map((item) => {
    return (
      <Link
        to={`/tramite/documento-seguimiento/${item.sectionSlug}?id=${item.sectionId}`}
        key={item.sectionId}
      >
        <NavLink
          key={item.sectionId}
          active={
            `${item.sectionSlug}` === slug &&
            arrayPhatname[2] === "documento-seguimiento"
          }
          label={item.sectionName}
          description={item.description}
          leftSection={<item.icon size="1rem" stroke={1.5} />}
          color="lime"
          variant="filled"
        />
      </Link>
    );
  });

  return (
    <div className="w-full flex h-full gap-0 flex-col justify-between  items-center  py-4 bg-[#365f96] text-[white]">
      <div className="w-full flex flex-col items-center  gap-4">
        <h1 className="text-center text-[1.4rem] font-semibold">
          ¿Qué trámite desea realizar?
          <Divider my="xs" label="TRAMITES" labelPosition="center" />
        </h1>
        <Box className="text-white-css" w={320}>
          {tramite}
        </Box>
        {/* seguimiento */}

        <div>
          <Divider my="xs" label="SEGUIMIENTO" labelPosition="center" />
          <Box w={320}>{follows}</Box>
        </div>
      </div>
      <div className="w-full px-5">
        <Logout />
      </div>
    </div>
  );
};

export default Header;
