import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";

import { Provider } from "react-redux";
import { store } from "./store/config";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<<<<<<< HEAD
//   <ConfigProvider theme={{
//     token: {
//         colorBgContainer: "white"
//     }
//   }}>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </ConfigProvider>
<App/>
);
=======
  
<Provider store={store}>
    <App />
</Provider>);
>>>>>>> bfcd9434559a7d0989e8483be9d8e5786d4dfe6f

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
