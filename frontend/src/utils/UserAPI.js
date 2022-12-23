import {$authHost, $host} from "./http";

export const registration = async (username, password, email) => {
    let accessToken;
    const {data} = await $host.post('api/auth/signup', {username, password, email, accessToken})
    localStorage.setItem('token', data.accessToken)
    return data.accessToken
}

export const login = async (username, password) => {
    let accessToken;
    const {data} = await $host.post('api/auth/signin', {username, password, accessToken})
    localStorage.setItem('token', data.accessToken)
    return data.accessToken
}

export const checkSession = async () =>{
    const {data} = await $authHost.get('/api/auth/token/check')
    return data
}
