import { getCategories } from '@/lib/apiService';
import useSWR, { mutate } from 'swr';

export const useCategories = () => {
  const { data, error, isLoading } = useSWR('categories', getCategories, {
    dedupingInterval: 60000,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const refreshCategories = () => {
    mutate('categories');
  };

  return {
    categories: data || [],
    isLoading,
    error,
    refreshCategories,
  };
};
