'use client';

import EventListings from '@/components/event/EventListings';
import { getAllEvents } from '@/lib/apiService';

export default function Home() {
  // redirect('/events');
  return (
    <EventListings
      title="Events"
      metaTitle="Eventful - Events"
      metaDescription="View all events"
      fetchEvents={getAllEvents}
    />
  );
}
