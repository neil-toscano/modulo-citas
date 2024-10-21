import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";



const MessageDocument = () => {
  const navigate = useNavigate();
  return (
    <div className="cal-header-main w-100 flex justify-center items-center">
      <div className="flex flex-col gap-3 justify-center items-center">
        <h2 className="text-3xl font-semibold">
          Ya no hay más documentos por revisar
        </h2>
        <Button
          onClick={() => navigate(-1)}
          variant="gradient"
          gradient={{ from: "indigo", to: "violet", deg: 90 }}
        >
          VOLVER
        </Button>
      </div>
    </div>
  );
};

export default MessageDocument;
