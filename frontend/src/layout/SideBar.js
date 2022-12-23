import React from 'react';
import { BsHouse, BsSignpost, BsJournalPlus } from "react-icons/bs";
import {Link} from "react-router-dom";
import {AddAdvert, AddAdvert_ROUTE, HOME_ROUTE, SearchSpecialists_ROUTE} from "../utils/consts";
import "../css/sidebar.css"

const SideBar = () => {
    return (
        <>
            <div className="sideBar">
                <span className="title">Меню</span>
                <div className="menuHome">
                    <Link to={HOME_ROUTE}>
                        <div className="icon"><BsHouse/></div>
                        <span className="">Главная страница</span>
                    </Link>
                </div>
                <div className="menuItem">
                    <Link to={SearchSpecialists_ROUTE}>
                        <div className="icon"><BsSignpost/></div>
                        <span>Поиск специалистов</span>
                    </Link>
                </div>
                <div className="menuItem">
                    <Link to={AddAdvert_ROUTE}>
                        <div className="icon"><BsJournalPlus/></div>
                        <span>Создать объявление</span>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SideBar;