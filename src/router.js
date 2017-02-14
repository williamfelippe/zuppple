import React from "react";
import {Router, Route, browserHistory} from "react-router";

/* Layouts */
import MainLayout from "./layouts/main-layout";

/* Pages */
import Shots from "./containers/shots";
import ShotDetail from "./containers/shot-detail";
import UserDetail from "./containers/user-detail";

export default(
    <Router history={browserHistory}>
        <Route component={MainLayout}>
            <Route path="/" component={Shots} />
            <Route path="shot/:shotId" component={ShotDetail} />
            <Route path="user/:userId" component={UserDetail} />
        </Route>
    </Router>
);