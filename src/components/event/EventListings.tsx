import { useEvents } from '@/hooks/useEvents';
import { Event } from '@/types';
import React from 'react';
import EventCard from './EventCard';

const EventListings: React.FC = () => {
  const { events, isLoading, loadMore, hasNextPage } = useEvents();

  console.log(events);

  return (
    <section className="px-4">
      <div className="flex items-center">
        <h1 className="text-xl font-bold md:text-2xl mb-4">Event Listings</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-6">
        {events.map((event: Event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
      {hasNextPage && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {isLoading ? 'Loading...' : 'Show More'}
          </button>
        </div>
      )}
    </section>
  );
};

export default EventListings;
