import './App.css';
import React, {useContext} from 'react';
import {observer} from "mobx-react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import {Context} from "./index";
import Main from "./components/Main";
import {AddAdvert_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SearchSpecialists_ROUTE} from "./utils/consts";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import SearchSpecialists from "./components/SearchSpecialists";
import AddAdvert from "./components/AddAdvert";
import Advert from "./components/Advert";

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
                    {user.isAuth && <Route path={AddAdvert_ROUTE} element={<AddAdvert/>}/> }
                    <Route path='/:id' element={<Advert/>}/>}
                    <Route path='*' element={<Navigate to={LOGIN_ROUTE}/>}/>
                </Route>
            </Routes>
        </Router>
    </div>
  );
})

export default App;
