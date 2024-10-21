import { useDisclosure } from "@mantine/hooks";
import { Modal, Button} from "@mantine/core";


function ModalView({ detalle }) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} title="Detalle del Observado">
        <p>{detalle} </p>
      </Modal>

      <Button className="self-center" onClick={open}>
        Ver detalle
      </Button>
    </>
  );
}

export default ModalView;
