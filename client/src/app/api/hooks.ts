import { useQuery } from "@tanstack/react-query";
import { Ticket } from '@acme/shared-models';

// TODO: add error handling later

export function useTicketList() {
    return useQuery<Ticket[]>({
        queryKey: ['tickets'],
        queryFn: () => fetch('/api/tickets').then((response) => response.json())
    })
}