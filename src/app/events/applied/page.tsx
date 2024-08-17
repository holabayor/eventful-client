'use client';

import EventListings from '@/components/event/EventListings';
import { getAppliedEvents } from '@/lib/apiService';

export default function AppliedEventsPage() {
  return (
    <EventListings
      title="Applied Events"
      metaTitle="Eventful - Applied Events"
      metaDescription="View all applied events"
      fetchEvents={getAppliedEvents}
    />
  );
}
