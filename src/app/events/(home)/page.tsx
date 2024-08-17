'use client';

import LoadingSpinner from '@/components/common/loading-spinner';
import EventListings from '@/components/event/EventListings';
import { useEvents } from '@/hooks/useEvents';

const EventListingPage = () => {
  const { events, isLoading, loadMore, hasNextPage } = useEvents();

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading && events.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-6">Available Events</h1>
          <EventListings
            events={events}
            loadMore={loadMore}
            hasNextPage={hasNextPage}
          />
        </>
      )}
    </div>
  );
};

export default EventListingPage;
