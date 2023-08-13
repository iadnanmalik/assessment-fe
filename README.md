# Food Search

The application implements a food search solution that displays a list of food images. Users can search and query for specific foods, and details about each food item can be viewed in a modal. The following [![Food API](https://www.themealdb.com/api.php)](https://www.themealdb.com/api.php) was used to fetch the data regarding multiple meals available.  App was built using Next.js 13 pages router, utilizing various technologies and libraries including React, TypeScript, React Query, custom hooks, context API, reducers, and more. 
## Features

- List of Food Images: The application displays a list of food images that users can explore.

- Search Functionality: Users can search for specific foods using the search bar. The list updates dynamically as the user types.

- Details View: Users can view detailed information about a specific food item by clicking on it.

- Responsive Design: The application is designed to work seamlessly across different devices and screen sizes.

## Getting Started

Follow these steps to get the application up and running on your local machine:

1. **Clone the Repository**: Start by cloning this repository to your local machine.

2. **Install Dependencies**: Navigate to the project directory and run the following command to install the required dependencies using pnpm:

   ```bash
   pnpm install
   ```

3. **Start Development Server**: Run the following command to start the development server:

   ```bash
   pnpm dev
   ```

   This will start the application on [http://localhost:3000](http://localhost:3000).

4. **Open in Browser**: Open your web browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

## Scripts

- `pnpm dev`: Start the development server.

- `pnpm build`: Build the application.

- `pnpm start`: Start the production server.


- `pnpm clean`: Clean build artifacts.


- `pnpm format`: Format code and fix linting issues.

- `pnpm check-types`: Check TypeScript types.

- `pnpm test`: Run Jest tests.

- `pnpm coverage`: Run tests with coverage.

## Decisions and Assumptions
- While chosing the state management library, I chose context API with reducers because the state management for this level of system only required one main benefit of avoiding prop drilling. Also I'm good at context API with reducers.
- Chose react-query over useSWR or any other data fetching hooks because of the power that react-query provides, caching, pagination and many others.
- Implemented the pagination inside the component because the API wasn't supporting the pagination.
- For a system of this level I would prefer to not use any state management library because it has its own performance overheads. I would prefer a combination of prop sharing, useMemo and useCallbacks to create a good state sharing mechanism. Implemented the Context API with reducers for the sake of functional requirement.
- For styling I chose tailwind because its very easy to type and after Tailwind v3.0 there has been immense performance gains so prefered it, along with tailwind I also used SCSS for custom stylings on the main page.
- For testing I wrote unit tests only, I haven't have any experience with integration tests on frontend so wasn't sure about them. For unit tests I chose the `SearchBar` component because here the main action is happening, with a bunch of loading states, responses and hooks it was fun to test this component out.
- Chose next's own image component to render images because it provides lazy loading and many other optimization options to load images properly.
- Decided to build my own custom modal using headless-ui and it comes with a bunch of cool transitions, do check them out.
- An Assumption I made while testing is that SearchBar is the only main component with an actual API call that needs to be tested.

## Challenges 
- Setting up jest was very time taking, Was trying to get it run without getting to the actual problem. That was solved when I mapped the absolute paths in the jest config
- Setting up the loader to make the background full screen fade was a bit challenging, finally implemented it with portals.
- Adding pop up transitions for modal took some time.


## License

This project is licensed under the [ISC License](LICENSE). Feel free to modify and use it according to your needs.

**Note:** Make sure to replace this placeholder text with meaningful information about your project and its features.
