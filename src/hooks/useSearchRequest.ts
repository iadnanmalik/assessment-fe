import { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

// Note: Pagination is implemented in component because the GET endpoint doesn't support pagination

// Function to fetch projects data from the API
async function fetchProjects(query = "") {
  const { data } = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?s=' + query);
  return data;
}

// Custom hook for performing search requests
export const useSearchRequest = () => {
  // State to manage whether the API call is enabled
  const [enabled, setEnabled] = useState<boolean>(false);

  // State to store the search query
  const [query, setQuery] = useState<string>('');

  // React Query hook to fetch data from the API
  const { status, data, error } = useQuery({
    queryKey: ['search', query],
    queryFn: () => fetchProjects(query),
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

  // Function to initiate the search request
  const startSearchRequest = (searchString: string) => {
    setQuery(searchString);
    setEnabled(true);
  };

  // Return relevant values from the custom hook
  return { response: data, status, error, startSearchRequest };
};
