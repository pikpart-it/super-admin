import { Suspense } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import AppLayout from "./AppLayout";

function App() {
  return (
    <Router>
      <Switch>
        <Suspense fallback="Loading...">
          <AppLayout />
        </Suspense>
      </Switch>
    </Router>
  );
}

export default App;
