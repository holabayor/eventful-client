'use client';

import EventDetail from '@/components/event/EventDetail';
import { toast } from '@/components/ui/use-toast';
import { getEventById } from '@/lib/apiService';
import { Event } from '@/types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventData = await getEventById(id as string);
        setEvent(eventData);
      } catch (error) {
        toast({ description: error.message });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!event) {
    return <p>Event not found</p>;
  }

  return <EventDetail event={event} />;
};

export default EventDetailPage;
