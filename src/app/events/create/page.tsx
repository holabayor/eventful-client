import EventForm from '@/components/event/EventForm';

const CreateEventPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create a New Event</h1>
      <EventForm />
    </div>
  );
};

export default CreateEventPage;
