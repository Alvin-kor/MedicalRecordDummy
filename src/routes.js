import React from "react";
import {
  BrowserRouter,
  Route,
  Routes as Switch,
  Navigate,
} from "react-router-dom";
import Home from "Home/LoginPage";

export default function Path() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<Navigate to="/Home" replace />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
