'use client';

import EventListings from '@/components/event/EventListings';
import { useEvents } from '@/hooks/useEvents';

const EventListingPage = () => {
  const { events } = useEvents();
  console.log('The events are ', events);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create a New Event</h1>
      <EventListings events={events} />
    </div>
  );
};

export default EventListingPage;
