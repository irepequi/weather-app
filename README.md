# Weather App

## Description
A web application built with **ReactJS**, **Redux Toolkit**, and **TypeScript**, allowing users to:
1. Log in via a form using an email and password.
2. View detailed weather information for cities using the OpenWeatherMap API with axios for efficient requests.
3. Switch the application language between Spanish and English.
4. Access a contact form with validation.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/irepequi/weather-app.git
   cd weather-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your OpenWeatherMap API key in a `.env` file:
   ```env
   VITE_WEATHER_API_KEY=your-api-key
   VITE_AUTH_EMAIL=user@example.com
   VITE_AUTH_PASSWORD=1234
   ```
4. Start the project in development mode:
   ```bash
   npm run dev
   ```

## Usage
1. Access the application and log in with the following sample credentials:
   - Email: `user@example.com`
   - Password: `1234`
2. Select the language via the top bar dropdown.
3. Switch between cities using the sidebar to check the weather.
4. Fill out the contact form to validate the data before submission.