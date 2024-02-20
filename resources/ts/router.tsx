import React, {useEffect} from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    RouteProps,
    Redirect
} from "react-router-dom";
import TaskPage from "./pages/tasks";
import LoginPage from "./pages/login";
import HelpPage from "./pages/help";
import NotFoundPage from "./pages/error/";
import axios from "axios";
import { useLogout, useUser } from "./queries/AuthQuery";
import { useAuth } from "./hooks/AuthContext";

const Router = () => {

    const logout = useLogout();

    const { isAuth, setIsAuth } = useAuth();

    const { isLoading, data:authUser } = useUser();

    const GaurdRoute = (props: RouteProps) => {
        if(!isAuth){ 
            return <Redirect to="/login" />
        }
        return <Route {...props}/>
    }

    const LoginRoute = (props: RouteProps) => {
        if(isAuth){ 
            return <Redirect to="/" />
        }
        return <Route {...props}/>
    }

    useEffect(() => {
        if(authUser){
            setIsAuth(true)
        }
    },[authUser]);

    const navigation = (
        <header className="global-head">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/help">Help</Link></li>
                    <li onClick={()=>logout.mutate()}><span>ログアウト</span></li>
                </ul>
            </header>
    ) 

    const loginNavigation = (
        <header className="global-head">
                <ul>
                    <li><Link to="/help">Help</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </header>
    )

    if(isLoading){
        return <div className="loader"></div>
    }

    return (
        <BrowserRouter>
            {isAuth ? navigation : loginNavigation}
            <Switch>
                <Route path="/help">
                    <HelpPage />
                </Route>
                <LoginRoute path="/login">
                    <LoginPage />
                </LoginRoute>
                <GaurdRoute exact path="/">
                    <TaskPage />
                </GaurdRoute>
                <Route component={NotFoundPage} />
            </Switch>
        </BrowserRouter>
    );
}

export default Router