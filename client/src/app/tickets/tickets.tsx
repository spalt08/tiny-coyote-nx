import {
  Badge,
  Button,
  Group,
  Skeleton,
  Stack,
  Table,
  Title,
} from '@mantine/core';
import { useTicketAssignMutation, useTicketList } from '../api/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { IconPlus } from '@tabler/icons-react';
import UserSelector from '../userSelector/userSelector';

export function TicketsPage() {
  const navigate = useNavigate();
  const { isLoading, data } = useTicketList();
  const assignMutation = useTicketAssignMutation();

  return (
    <Stack gap="xl">
      <Group justify="space-between">
        <Title>List</Title>
        <Button leftSection={<IconPlus />} component={Link} to="/new">
          Create Ticket
        </Button>
      </Group>
      <Table striped highlightOnHover={!isLoading}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w="10%">ID</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th w="20%">Status</Table.Th>
            <Table.Th w="20%">Assignee</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {isLoading ? (
            <TicketsSkeleton />
          ) : (
            data &&
            data.map((it) => (
              <Table.Tr
                key={it.id}
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/${it.id}`)}
              >
                <Table.Td>{it.id}</Table.Td>
                <Table.Td>{it.description}</Table.Td>
                <Table.Td>
                  {it.completed ? (
                    <Badge color="green">Completed</Badge>
                  ) : (
                    <Badge color="blue">In Progress</Badge>
                  )}
                </Table.Td>
                <Table.Td>
                  <UserSelector
                    initialValue={it.assigneeId}
                    onSelect={(userId) =>
                      assignMutation.mutate({ ticketId: it.id, userId })
                    }
                  />
                </Table.Td>
              </Table.Tr>
            ))
          )}
        </Table.Tbody>
      </Table>
    </Stack>
  );
}

function TicketsSkeleton() {
  const height = 16;

  return Array.from({ length: 10 }).map((_, idx) => (
    <Table.Tr key={idx}>
      <Table.Td>
        <Skeleton height={height} radius="xl" />
      </Table.Td>
      <Table.Td>
        <Skeleton height={height} radius="xl" />
      </Table.Td>
      <Table.Td>
        <Skeleton height={height} radius="xl" />
      </Table.Td>
      <Table.Td>
        <Skeleton height={height} radius="xl" />
      </Table.Td>
    </Table.Tr>
  ));
}

export default TicketsPage;
