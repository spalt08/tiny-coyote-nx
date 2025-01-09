import {
  Badge,
  Button,
  Group,
  Skeleton,
  Stack,
  Table,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { useTicketAssignMutation, useTicketList } from '../api/hooks';
import { Link, useNavigate } from 'react-router-dom';
import {
  IconChevronDown,
  IconChevronUp,
  IconPlus,
  IconSelector,
} from '@tabler/icons-react';
import UserSelector from '../userSelector/userSelector';
import { useMemo, useState } from 'react';

type SortByOptions = 'id' | 'description' | 'status';

export function TicketsPage() {
  const navigate = useNavigate();
  const { isLoading, data } = useTicketList();
  const assignMutation = useTicketAssignMutation();

  const [sortBy, setSortBy] = useState<SortByOptions>('id');
  const [sortReversed, setSortReversed] = useState(false);

  function handleSortClick(nextSortBy: SortByOptions, nextReversed: boolean) {
    setSortBy(nextSortBy);
    setSortReversed(nextReversed);
  }

  const sortedData = useMemo(
    () =>
      data?.sort((a, b) => {
        if (sortBy === 'description') {
          return sortReversed
            ? b.description.localeCompare(a.description)
            : a.description.localeCompare(b.description);
        }

        if (sortBy === 'status') {
          return sortReversed
            ? +a.completed - +b.completed
            : +b.completed - +a.completed;
        }

        // id
        return sortReversed ? b.id - a.id : a.id - b.id;
      }) ?? [],
    [sortBy, sortReversed, data]
  );

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
            <Table.Th w="10%">
              <SortHeader
                label="ID"
                sortKey="id"
                sortBy={sortBy}
                sortReversed={sortReversed}
                onClick={handleSortClick}
              />
            </Table.Th>
            <Table.Th>
              <SortHeader
                label="Description"
                sortKey="description"
                sortBy={sortBy}
                sortReversed={sortReversed}
                onClick={handleSortClick}
              />
            </Table.Th>
            <Table.Th w="20%">
              <SortHeader
                label="Status"
                sortKey="status"
                sortBy={sortBy}
                sortReversed={sortReversed}
                onClick={handleSortClick}
              />
            </Table.Th>
            <Table.Th w="20%">Assignee</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {isLoading ? (
            <TicketsSkeleton />
          ) : (
            sortedData &&
            sortedData.map((it) => (
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

type SortHeaderProps = {
  sortKey: SortByOptions;
  label: string;
  sortBy: SortByOptions;
  sortReversed: boolean;
  onClick: (sortBy: SortByOptions, reversed: boolean) => unknown;
};

function SortHeader({
  sortKey,
  sortBy,
  sortReversed,
  label,
  onClick,
}: SortHeaderProps) {
  const Icon =
    sortKey === sortBy
      ? sortReversed
        ? IconChevronUp
        : IconChevronDown
      : IconSelector;

  return (
    <UnstyledButton
      onClick={() =>
        sortKey === sortBy
          ? onClick(sortKey, !sortReversed)
          : onClick(sortKey, false)
      }
    >
      <Group justify="space-between">
        <Text>{label}</Text>
        <Icon color="currentColor" size="14" />
      </Group>
    </UnstyledButton>
  );
}

export default TicketsPage;
