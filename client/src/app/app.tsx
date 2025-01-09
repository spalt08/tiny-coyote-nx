import { Routes, Route } from 'react-router-dom';
import '@mantine/core/styles.css';

import TicketsPage from './tickets/tickets';
import { Container } from '@mantine/core';
import TicketDetailsPage from './ticketDetails/ticketDetails';
import TicketCreatePage from './ticketCreate/ticketCreate';

const App = () => {
  // const [tickets, setTickets] = useState([] as Ticket[]);
  // const [users, setUsers] = useState([] as User[]);

  // // Very basic way to synchronize state with server.
  // // Feel free to use any state/fetch library you want (e.g. react-query, xstate, redux, etc.).
  // useEffect(() => {
  //   async function fetchTickets() {
  //     const data = await fetch('/api/tickets').then();
  //     setTickets(await data.json());
  //   }

  //   async function fetchUsers() {
  //     const data = await fetch('/api/users').then();
  //     setUsers(await data.json());
  //   }

  //   fetchTickets();
  //   fetchUsers();
  // }, []);

  return (
    <Container py="lg">
      <Routes>
        <Route path="/" element={<TicketsPage />} />
        <Route path="/new" element={<TicketCreatePage />} />
        <Route path="/:id" element={<TicketDetailsPage />} />
      </Routes>
    </Container>
  );
};

export default App;
