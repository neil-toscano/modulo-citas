"use client";
import { PiArchiveFill } from "react-icons/pi";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";

function CardUser({slug, idSection, nuevo, pendiente }) {
  const router = useRouter();

  const handleDocumentUser = () => {
    if (nuevo) {
      router.push(`/dashboard/${slug}/${idSection}?nuevo=true`);
    }
    if (pendiente) {
      router.push(`/dashboard/${slug}/${idSection}?pendiente=true`);
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
