import { Event } from '@/types';
import { ArrowLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../common/loading-spinner';
import EventCard from './EventCard';

interface EventListingsProp {
  title: string;
  fetchEvents: (page: number) => Promise<{ events: Event[]; metadata: any }>;
  metaTitle?: string;
  metaDescription?: string;
}

const EventListings: React.FC<EventListingsProp> = ({
  title,
  fetchEvents,
  metaTitle,
  metaDescription,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Update the page title and meta description
  useEffect(() => {
    if (metaTitle) {
      document.title = metaTitle;
    }
    if (metaDescription) {
      const metaTag = document.querySelector("meta[name='description']");
      if (metaTag) {
        metaTag.setAttribute('content', metaDescription);
      } else {
        const newMetaTag = document.createElement('meta');
        newMetaTag.setAttribute('name', 'description');
        newMetaTag.setAttribute('content', metaDescription);
        document.head.appendChild(newMetaTag);
      }
    }
  }, [metaTitle, metaDescription]);

  // Fetch events on initial render and when the page changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(page === 1);
      setIsLoadingMore(page > 1);
      try {
        const { events: fetchedEvents, metadata } = await fetchEvents(page);
        setEvents((prevEvents) => {
          // Filter out events that are already in the list
          const newEvents = fetchedEvents.filter(
            (newEvent) =>
              !prevEvents.some((event) => event._id === newEvent._id)
          );
          return [...prevEvents, ...newEvents];
        });
        setHasNextPage(metadata.hasNextPage);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    };

    fetchData();
  }, [page, fetchEvents]);

  const loadMore = () => {
    if (hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  return (
    <section className="px-4">
      <div className="flex items-center mb-4">
        {pathname !== '/' && (
          <button
            onClick={() => router.back()}
            className="flex items-center mr-4 text-blue-500 hover:text-blue-700"
          >
            <ArrowLeft className="size-4 mr-1" />
            Back
          </button>
        )}
        <h1 className="text-xl font-bold md:text-2xl">{title}</h1>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-6">
            {events.map((event: Event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
          {hasNextPage && (
            <div className="flex justify-center mt-6">
              <button
                onClick={loadMore}
                disabled={isLoadingMore}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {isLoadingMore ? <LoadingSpinner /> : 'Show More'}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default EventListings;
