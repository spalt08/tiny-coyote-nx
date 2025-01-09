import { Badge, Skeleton, Table, Title } from '@mantine/core';
import { useTicketList } from '../api/hooks';
import { useNavigate } from 'react-router-dom';

export function TicketsPage() {
  const navigate = useNavigate();
  const { isLoading, data } = useTicketList();

  return (
    <>
      <Title>List</Title>
      <Table mt="xl" striped highlightOnHover={!isLoading}>
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
                <Table.Td>{it.assigneeId}</Table.Td>
              </Table.Tr>
            ))
          )}
        </Table.Tbody>
      </Table>
    </>
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
