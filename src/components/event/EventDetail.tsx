import { Event } from '@/types';
import { Calendar, Clock, MapPin, Tag, User, Users } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';

interface EventDetailsProps {
  event: Event;
}

const EventDetail: React.FC<EventDetailsProps> = ({ event }) => {
  return (
    <section className="px-6 py-8 max-w-7xl mx-auto">
      <div className="relative w-full mx-auto h-48 sm:h-72 md:h-96">
        <Image
          src="/events/event-img1.jpeg"
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
            {event.startDate} - {event.endDate}
          </div>
          <div className="flex items-center text-sm md:text-base font-semibold text-gray-700 mb-2">
            <Clock className="size-5 inline-block mr-2" />
            {event.startTime} - {event.endTime}
          </div>
          <p className="text-sm md:text-base text-gray-600 flex items-center mb-2">
            <MapPin className="size-5 mr-2" /> {event.location}
          </p>
          <p className="text-sm md:text-base text-gray-600 flex items-center mb-2">
            <User className="size-5 mr-2" /> Hosted by {event.creator.name}
          </p>
          <p className="text-sm md:text-base text-gray-600 flex items-center mb-2">
            <Tag className="size-5 mr-2" /> Category: {event.category}
          </p>
          <p className="text-sm md:text-base text-gray-600 flex items-center mb-4">
            <Users className="size-5 mr-2" /> Attendees:{' '}
            {event.attendees.length}
          </p>
          <p className="text-sm md:text-base text-gray-800 mb-4">
            {event.description}
          </p>

          <Button className="fixed sm:static bottom-0 left-0 right-0 max-sm:rounded-none w-full">
            Register / Attend
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventDetail;
