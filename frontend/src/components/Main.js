import React from 'react';
import Header from "../layout/Header";
import SideBar from "../layout/SideBar";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {AddAdvert_ROUTE, HOME_ROUTE, LOGIN_ROUTE, SearchSpecialists_ROUTE} from "../utils/consts";
import Home from "./Home";
import SearchSpecialists from "./SearchSpecialists";
import addAdvert from "./addAdvert";
import {observer} from "mobx-react";

const Main = observer(() => {
    return (
        <>
            <Header/>
            <SideBar/>
            <Routes>
                <Route path={HOME_ROUTE} element={<Home/>}/>
                <Route path={SearchSpecialists_ROUTE} element={<SearchSpecialists/>}/>
                <Route path={AddAdvert_ROUTE} element={<addAdvert/>}/>
                <Route path='*' element={<Navigate to={LOGIN_ROUTE}/>}/>}
            </Routes>
        </>
    );
});

export default Main;