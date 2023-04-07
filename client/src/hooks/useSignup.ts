import { useState } from 'react'
import { UserContext } from '../context/AuthContext';
import { useContext } from 'react';

export const useSignup = () => {
    const [error, setError] = useState<string | null>("")
    const [isLoading, setIsLoading] = useState<boolean | null>(null)
    const {user,setUser} = useContext(UserContext)

    const signup = async (username:string, password:string) => {
        setIsLoading(true)
        setError(null)
        const response = await fetch(import.meta.env.VITE_USER_SIGNUP, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password })
        })
        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json))
            setUser({
                username: json.username,
                token: json.token
            })
            setIsLoading(false)
        }
    }
    return { signup, isLoading, error }
}