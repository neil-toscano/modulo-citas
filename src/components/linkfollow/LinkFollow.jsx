import { Button } from "@mantine/core";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Link } from "react-router-dom";

const LinkFollow = ({ idDocument, sectionSlug }) => {
  return (
    <>
      {
        <>
          Ha iniciado su trámite correctamente.{" "}
          <Link
            to={`/tramite/documento-seguimiento/${sectionSlug}?id=${idDocument}`}
            className="font-bold"
          >
            <Button
              rightSection={<IoIosArrowDroprightCircle size={20} />}
              variant="gradient"
              gradient={{ from: "lime", to: "green", deg: 90 }}
            >
              IR AL SEGUIMIENTO
            </Button>
          </Link>
        </>
      }
    </>
  );
};

export default LinkFollow;
