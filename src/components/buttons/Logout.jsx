import { Button } from "@mantine/core";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleClose = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <Button
      onClick={handleClose}
      variant="gradient"
      gradient={{ from: "red", to: "pink", deg: 90 }}
      fullWidth
      leftSection={<CiLogout size={14} />}
    >
      Cerrar sesión
    </Button>
  );
};

export default Logout;
