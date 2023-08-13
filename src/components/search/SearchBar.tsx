import { STATUS_TYPES } from '@/hooks/types';
import { useSearchRequest } from '@/hooks/useSearchRequest';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { BounceLoader } from 'react-spinners';
import Portal from '../portal/Portal';
import styles from './SearchBar.module.scss';
import { Notify } from 'notiflix';
import { useMealContext } from '@/context/MealsContext';

export const SearchBar: React.FC = () => {
  // State for local input value and disabling input
  const [localPrompt, setLocalPrompt] = useState('');
  const { dispatch } = useMealContext();

  // Using a custom hook to manage search request
  const { response, status, startSearchRequest } = useSearchRequest();

  // Reference to the input element
  const textAreaRef = useRef<HTMLInputElement>(null);

  // Handle input change
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalPrompt(event.target.value); // Update local input value
  };

  // Handle form submission
  const handleSubmit = async (
    e:
      | FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLInputElement>
      | React.BaseSyntheticEvent,
  ) => {
    e.preventDefault(); // Prevent default form submission

    startSearchRequest(localPrompt); // Initiate search request
  };

  // When response changes add it to context
  useEffect(() => {
    if (response && response.meals && status === STATUS_TYPES.SUCCESS) {
      const meals = response.meals.map((meal: any) => ({
        id: meal.idMeal,
        name: meal.strMeal,
        description: meal.strInstructions,
        image: meal.strMealThumb,
      }));

      dispatch({ type: 'CLEAR_MEALS' });
      dispatch({ type: 'ADD_MULTIPLE_MEALS', payload: meals });
    }
    else if (response && status === STATUS_TYPES.SUCCESS){
      dispatch({ type: 'CLEAR_MEALS' });
    }
  }, [response, status, dispatch]);

  useEffect(() => {
    if (status === STATUS_TYPES.ERROR) {
      Notify.failure('Search failed');
    }
  }, [status]);

  // Start search request when component mounts
  useEffect(() => {
    startSearchRequest('');
  }, []);

  return (
    <>
      {/* search bar */}
      <div className="md:w-[684px] relative w-[90vw] mx-auto mt-7 flex items-center rounded-3xl border shadow-md hover:shadow-blue-500 focus-within:shadow-blue-500 focus:shadow-blue-500 focus-visible:shadow-blue-500 bg-white">
        <div className="pl-5 cursor-pointer">
          <svg
            className="h-6 w-6 text-gray-400 "
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <input
            className="w-full bg-transparent rounded-3xl leading-5 py-[13px] font-meidum pl-4 outline-none"
            type="text"
            placeholder='Chocolate...'
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.shiftKey == false) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            ref={textAreaRef}
          />
        </form>
        <button className="pr-4 cursor-pointer" type="submit" onClick={(e) => handleSubmit(e)}>
          <svg
            className="w-10 h-6 text-black-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <svg
              className="w-10 h-6 text-black-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            </svg>
          </button>
        {/* The portal to display loader */}
        <Portal selector="connect-loader">
          {status === STATUS_TYPES.LOADING ? (
            <div className={styles.overlayLoader}>
              <BounceLoader
                loading={status === STATUS_TYPES.LOADING}
                data-testid='loading-overlay'
                color="#324d72"
                className={
                  '!fixed top-1/2 bottom-1/2 left-1/2 right-1/2 z-50 h-screen w-screen '
                }
              />
            </div>
          ) : null}
        </Portal>
      </div>
    </>
  );
};
