import { useState } from 'react';
import { UserContext } from '../context/AuthContext';
import { useContext } from 'react';

export const useLogin = () => {
    const [loginerror, setloginerror] = useState<string | null>("")
    const [isloginLoading, setisloginLoading] = useState<boolean | null>(null)
    const {user,setUser} = useContext(UserContext)

    const login = async (username:string, password:string) => {
        setisloginLoading(true)
        setloginerror(null)
        const response = await fetch(import.meta.env.VITE_USER_LOGIN, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password })
        })
        const json = await response.json()
        if (!response.ok) {
            setisloginLoading(false)
            setloginerror(json.error)
        }
        if (response.ok) {
        localStorage.setItem('user', JSON.stringify(json))
        setUser({
            username: json.username,
            token: json.token,
        })
        setisloginLoading(false)
        }
    }

    return { login, isloginLoading, loginerror }
}