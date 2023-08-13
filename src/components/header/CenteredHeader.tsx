import type { ReactNode } from 'react';

// Props type definition for CenteredHeader component
type ICenteredHeaderProps = {
  logo: ReactNode;
  children: ReactNode;
};

// Main CenteredHeader component
export const CenteredHeader = (props: ICenteredHeaderProps) => (
  <div className="flex-col items-center justify-center">
    {/* Render the logo */}
    <div className="text-center">{props.logo}</div>
    {/* Display a descriptive text */}
    <div className="font-normal text-sm leading-2 text-gray-600 text-center">
      Your seamless food finder
    </div>
  </div>
);
