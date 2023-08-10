import api from './api';

export async function savePayment(body, token) {
  const response = await api.post('/payments/process', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getTicketTypeInfo(token) {
  const response = await api.get('/tickets/types', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
