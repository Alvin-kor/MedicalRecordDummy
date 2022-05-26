import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { default as Path } from "routes";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { firebaseConfig } from "config/fbconfig";
import { rrfConfig } from "config/rrfconfig";
import { store } from "config/store";
import { createFirestoreInstance } from "redux-firestore";

//styles
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.5.0";
import "assets/demo/demo.css?v=1.5.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.5.0";

//Initialize Firebaseapp
firebase.initializeApp(firebaseConfig);

//Initialize Firestore
firebase.firestore();

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Path />
    </ReactReduxFirebaseProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
