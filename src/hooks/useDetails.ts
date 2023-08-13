import { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

// Note: This Custom hook is not being used , the reason is that the needed data is already present in context

// Function to fetch details from the API
async function fetchDetails(query = '') {
  const { data } = await axios.get(
    'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + query,
  );

  return data;
}

// Custom hook for fetching and managing meal details
export const useDetails = () => {
  // State to manage whether the API call is enabled
  const [enabled, setEnabled] = useState<boolean>(false);

  // State to store the query for API call
  const [query, setQuery] = useState<string | undefined>('');

  // React Query hook to fetch data from the API
  const { status, data, error } = useQuery({
    queryKey: ['details', query],
    queryFn: () => fetchDetails(query),
    enabled: enabled,
    // Callbacks for handling success and error
    onSuccess: () => {
      setEnabled(false);
    },
    onError: () => {
      setEnabled(false);
    },
    // Stale time for caching
    staleTime: 5000,
  });

  // Function to initiate the details search
  const startDetailsSearch = (id: string | undefined) => {
    setQuery(id);
    setEnabled(true);
  };

  // Return relevant values from the custom hook
  return { response: data, status, error, startDetailsSearch };
};
