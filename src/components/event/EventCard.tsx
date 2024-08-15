import { Event } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => (
  <div className="flex flex-col rounded-lg w-full mx-auto bg-gray-50 border border-transparent transition-all hover:border-gray-300 hover:bg-gray-100 hover:shadow-md">
    <div className="w-full h-56 sm:h-36 lg:h-40 relative">
      <Image
        src="/events/event-img1.jpeg"
        alt={event.title}
        layout="fill"
        objectFit="cover"
        className="rounded-md"
      />
    </div>
    <div className="flex flex-col p-2 text-sm ">
      <Link href={`/events/${event._id}`}>
        <h4 className="text-lg font-bold tracking-tight">{event.title}</h4>
      </Link>
      <p className="text-muted-foreground">{event.description}</p>
      <span>{event.price}</span>
      <span>{event.location}</span>
      <span className="text-muted-foreground">
        Attendees: {event.attendees.length}
      </span>
    </div>
  </div>
);

export default EventCard;
