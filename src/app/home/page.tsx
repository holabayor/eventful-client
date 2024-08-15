import EventDetail from '@/components/event/EventDetail';
import { events } from '@/constants';

export default function Dashboard() {
  return <>{<EventDetail event={events[0]} />}</>;
}
