import { Event } from '@/types';
import React from 'react';
import EventCard from './EventCard';

interface EventListingProps {
  events: Event[];
}

const EventListings: React.FC<EventListingProps> = ({ events }) => (
  <section className="px-4">
    <div className="flex items-center">
      <h1 className="text-xl font-bold md:text-2xl mb-4">Event Listings</h1>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-6">
      {events.map((event: Event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  </section>
);

export default EventListings;
