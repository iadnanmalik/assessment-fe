import { AppConfig } from '@/utils/AppConfig';
import React from 'react';
import { Meta } from '../templates/Meta';
import { Header } from '@/templates/Header';
import { MealProvider } from '@/context/MealsContext';

type IHomeLayoutProps = {
  children: React.ReactNode;
};

export const HomeLayout: React.FC<IHomeLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen p-6 relative">
      {/* Meta information for the page */}
      <Meta title={AppConfig.title} description={AppConfig.description} />

      {/* Header section */}
      <Header />

      {/* Context provider for meals */}
      <MealProvider>
        {/* Content area */}
        <div className="flex-col">{children}</div>
      </MealProvider>
      {/* Footer section (commented out) */}
      {/* <Footer /> */}
    </div>
  );
};
