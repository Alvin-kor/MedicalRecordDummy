import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer, getFirestore } from "redux-firestore";
import { getFirebase } from "react-redux-firebase";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

var hist = createBrowserHistory();

const middleware = [
  thunk.withExtraArgument({ getFirebase, getFirestore, hist }),
];

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middleware))
);
