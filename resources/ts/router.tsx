import React from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import TaskPage from "./pages/tasks";
import LoginPage from "./pages/login";
import HelpPage from "./pages/help";

const Router = () => {
    return (
        <BrowserRouter>
            <header className="global-head">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/help">Help</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><span>ログアウト</span></li>
                </ul>
            </header>
            <Switch>
                <Route path="/help">
                    <HelpPage />
                </Route>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route exact path="/">
                    <TaskPage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Router