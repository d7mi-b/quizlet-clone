import { useState } from "react";
import { useAuth } from "./useAuth";
import { api } from "~/utils/api";
import { Auth } from "~/context/AuthContext";
import { useRouter } from "next/router";


export const useLogin = () => {
    const [error, setError] = useState<boolean | string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { dispatch } = useAuth() as Auth;

    const router = useRouter();

    const { mutate: handelLogin } = api.user.login.useMutation({
        onSuccess: async (data) => {
            localStorage.setItem("user-Quizlet", JSON.stringify( { token: data.token, avatar: data.avater } ))
            dispatch({ type: "LOGIN", payload: { token: data.token } });
            setIsLoading(false);

            await router.replace('/home');
        },

        onError: (error) => {
            setIsLoading(false);
            setError(error.message);
        }
    });

    const login = (email: string, password: string) => {
        setIsLoading(true);
        setError(false);

        handelLogin({
            email, password
        })
    }

    return { login, isLoading, error }
}