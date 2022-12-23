import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {Context} from "../index";
import {Route, Routes} from "react-router-dom";
import {Navigate} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {LOGIN_ROUTE} from "./consts";


const AppRouter = observer(() => {
    const {user} = useContext(Context)
    return (
            <Routes>
                {!user.isAuth ? authRoutes.map(({path, Component}) =>
                        <Route key={path} path={path} element={Component}/>
                    )
                    :
                    publicRoutes.map(({path, Component}) =>
                        <Route key={path} path={path} element={Component}/>
                    )}
            </Routes>
    );
});

export default AppRouter;