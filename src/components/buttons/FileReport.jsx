
import { FileButton, Button, Group, Text } from "@mantine/core";

function FileReport({reportFile: file , setReportFile:setFile}) {
  return (
    <div>
      <Group justify="center">
        <FileButton onChange={setFile} accept="application/pdf,.pdf">
          {(props) => (
            <Button color="red" {...props}>
              SUBIR CARGO
            </Button>
          )}
        </FileButton>
      </Group>

      {file && (
        <Text size="sm" ta="center" mt="sm">
        {file.name}
        </Text>
      )}
    </div>
  );
}

export default FileReport;
