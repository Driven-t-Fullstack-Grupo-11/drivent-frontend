import { useEffect, useState } from 'react';
import * as ticketsTypeApi from '../../services/ticketTypeApi';
import useToken from '../useToken';

export default function useTicketsType() {
  const [ticketsType, setTicketsType] = useState(null);
  const [ticketsTypeError, setTicketsTypeError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = useToken();
  async function fetchTicketsType() {
    try {
      const data = await ticketsTypeApi.getTicketTypeInfo(token);
      setTicketsType(data);
      setIsLoading(false);
    } catch (error) {
      setTicketsTypeError(ticketsTypeError);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTicketsType();
  }, []);

  return {
    ticketsType,
    ticketsTypeError,
    isLoading,
  };
}
