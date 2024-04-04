# Getting Started with React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites

- Node.js
- npm
- BooksAppBackend

## Available Scripts

In the project directory, you can run if yarn, otherwise npm works as well:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Structure

```
.
├── src/                  # Source code
│   ├── locales/          # locales
│   ├── components/       # React components
│   ├── config/           # Some configurable elements like the theme and default data
│   ├── models/           # Models delcaration
│   ├── pages/            # React page components
│   ├── provider/         # React Providers
│   ├── services/         # Services declarations and implementation
│   ├── state/            # State handlers
│   ├── utils/            # Utility functions and unified accessers
├── public/               # Static assets
└── README.md             # Documentation
```

## Configuration

- It requires to specify the backend address while setting an environment variables if the backend is not running on localhost:3000.
- Example in bash:
    ```
    export REACT_APP_BACKEND_ADDRESS=__YOUR_ADDRESS__ && npm run start
    ```
