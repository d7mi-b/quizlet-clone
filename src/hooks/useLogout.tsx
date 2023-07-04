import { useRouter } from "next/router";
import { useAuth } from "./useAuth";

export const useLogout = () => {
    const { dispatch } = useAuth();
    const router = useRouter();

    const logout = async () => {
        localStorage.removeItem("user-Quizlet");
        dispatch({ type: "LOGOUT" });
        router.replace('/');
    }

    return { logout };
}