import { AppConfig } from '../utils/AppConfig';

// Props type definition for Logo component
type ILogoProps = {
  xl?: boolean;
};

// Logo component
const Logo = (props: ILogoProps) => {
  // Determine the size and font style based on the `xl` prop
  const size = props.xl ? '44' : '32';
  const fontStyle = props.xl
    ? 'font-semibold text-3xl'
    : 'font-semibold text-xl';

  return (
    // Wrapper for logo
    <span className={`inline-flex items-center text-gray-900 ${fontStyle}`}>
      {/* SVG icon */}
      <svg
        className="mr-1 stroke-current text-primary-500"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M0 0h24v24H0z" stroke="none" />
        <rect x="3" y="12" width="6" height="8" rx="1" />
        <rect x="9" y="8" width="6" height="12" rx="1" />
        <rect x="15" y="4" width="6" height="16" rx="1" />
        <path d="M4 20h14" />
      </svg>
      {/* Display the site name from AppConfig */}
      {AppConfig.site_name}
    </span>
  );
};

export { Logo };
