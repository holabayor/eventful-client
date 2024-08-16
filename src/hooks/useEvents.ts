import { getAllEvents } from '@/lib/apiService';
import { Event } from '@/types';
import { useState } from 'react';
import useSWR from 'swr';

export const useEvents = () => {
  const [page, setPage] = useState(1);
  const [events, setEvents] = useState<Event[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);

  const { data, error, isLoading } = useSWR(
    ['events', page],
    () => getAllEvents(page),
    {
      onSuccess: (data) => {
        setEvents((prevEvents) => [...prevEvents, ...data.events]);
        setHasNextPage(data.metadata.hasNextPage);
      },
      dedupingInterval: 60000,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const loadMore = () => {
    if (hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const refreshEvents = () => {
    setPage(1);
    setEvents([]);
  };

  return {
    events,
    isLoading,
    error,
    loadMore,
    hasNextPage,
    refreshEvents,
  };
};
