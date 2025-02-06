import { useForm } from '@mantine/form';
import { TextInput, Button } from '@mantine/core';

export function DatosUsuario({ onSubmit }) {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { telefono: '958309791', email: 'neil.toscano.f@gmail.com' },

    validate: {
      telefono: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        label="Telèfono"
        placeholder="958309791"
        key={form.key('telefono')}
        {...form.getInputProps('telefono')}
      />
      <TextInput
        mt="sm"
        label="Correo"
        placeholder="neil.amstrong@gmail.com"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      <div className='grid justify-items-end'>
        <Button type="submit" mt="sm">
            Continuar
        </Button>
      </div>
    </form>
  );
}