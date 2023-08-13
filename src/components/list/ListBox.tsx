/* eslint-disable @next/next/no-img-element */

import { Meal, useMealContext } from '@/context/MealsContext';
import React, { useState, useCallback,  useEffect } from 'react';
import classNames from 'classnames';
import { DetailsModal } from '../modal/DetailsModal';
import Image from 'next/image';

// Function to chunk an array into smaller arrays
const chunkArray = (array: Meal[], size: number) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

// Main component
export const ListBox = () => {
  // Fetching meals from context
  const { meals } = useMealContext();

  // State for pagination and modal
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal>({
    id: '',
    name: '',
    description: '',
    image: '',
  });

  // Items per page for pagination
  const itemsPerPage = 6;

  // Use useCallback to memoize the chunkArray function
  const memoizedChunkArray = useCallback(chunkArray, []);

  // Chunking meals into smaller arrays for pagination
  const chunkedMeals = memoizedChunkArray(meals, itemsPerPage);

  // Functions for navigating to next and previous pages
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Handling click on a meal to open the modal
  const handleClick = (meal: Meal) => {
    setSelectedMeal(meal);
    setIsOpen(true);
  };

  //Resetting the current paginated page
  useEffect(() => {
      setCurrentPage(0);
  },[meals])
  // Rendering the component
  return (
    <>
      {/* Modal for displaying meal details */}
      <DetailsModal meal={selectedMeal} setIsOpen={setIsOpen} isOpen={isOpen} />

      {/* Main content */}
      <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-4">
        {/* Rendering meals */}
        {chunkedMeals.length > 0 ? (
          <>
            <div className="-m-1 flex flex-col lg:flex-row flex-wrap lg:-m-2">
              <div className="flex flex-wrap w-full">
                {chunkedMeals[currentPage]?.map((meal, index) => (
                  <div
                    className={classNames(
                      'p-1 lg:p-2 relative cursor-pointer',
                      {
                        'w-1/2 md:w-1/4': index < 2 || index > 3,
                        'w-full md:w-1/2 ': index === 2 || index === 3,
                      },
                    )}
                    key={meal.id}
                    onClick={() => handleClick(meal)}
                  >
                    {/* Display meal image */}
                    <Image
                      alt={meal.image}
                      className="h-full w-full rounded-lg object-cover"
                      src={meal.image}
                      width={100}
                      height={100}
                      unoptimized
                    />
                    {/* Display meal name on hover */}
                    <div className="absolute items-end flex justify-center rounded-md pb-3 pr-3 bottom-0 text-3xl font-normal text-white drop-shadow-lg outline-1 p-2 opacity-0 hover:opacity-100 bg-transparent overflow-hidden overflow-ellipsis w-full h-full">
                      {meal.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination controls */}
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                onClick={prevPage}
                disabled={currentPage === 0}
              >
                Previous
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                onClick={nextPage}
                disabled={currentPage === chunkedMeals.length - 1}
              >
                Next
              </button>
              {/* Displaying current range */}
              Showing {currentPage * itemsPerPage} -{' '}
              {chunkedMeals[currentPage]?.length !== undefined
                ? currentPage * itemsPerPage + chunkedMeals[currentPage]?.length
                : 0}
            </div>
          </>
        ) : (
          // Message for no items
          <div className="font-normal text-sm leading-2 text-gray-600 text-center">
            No items found, Change your query
          </div>
        )}
      </div>
    </>
  );
};
