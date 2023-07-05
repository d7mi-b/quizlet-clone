import { useRouter } from "next/router";
import { useAuth } from "./useAuth";
import { Auth } from "~/context/AuthContext";

export const useLogout = () => {
    const { dispatch } = useAuth() as Auth;
    const router = useRouter();

    const logout = async () => {
        localStorage.removeItem("user-Quizlet");
        dispatch({ type: "LOGOUT", payload: { token: '' } });
        await router.replace('/');
    }

    return { logout };
}