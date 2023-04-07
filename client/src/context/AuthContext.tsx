import { createContext, ReactNode, useState, Dispatch, SetStateAction, useEffect } from "react";

export type User = {
    token: string
    username: string
}

export interface UserContextInterface {
    user: User,
    setUser: Dispatch<SetStateAction<User>>
}

export const defaultState = {
    user: {
        token: '',
        username: '',
    },
    setUser: (user: User) => {}
} as UserContextInterface

export const UserContext = createContext(defaultState)

type UserProvideProps = {
    children: ReactNode
}

export default function UserProvider({children}: UserProvideProps){
    const [user, setUser] = useState<User>({
        token:'',
        username:''
    });
    useEffect(() => {
        const user_info = JSON.parse(localStorage.getItem('user')!)
        if (user_info) {
            setUser(user_info)
            }
        }, [])

    return (
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}