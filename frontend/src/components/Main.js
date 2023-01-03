import React, {useContext, useState} from 'react';
import Header from "../layout/Header";
import SideBar from "../layout/SideBar";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {AddAdvert_ROUTE, HOME_ROUTE, LOGIN_ROUTE, SearchSpecialists_ROUTE} from "../utils/consts";
import Home from "./Home";
import SearchSpecialists from "./SearchSpecialists";
import AddAdvert from "./AddAdvert";
import {observer} from "mobx-react";
import Advert from "./Advert";
import {Context} from "../index";

const Main = observer(() => {

    const {user} = useContext(Context)

    return (
        <>
            <Header/>
            <SideBar/>
            <Routes>
                <Route path={HOME_ROUTE} element={<Home/>}/>
                <Route path={SearchSpecialists_ROUTE} element={<SearchSpecialists/>}/>
                {user.isAuth && <Route path={AddAdvert_ROUTE} element={<AddAdvert/>}/> }
                <Route path='/:id' element={<Advert/>}/>
                <Route path='*' element={<Navigate to={LOGIN_ROUTE}/>}/>}
            </Routes>
        </>
    );
});

export default Main;