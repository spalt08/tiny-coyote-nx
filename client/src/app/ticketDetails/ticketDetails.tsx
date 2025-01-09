import {
  Anchor,
  Breadcrumbs,
  Checkbox,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import {
  useTicketAssignMutation,
  useTicketCompleteMutation,
  useTicketDetails,
} from '../api/hooks';
import UserSelector from '../userSelector/userSelector';

export function TicketDetailsPage() {
  const { id } = useParams();
  const { isLoading, data } = useTicketDetails(id ?? '');
  const assignMutation = useTicketAssignMutation();
  const completeMutation = useTicketCompleteMutation();

  return (
    <Stack gap="xl">
      <Breadcrumbs separator="/">
        <Anchor component={Link} to="/">
          Tickets
        </Anchor>
        <Text>#{id}</Text>
      </Breadcrumbs>
      {isLoading ? (
        <TicketDetailsSkeleton />
      ) : (
        data && (
          <>
            <Title order={3}>{data?.description}</Title>
            <SimpleGrid cols={2}>
              <div>
                <Text>Asignee</Text>
              </div>
              <div>
                <UserSelector
                  initialValue={data.assigneeId}
                  onSelect={(userId) =>
                    assignMutation.mutate({ ticketId: data.id, userId })
                  }
                />
              </div>
              <div>
                <Text>Completed</Text>
              </div>
              <div>
                <Checkbox
                  defaultChecked={data.completed}
                  label="Completed"
                  onChange={(event) =>
                    completeMutation.mutate({
                      ticketId: data.id,
                      completed: event.currentTarget.checked,
                    })
                  }
                ></Checkbox>
              </div>
            </SimpleGrid>
          </>
        )
      )}
    </Stack>
  );
}

export function TicketDetailsSkeleton() {
  return (
    <>
      <Title order={3}>
        <Skeleton height={32} width="50%" />
      </Title>
      <div />
    </>
  );
}

export default TicketDetailsPage;
