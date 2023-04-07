import { UserContext } from '../context/AuthContext';
import { useContext } from 'react';

export const useLogout = () => {
    const {user,setUser} = useContext(UserContext)

    const logout = () => {
        localStorage.removeItem('user')
        setUser({
            username:'',
            token:''
        })
    }
    return { logout }
}