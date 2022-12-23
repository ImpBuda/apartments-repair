import React, {useContext, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";
import {observer} from "mobx-react";
import {Context} from "../index";
import "../css/RegistrationForm.css"
import {registration} from "../utils/UserAPI";

const Registration = observer(() => {

    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const Registration = async (e) => {
        e.preventDefault()
        try {
            let data;
            data = await registration(username, password, email);
            user.setIsAuth(true)
            navigate('/')
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <>
            <div className="bg">
                <form>
                    <div className="titles">
                        <span className='title1'>Регистрация</span>
                        <Link className='title2' to={LOGIN_ROUTE}><span >Вход</span></Link>
                    </div>
                    <div className="inputs">
                        <input
                            placeholder="Введите имя пользователя"
                            type={"text"}
                            onChange={e => setUsername(e.target.value)}
                            value={username}
                        />

                        <input
                            placeholder="Введите почту"
                            type="email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        <input
                            placeholder="Введите пароль"
                            type="Password"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <button className="registration" onClick={event => Registration(event)} >Зарегистрироваться</button>
                </form>
            </div>
        </>
    );
});

export default Registration;