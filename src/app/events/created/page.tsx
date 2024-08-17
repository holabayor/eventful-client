'use client';

import EventListings from '@/components/event/EventListings';
import { getCreatorEvents } from '@/lib/apiService';

export default function CreatedEventsPage() {
  return (
    <EventListings
      title="Created Events"
      metaTitle="Eventful - Created Events"
      metaDescription="View all created events"
      fetchEvents={getCreatorEvents}
    />
  );
}
