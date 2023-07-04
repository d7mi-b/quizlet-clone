"use client"

import React, { ReactNode, createContext, useEffect, useReducer } from "react";
import { useRouter } from 'next/router';
import { useAuth } from "~/hooks/useAuth";
import Home from "~/pages";
import { setToken } from "~/utils/api";

type State = {
    user: User | null
}

type Action = {
    type: string,
    payload: any
}

type Props = {
    children: ReactNode;
};

type User = {
    token: string
}

export const authReducer = (state: State, action: Action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload };
        case "LOGOUT":
            return { user: null };
        default:
            return state;
    }
}

export const AuthContext = createContext<any>({ });

export function AuthProvider({ children }: Props) {
    const [state, dispatch]: any = useReducer<any>(authReducer, {
        user: null
    });

    console.log('AuthContext State: ', state);

    useEffect(() => {
        const user: User = JSON.parse(localStorage.getItem('user-Quizlet') || '{}');

        if (user.token) {
            dispatch({type: 'LOGIN', payload: user});
            setToken(user.token)
        }
    }, [])

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
}

export const ProtectRoute = ({ children }: Props) => {
    const { user } = useAuth();

    const router = useRouter()

    if (!user && (router.pathname !== '/')) {
        return <Home />;
    }
    
    return children;
};