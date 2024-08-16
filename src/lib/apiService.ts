import { Category, Event } from '@/types';
import { apiRequest } from './api';

export const getCategories = async (): Promise<Category[]> => {
  const res = await apiRequest('/events/categories', {
    method: 'GET',
  });

  return res.categories;
};

export const getAllEvents = async (
  page = 1,
  limit = 18
): Promise<{ events: Event[]; metadata: any }> => {
  const res = await apiRequest(`/events?page=${page}&limit=${limit}`, {
    method: 'GET',
  });

  return res.data;
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
