import "./index.scss";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "@redux/store";

import HomePage from "@pages/HomePage";
import MainContentPage from "@pages/MainContentPage.js";
import {
  TenDaysWeatherPage,
  CityNotFoundPage,
  ErrorPage,
} from "@pages/lazy-loading-pages/LazyLoadingPages.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MainContentPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/tenDaysWeather",
        element: <TenDaysWeatherPage />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: ":id",
            element: <TenDaysWeatherPage />,
            errorElement: <ErrorPage />,
          },
        ],
      },
      {
        path: "/not-found-page",
        element: <CityNotFoundPage />,
        errorElement: <ErrorPage />,
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
