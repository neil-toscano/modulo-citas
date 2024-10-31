import { Button } from "@mantine/core";

const ButtonFollow = ({
  handleFunction = () => {},
  color,
  text,
  confirmar = false,
  allTrue,
  loading
}) => {
  return (
    <>
      {!confirmar && (
        <Button onClick={handleFunction} className="self-end" color={color}>
          {text}
        </Button>
      )}
      {confirmar && (
        <Button
          loading={loading}
          disabled={!allTrue}
          onClick={handleFunction}
          className="self-end"
          color={color}
        >
          {text}
        </Button>
      )}
    </>
  );
};

export default ButtonFollow;
