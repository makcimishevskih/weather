import "./index.scss";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "@redux/store";

import HomePage from "@pages/HomePage";
import ErrorPage from "@pages/ErrorPage.js";
import MainContentPage from "@pages/MainContentPage.js";
import TenDaysWeatherPage from "@pages/TenDaysWeatherPage.js";
import CityNotFoundPage from "@pages/CityNotFoundPage.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

// LOADER --- ERROR
// LAZY LOADING
// ПЕРЕВОД НА СТРАНИЦУ 10 ДНЕЙ НА КОНКРЕТНЫЙ ДЕНЬ
// Ошибка запроса после пустой строки в SEARCH FORM
// REACT SPRING

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MainContentPage />,
      },
      {
        path: "/tenDaysWeather",
        element: <TenDaysWeatherPage />,
        children: [
          {
            path: ":id",
            element: <TenDaysWeatherPage />,
          },
        ],
      },
      {
        path: "/notFoundPage",
        element: <CityNotFoundPage />,
      },
    ],
  },
]);

root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
