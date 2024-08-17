'use client';

import LoadingSpinner from '@/components/common/loading-spinner';
import EventDetail from '@/components/event/EventDetail';
import { toast } from '@/components/ui/use-toast';
import { getEventById } from '@/lib/apiService';
import { Event } from '@/types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import EventNotFound from '../error';

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(id as string);
        setEvent(eventData);
      } catch (error: any) {
        toast({ description: error.message });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!event) {
    return <EventNotFound />;
  }

  return <EventDetail event={event} />;
};

export default EventDetailPage;
