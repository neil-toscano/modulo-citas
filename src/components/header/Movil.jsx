import { useDisclosure } from "@mantine/hooks";
import { Drawer, Burger, Avatar } from "@mantine/core";
import Header from "./Header";

import { useProduct } from "@/provider/ProviderContext";
import NewHeaderDashboard from "./NewHeaderDashboard";
import Logout from "../buttons/Logout";
import AdmiHeader from "./AdmiHeader";

function Movil({ Followid, role }) {
  const { user } = useProduct();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <nav className="bg-white bg-blue nav-header  px-10 flex justify-between items-center py-5 sticky top-0 z-[4] ">
      <div className="flex gap-3 justify-center items-center mr-3 ">
        <Avatar variant="filled" radius="sm" color="#F1A405" src="" />
        <p className="font-semibold  uppercase">
          {user.firstName} {user.apellido_paterno} {user.apellido_materno}
        </p>
      </div>

      <Drawer className="header-drawer" opened={opened} onClose={close}>
        {role === "super user" && <NewHeaderDashboard />}
        {(role !== "super user" && role !== "administrator") && <Header close={close} Followid={Followid} />}
        {role === "administrator" && <AdmiHeader />}
      </Drawer>
      <Burger color="#F1A405" onClick={open} aria-label="Toggle navigation" />
    </nav>
  );
}

export default Movil;
