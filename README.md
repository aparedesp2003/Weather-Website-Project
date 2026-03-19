<<<<<<< HEAD
<<<<<<< HEAD
# Weather-Website_Project
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
>>>>>>> c9f62c7 (Initial commit)
=======
# Weather-Website-Project
A simple weather application built with React and Vite that allows users to search for any city and view current weather conditions.
>>>>>>> 23132370a95a1a064333bfccbf1eec4624a50f6f
A modern and responsive weather application built with React, Vite, and Tailwind CSS, allowing users to search for real-time weather data and view a 5-day forecast for any city worldwide.

This project focuses on building a clean user interface, handling asynchronous data from external APIs, and implementing practical features that simulate real-world applications.

Features

🔍 City Search

- Search for any city and retrieve real-time weather data
- Displays temperature, weather condition, and additional details

📍 Geolocation Support

- Get current weather based on the user’s location using the browser’s Geolocation API
- Automatically fetches weather and forecast using latitude and longitude

🌡️ Detailed Weather Information

- Temperature and “feels like”
- Humidity
- Wind speed
- Minimum and maximum temperatures

📅 5-Day Forecast

- Displays a daily forecast using data from the OpenWeather API
Each day includes:
Weather condition
Temperature
Icon representation

⏳ Loading & Error Handling

- Custom loading spinner while fetching data
- User-friendly error messages for invalid input or failed requests

🎨 Modern UI Design

- Built with Tailwind CSS
- Fully responsive layout
- Clean and user-friendly interface

* Tech Stack

- Frontend: React.js (with Vite)
- Styling: Tailwind CSS
- API: OpenWeather API
- State Management: React Hooks (useState)
- Browser API: Geolocation API

* What I Learned

- How to integrate and manage data from external APIs
- Handling asynchronous operations with async/await
- Structuring a React application using reusable components
- Managing application state and conditional rendering
- Improving user experience with loading states and error handling
- Working with browser APIs like Geolocation