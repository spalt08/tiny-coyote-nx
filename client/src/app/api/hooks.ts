import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Ticket, User } from '@acme/shared-models';

// TODO: add error handling later

// GET /api/tickets
export function useTicketList() {
  return useQuery<Ticket[]>({
    queryKey: ['tickets'],
    queryFn: () => fetch('/api/tickets').then((response) => response.json()),
  });
}

// GET /api/users
export function useUserList() {
  return useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then((response) => response.json()),
  });
}

// GET /api/tickets/:id
export function useTicketDetails(id: string) {
  return useQuery<Ticket>({
    queryKey: [`ticket/${id}`],
    queryFn: () =>
      fetch(`/api/tickets/${id}`).then((response) => response.json()),
  });
}

export type TicketCreateBody = {
  description: string;
};

// POST /api/tickets
export function useTicketCreateMutation() {
  const queryClient = useQueryClient();

  return useMutation<Ticket, unknown, TicketCreateBody>({
    mutationFn: (data) =>
      fetch(`/api/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then((response) => response.json()),
    onSuccess: (data) => {
      queryClient.setQueryData([`ticket/${data.id}`], data);
    },
  });
}

type TicketAssignParams = {
  ticketId: number,
  userId: number | null
}

// POST /api/tickets/:ticketId/assign/:userId
export function useTicketAssignMutation() {
  return useMutation({
    mutationFn: ({ ticketId, userId }: TicketAssignParams) => {
      if (userId) {
        return fetch(`/api/tickets/${ticketId}/assign/${userId}`, {
          method: 'PUT',
        })
      }

      return fetch(`/api/tickets/${ticketId}/unassign`, {
        method: 'PUT',
      })
    },
  });
}
