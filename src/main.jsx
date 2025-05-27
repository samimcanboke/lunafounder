import "./polyfills";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.jsx";
import ThemeContext from "./context/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="">
        <ThemeContext>
          <App />
        </ThemeContext>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
