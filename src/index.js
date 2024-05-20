import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { NextUIProvider } from "@nextui-org/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <NextUIProvider>
    
      <App />
   
    </NextUIProvider>
    </PersistGate>
  </Provider>
);
