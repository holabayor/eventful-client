'use client';

import CustomButton from '@/components/common/common-button/common-button';
import { Input } from '@/components/common/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useCategories } from '@/hooks/useCategories';
import { useEvents } from '@/hooks/useEvents';
import { createEvent } from '@/lib/apiService';
import { uploadImageToCloudinary } from '@/lib/cloudinary';
import { EventSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const EventForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { categories, isLoading: categoriesLoading } = useCategories();
  const { refreshEvents } = useEvents();
  const form = useForm<z.infer<typeof EventSchema>>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      category: '',
      imageFile: null as unknown as FileList,
      additionalDetails: '',
    },
  });
  const fileRef = form.register('imageFile');

  const handleSubmit = async (values: z.infer<typeof EventSchema>) => {
    setIsLoading(true);

    try {
      let imageUrl = '';
      if (values.imageFile && values.imageFile.length > 0) {
        imageUrl = await uploadImageToCloudinary(values.imageFile[0]);
      }

      console.log('The event URL is ', imageUrl);

      const eventPayload = {
        ...values,
        imageUrl,
      };

      delete eventPayload.imageFile;
      const response = await createEvent(eventPayload);

      toast({
        title: 'Event created successfully',
        description: `Event ID: ${response.id}`,
      });

      refreshEvents();
    } catch (error) {
      toast({
        title: 'Error creating event',
        description:
          error instanceof Error ? error.message : 'Something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter event title"
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter event description"
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input {...field} type="date" className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time</FormLabel>
              <FormControl>
                <Input {...field} type="time" className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter event location"
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageFile"
          render={() => (
            <FormItem>
              <FormLabel>Image File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  className="w-full"
                  {...fileRef}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full rounded-md border px-3 py-2 text-sm font-normal leading-5 transition duration-150 ease-in-out focus:outline-none"
                  disabled={categoriesLoading || categories.length === 0}
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="additionalDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Details</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter any additional details"
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CustomButton
          type="submit"
          variant="primary"
          className="w-full py-6"
          isDisabled={isLoading}
        >
          {isLoading ? 'Creating event...' : 'Create Event'}
        </CustomButton>
      </form>
    </Form>
  );
};

export default EventForm;
