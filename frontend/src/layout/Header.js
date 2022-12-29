import React, {useContext, useEffect, useState} from 'react';
import "../css/Header.css"
import { BiChevronDown, BiMessageRounded } from "react-icons/bi";
import { BsFillBookmarkFill, BsFillPersonFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import ClickAwayListener from '@mui/base/ClickAwayListener';
import {Avatar, Badge} from "@mui/material";
import {observer} from "mobx-react";
import {Context} from "../index";
import {Link, useNavigate} from "react-router-dom"
import {LOGIN_ROUTE, SearchSpecialists_ROUTE} from "../utils/consts";


const Header = observer(({setSearchValue}) => {

    const {user} = useContext(Context)
    const navigate = useNavigate()

    const [searchCategory, setSearchCategory] = useState("Все категории")
    const [openSearch, setOpenSearch] = useState(false);
    const [openAvatar, setOpenAvatar] = useState(false);

    const searchItem = [
        {text: "Все категории"},
        {text: "My Profile"},
        {text: "Edit Profile"},
        {text: "Inbox"},
        {text: "Settings"},
    ]

    const logOut = () => {
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }

    return (
        <>
            <div className="header">
                <div className="wrap-img"/>
                <div className="profile-icons">
                    <div className="search-bar">
                        <ClickAwayListener  onClickAway={() => {setOpenSearch(false)}}>
                            <div className="menu">
                                <div className="categories" onClick={()=>{setOpenSearch(!openSearch)}}>
                                    <span>{searchCategory}</span>
                                    <div className= {`list-categories ${openSearch? 'active' : 'inactive'}`}><BiChevronDown /></div>
                                </div>
                                <div className={`dropdown-menu ${openSearch? 'active' : 'inactive'}`} >
                                    <ul>
                                        {searchItem.map((item) =>(
                                        <DropdownItem text = {item.text} onClick={()=>{setSearchCategory(item.text)}} />
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </ClickAwayListener>
                        <input id="input"
                            placeholder="Поиск..."
                        />
                        <Link to={SearchSpecialists_ROUTE}>
                            <button type="submit" className="search-button" onClick={() => setSearchValue(document.querySelector("#input"))}>
                             <i className="fa fa-search"/>
                            </button>
                        </Link>
                    </div>
                    <div className="messages"><BiMessageRounded/></div>
                    <div className="favorites"><BsFillBookmarkFill/></div>
                    <div className="vertLine"/>
                    <ClickAwayListener  onClickAway={() => {setOpenAvatar(false)}}>
                        <div className="wrapper-avatar">
                            <Avatar
                                onClick={()=>{setOpenAvatar(!openAvatar)}}
                                className="avatar"
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                                sx={{ width: 56, height: 56 }}
                            />
                            {user.isAuth ?
                                <div className={`dropdown-menu ${openAvatar ? 'active' : 'inactive'}`}>
                                    <DropdownItem text="Профиль" icon={<BsFillPersonFill/>}/>
                                    <DropdownItem text="Выйти" onClick={logOut} icon={<FiLogOut/>}/>
                                </div>
                                :
                                <div className={`dropdown-menu ${openAvatar ? 'active' : 'inactive'}`}>
                                    <Link to={LOGIN_ROUTE}><DropdownItem text="Вход" icon={<BsFillPersonFill/>}/></Link>
                                </div>
                            }
                        </div>
                    </ClickAwayListener>
                </div>
            </div>
        </>
    );
});

function DropdownItem(props){
    return(
        <li className = 'dropdownItem' onClick={props.onClick}>
            <div className="icon-profile">{props.icon}</div>
            <a> {props.text} </a>
        </li>
    );
}

export default Header;