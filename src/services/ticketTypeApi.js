import api from './api';

export async function getTicketTypeInfo() {
  const response = await api.get('/tickets/types');
  return response.data;
}
