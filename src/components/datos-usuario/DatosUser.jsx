import { useForm } from '@mantine/form';
import { TextInput, Button, Title, Card } from '@mantine/core';

export function DatosUsuario({ onSubmit }) {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { telefono: '', email: '' },

    validate: {
      telefono: (value) =>
        value.length !== 9 ? 'El teléfono debe tener exactamente 9 caracteres' : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Correo electrónico no válido'),
    },
  });

  return (
    <Card
      shadow="md"
      padding="lg"
      radius="md"
      className="w-full md:w-3/5 mx-auto bg-white border border-gray-200"
    >
      <Title order={3} align="center" className="mb-4 text-blue-600">
        Datos del Solicitante
      </Title>
      <form onSubmit={form.onSubmit(onSubmit)} className="space-y-4">
        <TextInput
          label="Teléfono"
          placeholder="958309791"
          key={form.key('telefono')}
          {...form.getInputProps('telefono')}
          radius="md"
          size="md"
        />
        <TextInput
          label="Correo"
          placeholder="neil.amstrong@gmail.com"
          key={form.key('email')}
          {...form.getInputProps('email')}
          radius="md"
          size="md"
        />
        <div className="grid justify-items-end">
          <Button type="submit" radius="md" size="md" className="bg-blue-600 hover:bg-blue-700">
            Continuar
          </Button>
        </div>
      </form>
    </Card>
  );
}
