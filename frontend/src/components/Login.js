import React, {useContext, useEffect, useState} from 'react';
import "../css/loginForm.css"
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom"
import {Context} from "../index";
import {REGISTRATION_ROUTE} from "../utils/consts";
import {login} from "../utils/UserAPI";
import {observer} from "mobx-react";




const Login = observer(() => {

    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const Auth = async (e) => {
        e.preventDefault()
        try {
            let data;
            data = await login(username, password);
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
                        <span className='title1'>Вход</span>
                        <Link className='title2' to={REGISTRATION_ROUTE}><span>Регистрация</span></Link>
                    </div>
                    <div className="inputs">
                        <input
                            type={"email"}
                            onChange={e => setUsername(e.target.value)}
                            value={username}
                            placeholder="Введите почту"
                        />
                        <input
                            type={"Password"}
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            placeholder="Введите пароль"
                        />
                    </div>
                    <button className="login" onClick={event => Auth(event)}>Войти</button>
                </form>
            </div>
        </>
    );
});

export default Login;