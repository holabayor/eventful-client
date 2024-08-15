import { getAllEvents } from '@/lib/apiService';
import useSWR from 'swr';

import { mutate } from 'swr';

export const useEvents = () => {
  const { data, error, isLoading } = useSWR('events', getAllEvents, {
    dedupingInterval: 60000,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  console.log('Use Event things', data);

  const refreshEvents = () => {
    mutate('events');
  };

  return {
    events: data || [],
    isLoading,
    error,
    refreshEvents,
  };
};
