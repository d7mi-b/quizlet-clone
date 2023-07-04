import { useState } from "react";
import { useAuth } from "./useAuth";
import { api, setToken } from "~/utils/api";

export const useSignup = () => {
    const [error, setError] = useState<boolean | string | null>(null);
    const [isLoading, setIsLoading] = useState<any>(null);
    const { dispatch } = useAuth();

    const signupAPI = api.user.signup.useMutation({
        onSuccess: (data) => {
            setToken(data.token)
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


    const signup = async (username: string, email: string, password: string, DOB: string) => {
        setIsLoading(true);
        setError(false);

        signupAPI.mutate({ 
            username, DOB, email, password
        })
    }

    return { signup, isLoading, error }
}