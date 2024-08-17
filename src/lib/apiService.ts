import { Category, Event } from '@/types';
import { apiRequest } from './api';

export const getCategories = async (): Promise<Category[]> => {
  const res = await apiRequest('/events/categories', {
    method: 'GET',
    requiresAuth: false,
  });

  return res.categories;
};

export const getAllEvents = async (
  page = 1,
  limit = 12
): Promise<{ events: Event[]; metadata: any }> => {
  const res = await apiRequest(`/events?page=${page}&limit=${limit}`, {
    method: 'GET',
    requiresAuth: false,
  });

  return res.data;
};

export const getCreatorEvents = async (
  page = 1,
  limit = 6
): Promise<{ events: Event[]; metadata: any }> => {
  const res = await apiRequest(
    `/users/created-events?page=${page}&limit=${limit}`,
    {
      method: 'GET',
    }
  );

  return res.data;
};

export const getAppliedEvents = async (
  page = 1,
  limit = 6
): Promise<{ events: Event[]; metadata: any }> => {
  const res = await apiRequest(`/users/events?page=${page}&limit=${limit}`, {
    method: 'GET',
  });

  return res.data;
};

export const getEventById = async (id: string): Promise<Event> => {
  const res = await apiRequest(`/events/${id}`, {
    method: 'GET',
    requiresAuth: false,
  });

  return res.event;
};

export const createEvent = async (eventData: Partial<Event>) => {
  return await apiRequest(`/events`, {
    method: 'POST',
    body: eventData,
  });
};

export const attendEvent = async (id: string) => {
  return await apiRequest(`/events/${id}/attend`, {
    method: 'POST',
  });
};
