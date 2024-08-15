import { Category, Event } from '@/types';
import { apiRequest } from './api';

export const getCategories = async (): Promise<Category[]> => {
  const res = await apiRequest('/events/categories', {
    method: 'GET',
  });

  console.log('Server response is ', res);
  return res.categories;
};

export const getAllEvents = async (): Promise<Event[]> => {
  const res = await apiRequest('/events', {
    method: 'GET',
  });

  return res.data.events;
};

export const getEventById = async (id: string): Promise<Event> => {
  const res = await apiRequest(`/events/${id}`, {
    method: 'GET',
  });

  return res.event;
};

export const createEvent = async (eventData: Partial<Event>) => {
  return await apiRequest(`/events`, {
    method: 'POST',
    body: eventData,
    requiresAuth: true,
  });
};
