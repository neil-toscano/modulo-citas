import { PiArchiveFill } from "react-icons/pi";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

function CardUser({ slug, idSection, nuevo, pendiente }) {
  const navigate = useNavigate();

  const handleDocumentUser = () => {
    if (nuevo) {
      navigate(`/dashboard/files/${slug}/${idSection}?nuevo=true`);
    }
    if (pendiente) {
      navigate(`/dashboard/files/${slug}/${idSection}?pendiente=true`);
    }
  };

  return (
    <div className="">
      <Button
        onClick={handleDocumentUser}
        color="green"
        rightSection={<PiArchiveFill style={{ color: "white" }} size={14} />}
      >
        VER DOCUMENTOS
      </Button>
    </div>
  );
}

export default CardUser;
