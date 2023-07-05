import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { useLogin } from "~/hooks/useLogin";

const Login = () => {
    const { login, isLoading, error } = useLogin();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handelLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        login(email, password);
    }

    return (
        <section id="loginPage" className="fixed hidden top-0 w-full h-screen bg-slate-50 flex">
            <section className="w-2/4 bg-login-page p-14 max-lg:hidden">
                <header>
                    <h1 className="font-bold text-5xl w-80">
                        Smash sets in your sweats.
                    </h1>
                </header>
            </section>

            <section className="w-2/4 p-14 flex flex-col justify-center relative max-lg:w-full">
                <section id="btnCloseLoginPage" className="w-4 absolute top-0 right-0 m-4 text-slate-400 hover:text-slate-600 cursor-pointer">
                    <FontAwesomeIcon icon={faXmark} />
                </section>

                <section className="text-2xl">
                    <button 
                        className="mr-4 p-2 pl-0 rounded-md font-bold text-slate-300 hover:bg-slate-100"
                        id="btnSignupFromLoginPage"
                    >
                        Sign up
                    </button>
                    <button 
                        className="mr-4 p-2 pl-0 rounded-md font-bold hover:bg-slate-100"
                    >
                        Log in
                    </button>
                </section>

                <form className="my-4" onSubmit={handelLogin}>
                    <section className="my-4">
                        <input 
                            type="email" name="email" 
                            required placeholder="Type your email"
                            className={`
                                w-full py-2 border-b-2 border-slate-700 
                                bg-transparent my-2
                                focus-visible:border-yellow-500 focus-visible:outline-none
                            `}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email" className="text-slate-400 font-semibold uppercase">Email</label>
                    </section>

                    <section className="my-4">
                        <input 
                            type="password" name="password" 
                            required placeholder="Type your password" 
                            className={`
                                w-full py-2 border-b-2 border-slate-700 
                                bg-transparent my-2
                                focus-visible:border-yellow-500 focus-visible:outline-none
                            `}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <section className="flex justify-between">
                            <label htmlFor="password" className="text-slate-400 font-semibold uppercase">Password</label>
                            <Link href='/' className="text-sky-500 font-semibold hover:text-yellow-500">Forgot?</Link>
                        </section>
                    </section>
                    
                    {
                        error && <p className="text-red-400 font-semibold text-center">{error}</p>
                    }

                    <p className="text-center text-slate-500 my-4 text-sm">
                        By clicking Log in, you accept Quizlet&apos;s 
                        <Link href='/' className="font-semibold hover:text-slate-700">Terms of Service </Link>
                        and <Link href='/' className="font-semibold hover:text-slate-700">Privacy Policy</Link>
                    </p>
                    <section>
                        <input 
                            type='submit' name="submit" value='Log in' 
                            disabled={isLoading}
                            className="w-full bg-sky-400 p-4 text-slate-100 font-bold text-xl my-4 hover:bg-sky-500 rounded-md cursor-pointer disabled:bg-slate-400"
                        />
                    </section>
                </form>

                <section className="p-4 border-2 border-slate-300 text-center font-semibold">
                    <p>
                        New to Quizlet? <button id="btnCreateAccount" className="text-sky-500 font-semibold hover:text-yellow-500">Create an account</button>
                    </p>
                </section>
            </section>
        </section>
    )
}

export default Login;