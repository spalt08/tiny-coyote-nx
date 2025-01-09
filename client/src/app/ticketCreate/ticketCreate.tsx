import { Button, Group, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { TicketCreateBody, useTicketCreateMutation } from '../api/hooks';
import { Navigate } from 'react-router-dom';

export function TicketCreatePage() {
  const mutation = useTicketCreateMutation();

  const form = useForm<TicketCreateBody>({
    mode: 'uncontrolled',
    initialValues: {
      description: '',
      // assigneeId: null as number | null,
      // completed: false,
    },

    validate: {
      description: (value) =>
        value.length > 3
          ? null
          : 'Description should be at least 3 characters long',
    },
  });

  if (mutation.isSuccess) {
    return <Navigate to={`/${mutation.data.id}/`}></Navigate>;
  }

  return (
    <Stack>
      <Title>Create Ticket</Title>
      <form onSubmit={form.onSubmit((values) => mutation.mutate(values))}>
        <Stack gap="md">
          <TextInput
            withAsterisk
            label="Description"
            placeholder="Sample issue"
            key={form.key('description')}
            {...form.getInputProps('description')}
          />

          {/* <UserSelector
            initialValue={null}
            label="Assignee"
            onSelect={(id) => form.setFieldValue('assigneeId', id)}
          />

          <Checkbox
            label="Is Completed"
            key={form.key('completed')}
            {...form.getInputProps('completed', { type: 'checkbox' })}
          /> */}

          <Group justify="center">
            <Button type="submit">Create</Button>
          </Group>
        </Stack>
      </form>
    </Stack>
  );
}

export default TicketCreatePage;
