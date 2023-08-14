// This is the only place we need to import 'React':
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "state";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "state/api";

// boilerplate redux setup stuff:
const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // StrictMode is a tool for highlighting potential problems in an 
  // application; it does not render any visible UI - it activates additional 
  // checks and warnings for its descendants.
  // *** Strict mode checks are run in development mode only ***

  <React.StrictMode>
    {/* Configure 'App' to use redux: */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);