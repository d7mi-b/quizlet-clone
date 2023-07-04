import { useState } from "react";
import { useAuth } from "./useAuth";
import { api, setToken } from "~/utils/api";


export const useLogin = () => {
    const [error, setError] = useState<boolean | string | null>(null);
    const [isLoading, setIsLoading] = useState<any>(null);
    const { dispatch } = useAuth();

    const handelLogin = api.user.login.useMutation({
        onSuccess: (data) => {
            console.log(data)
            localStorage.setItem("user-Quizlet", JSON.stringify( { token: data.token, avatar: data.avater } ))
            dispatch({ type: "LOGIN", payload: data.token });
            setIsLoading(false);

            window.location.replace('/home')
        },

        onError: (error) => {
            setIsLoading(false);
            setError(error.message);
        }
    });

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError(false);

        handelLogin.mutate({
            email, password
        })
    }

    return { login, isLoading, error }
}