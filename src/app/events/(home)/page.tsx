'use client';

import EventListings from '@/components/event/EventListings';

const EventListingPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create a New Event</h1>
      <EventListings />
    </div>
  );
};

export default EventListingPage;
