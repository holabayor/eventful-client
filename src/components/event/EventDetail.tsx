import { attendEvent } from '@/lib/apiService';
import { Event } from '@/types';
import { Calendar, Clock, MapPin, Tag, User, Users } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '../ui/button';
import { useToast } from '../ui/use-toast';

interface EventDetailsProps {
  event: Event;
}

const EventDetail: React.FC<EventDetailsProps> = ({ event }) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const handleAttendEvent = async () => {
    if (!session) {
      router.push(
        `/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`
      );
      return;
    }

    try {
      const response = await attendEvent(event._id);

      console.log(response);
      toast({
        title: 'Successfully registered for the event!',
        description: `You are now attending ${event.title}`,
      });
    } catch (error) {
      toast({
        title: 'Error registering for event',
        description:
          error instanceof Error ? error.message : 'Something went wrong',
      });
    }
  };

  return (
    <section className="px-6 py-8 w-full max-w-7xl mx-auto">
      <div className="relative w-full mx-auto h-48 sm:h-72 md:h-96">
        <Image
          src={event.imageUrl || '/events/event-img1.jpeg'}
          alt={event.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      <div className="flex flex-col rounded-b-lg shadow-lg">
        <div className="flex flex-col p-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold sm:font-extrabold mb-4">
            {event.title}
          </h2>
          <div className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
            <Calendar className="size-5 inline-block mr-2" />
            {String(event.date)} - {event.endDate}
          </div>
          <div className="flex items-center text-sm md:text-base font-semibold text-gray-700 mb-2">
            <Clock className="size-5 inline-block mr-2" />
            {event.time} - {event.endTime}
          </div>
          <p className="text-sm md:text-base text-gray-600 flex items-center mb-2">
            <MapPin className="size-5 mr-2" /> {event.location}
          </p>
          <p className="text-sm md:text-base text-gray-600 flex items-center mb-2">
            <User className="size-5 mr-2" /> Hosted by {event.creator?.name}
          </p>
          <p className="text-sm md:text-base text-gray-600 flex items-center mb-2">
            <Tag className="size-5 mr-2" /> Category: {event.category?.name}
          </p>
          <p className="text-sm md:text-base text-gray-600 flex items-center mb-4">
            <Users className="size-5 mr-2" /> Attendees:{' '}
            {event.attendees.length}
          </p>
          <p className="text-sm md:text-base text-gray-800 mb-4">
            {event.description}
          </p>

          <Button
            onClick={handleAttendEvent}
            className="fixed sm:static bottom-0 left-0 right-0 max-sm:rounded-none w-full"
          >
            Register / Attend
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventDetail;
