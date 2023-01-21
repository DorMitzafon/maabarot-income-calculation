import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import { Result } from './Result';
import reportWebVitals from './reportWebVitals';
import { store } from './store';


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />
    },
    {
      path: "results",
      element: <Result />,
    },
  ]
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
  
);

reportWebVitals();
