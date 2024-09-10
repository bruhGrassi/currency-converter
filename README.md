# Currency Converter

This is a currency conversion and chart visualization project that allows users to convert values between different currencies and view the exchange rate over different periods. The project was built using Vite + React and leverages the [Currency Beacon API](https://currencybeacon.com/) to fetch real-time exchange rates.

## Features

- **Currency Conversion**: Convert values between various currencies.
- **Chart Visualization**: View the exchange rate trends over different periods, such as 5 days or 1 month.
- **Intuitive Interface**: A user-friendly and responsive interface that works seamlessly on any device.
- **Testing**: The project includes unit tests written with [Vitest](https://vitest.dev/).

## Technologies Used

- **React**: JavaScript library for building the user interface.
- **Vite**: Frontend build tool with minimal configuration.
- **Currency Beacon API**: API used to fetch currency conversion data.
- **Shadcn**: UI component library used for building components.
- **Tailwind CSS**: CSS framework for styling.
- **Lucide Icons**: Icon set used throughout the interface.
- **Vitest**: A blazing-fast unit testing framework.

## Requirements

- **Node.js**: Ensure that Node.js is installed on your machine. [Download Node.js](https://nodejs.org/)

## Installation

Follow the steps below to set up and run the project locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/currency-converter.git
   cd currency-converter
   ```

2. **Clone the repository**:

   ```bash
   npm install
   ```

3. **API Configuration:**:

The project uses the [Currency Beacon API](https://currencybeacon.com/) to fetch exchange rates. To run the project correctly, you need an API key.

- Create an account at [Currency Beacon](https://currencybeacon.com/) and obtain your API key.
- Create a .env file in the root directory of the project and add your API key:

  ```bash
   VITE_API_KEY=your_api_key_here
  ```

3. **Start the development server:**:
   ```bash
   npm run dev
   ```

## Running Tests

This project includes unit tests using [Vitest](https://vitest.dev/). To run the tests, use the following command:

```bash
npm run test
```
