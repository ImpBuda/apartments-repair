import './App.css';
import Header from "./layout/Header";
import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AppRouter from "./utils/AppRouter";
import {Context} from "./index";
import Main from "./components/Main";
import {AddAdvert_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SearchSpecialists_ROUTE} from "./utils/consts";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import SearchSpecialists from "./components/SearchSpecialists";
import addAdvert from "./components/addAdvert";

const App = observer(() => {

    const {user} = useContext(Context)

  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path={LOGIN_ROUTE} element={<Login/>}/>
                <Route path={REGISTRATION_ROUTE} element={<Registration/>}/>
                <Route element={<Main/>}>
                    <Route path={HOME_ROUTE} element={<Home/>}/>
                    <Route path={SearchSpecialists_ROUTE} element={<SearchSpecialists/>}/>
                    <Route path={AddAdvert_ROUTE} element={<addAdvert/>}/>
                </Route>
            </Routes>
        </Router>
    </div>
  );
})

export default App;
