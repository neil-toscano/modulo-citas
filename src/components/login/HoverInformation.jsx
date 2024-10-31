import { HoverCard, Button, Text, Group } from "@mantine/core";

function HoverInformation() {
  return (
    <Group justify="center">
      <HoverCard width={480} shadow="md">
        <HoverCard.Target>
          <Button variant="outline" color="red" size="xs">
            Nota Importante
          </Button>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text size="sm">
            ¡Importante! Al iniciar sesión en nuestra plataforma, podrás acceder
            a tu cuenta si ya estás registrado en {" "}
            <b><a href="https://plataformavirtual.munisjl.gob.pe" target="_blank">plataformavirtual.munisjl.gob.pe</a> </b>. Del mismo modo, si te registras en
            nuestra página, podrás ingresar a la plataforma del municipio. Esta
            integración te brinda mayor comodidad y flexibilidad en el acceso a
            nuestros servicios. ¡No te lo pierdas!
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </Group>
  );
}

export default HoverInformation;
