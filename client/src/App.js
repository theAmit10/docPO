import "./App.css";

import Dashboard from "./components/Admin/dashbooard/Dashboard";
import Login from "./components/Admin/login/Login";
import Signup from "./components/Admin/signup/Signup";

import { useState, useEffect } from "react";
import UpdatePage from "./components/Admin/UpdatePage/UpdatePage";
import Posts from "./components/Posts/Posts";
import DeletePage from "./components/Admin/DeletePage/DeletePage";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";

function App() {
  const [admin, setAdmin] = useState("");

  useEffect(() => { }, [admin]);

  const component = () => {
    return (
      <>
        {
          admin ? <Dashboard data={admin} /> : <Login setAdmin={setAdmin} />
        }
      </>
    )
  }

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/admin" component={component} />

          <Route exact path="/" component={Posts} />

          <Route exact path="/update" component={UpdatePage} />

          <Route exact path="/delete" component={DeletePage} />

          <Route path="*" component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
