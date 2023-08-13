import React, { createContext, useReducer, useContext, Dispatch } from 'react';

// Define the meal type
export interface Meal {
  id: string;
  name: string;
  description: string;
  image: string;
}

// Define the context type
interface MealContextType {
  meals: Meal[];
  dispatch: Dispatch<MealAction>;
}

// Define the actions
type MealAction =
  | { type: 'ADD_MEAL'; payload: Meal }
  | { type: 'REMOVE_MEAL'; payload: string }
  | { type: 'CLEAR_MEALS' }
  | { type: 'ADD_MULTIPLE_MEALS'; payload: Meal[] }; 

// Create the context
const MealContext = createContext<MealContextType | undefined>(undefined);

// Define the reducer
const mealReducer = (state: Meal[], action: MealAction): Meal[] => {
  switch (action.type) {
    case 'ADD_MEAL':
      return [...state, action.payload];
    case 'REMOVE_MEAL':
      return state.filter(meal => meal.id !== action.payload);
    case 'CLEAR_MEALS': 
      return []; 
    case 'ADD_MULTIPLE_MEALS': 
      return [...state, ...action.payload]; 
    default:
      return state;
  }
};

// Create the MealProvider component
export const MealProvider: React.FC<{children: React.ReactNode }> = ({ children }) => {
  const [meals, dispatch] = useReducer(mealReducer, []);

  return (
    <MealContext.Provider value={{ meals, dispatch }}>
      {children}
    </MealContext.Provider>
  );
};

// Custom hook to access meal context
export const useMealContext = () => {
  const context = useContext(MealContext);
  if (context === undefined) {
    throw new Error('useMealContext must be used within a MealProvider');
  }
  return context;
};
