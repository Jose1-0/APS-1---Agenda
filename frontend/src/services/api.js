import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/', // Endereço da API Django
});

export const getEvents = () => api.get('events/'); // Pega todos os eventos
export const createEvent = (event) => api.post('events/', event); // Cria novo evento
export const updateEvent = (id, event) => api.put(`events/${id}/`, event); // Atualiza
export const deleteEvent = (id) => api.delete(`events/${id}/`); // Deleta

export default api;