/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Meal } from '@/context/MealsContext';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface IDetailsModalProps {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  meal: Meal;
}

export const DetailsModal: React.FC<IDetailsModalProps> = ({
  isOpen,
  setIsOpen,
  meal,
}) => {
  const closeModal = () => {
    setIsOpen && setIsOpen(false);
  };

  return (
    // Modal transition and dialog setup
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-100" onClose={closeModal}>
        {/* Overlay background */}
        <div className="fixed inset-0 bg-black bg-opacity-25" />
        {/* Modal content */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center md:min-h-full md:p-4 md:relative absolute bottom-0 w-full">
            {/* Modal panel */}
            <Transition.Child
              as={Fragment}
              enter="ease-out md:duration-150 duration-300"
              enterFrom="translate-y-full md:transform-none opacity-50 scale-95"
              enterTo="translate-y-0 md:transform-none opacity-100 scale-100"
              leave="ease-in duration-300"
              leaveFrom="md:transform-none translate-y-0 opacity-100 scale-100"
              leaveTo="md:transform-none translate-y-full opacity-0 scale-95"
            >
              <Dialog.Panel
                className={
                  'w-full md:max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all'
                }
              >
                {/* Modal content */}
                <section className="overflow-hidden rounded-lg shadow-2xl md:flex">
                  {/* Meal image */}
                  <img
                    alt="Meal"
                    src={meal.image}
                    className="h-60 w-full md:h-auto md:w-1/2 object-cover object-center"
                  />

                  {/* Meal details */}
                  <div className="flex flex-col justify-center p-4 sm:p-6 md:pl-6 lg:p-8">
                    <div className="text-sm font-semibold uppercase tracking-widest">
                      {meal.name}
                    </div>
                    <div className="mt-4 text-sm font-normal uppercase text-gray-400 text-left">
                      Recipe
                    </div>
                    <div className="mt-1 h-[30vh] md:h-[60vh] text-xs font-normal text-gray-600 overflow-y-auto break-normal whitespace-break-spaces">
                      {meal.description}
                    </div>
                  </div>
                </section>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
