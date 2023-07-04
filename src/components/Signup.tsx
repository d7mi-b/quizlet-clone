import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import { useSignup } from "~/hooks/useSignup";


const Signup = () => {
    const { signup, isLoading, error } = useSignup();

    const [DOB, setDOB] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [policy, setPolicy] = useState<boolean>(false);

    const handelSignUp = async (e: any) => {
        e.preventDefault();

        await signup(username, email, password, DOB);
    }
    
    return (
        <section id="signupPage" className="absolute hidden top-0 w-full min-h-screen bg-slate-50 flex">
            <section className="w-2/4 bg-login-page p-14 max-lg:hidden">
                <header>
                    <h1 className="font-bold text-5xl w-full">
                        Take the guesswork out of your coursework. Sign up today.
                    </h1>
                </header>
            </section>

            <section className="w-2/4 p-14 flex flex-col justify-center relative max-lg:w-full">
                <section id="btnCloseSignupPage" className="w-4 absolute top-0 right-0 m-4 text-slate-400 hover:text-slate-600 cursor-pointer">
                    <FontAwesomeIcon icon={faXmark} />
                </section>

                <section className="text-2xl">
                    <button 
                        className="mr-4 p-2 pl-0 rounded-md font-bold hover:bg-slate-100"
                    >
                        Sign up
                    </button>
                    <button 
                        className="mr-4 p-2 pl-0 rounded-md font-bold text-slate-300 hover:bg-slate-100"
                        id="btnLoginFromSignupPage"
                    >
                        Log in
                    </button>
                </section>

                <form className="my-4" onSubmit={handelSignUp}>
                    <section className="my-4 text-sm">
                        <label htmlFor="birthday" className="text-slate-400 font-semibold uppercase">Birthday</label>
                        <input 
                            type='date' name="birthday" required
                            className={`
                                w-full p-4 border-2 border-slate-700 
                                bg-transparent my-2 rounded-md text-slate-500
                                focus-visible:border-yellow-500 focus-visible:outline-none
                            `}
                            value={DOB}
                            onChange={(e) => setDOB(e.target.value)}
                        />
                    </section>

                    <section className="my-4">
                        <label htmlFor="email" className="text-slate-400 font-semibold text-sm uppercase">Email</label>
                        <input 
                            type="email" name="email" 
                            required placeholder="email@quizlet.com"
                            className={`
                                w-full p-4 border-2 border-slate-700 
                                bg-transparent my-2 rounded-md
                                focus-visible:border-yellow-500 focus-visible:outline-none
                            `}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </section>

                    <section className="my-4">
                        <label htmlFor="username" className="text-slate-400 font-semibold text-sm uppercase">Username</label>
                        <input 
                            type="text" name="username" 
                            required placeholder="username"
                            className={`
                                w-full p-4 border-2 border-slate-700 
                                bg-transparent my-2 rounded-md
                                focus-visible:border-yellow-500 focus-visible:outline-none
                            `}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </section>

                    <section className="my-4">
                        <label htmlFor="password" className="text-slate-400 font-semibold text-sm uppercase">Password</label>
                        <input 
                            type="password" name="password" 
                            required placeholder="********" 
                            className={`
                                w-full p-4 border-2 border-slate-700 
                                bg-transparent my-2 rounded-md
                                focus-visible:border-yellow-500 focus-visible:outline-none
                            `}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </section>

                    {
                        error && <p className="text-red-400 font-semibold text-center">{error}</p>
                    }
                    
                    <section className="my-4">
                        <input 
                            type='checkbox' name="privacy" required 
                            className="checked:bg-sky-500 w-4 h-4"
                            checked={policy}
                            onChange={e => setPolicy(e.target.checked)} 
                        />
                        <label htmlFor="privacy" className="text-center text-slate-500 mx-2 text-md">
                            I accept Quizlet's <Link href='/' className="font-semibold text-sky-400 hover:text-yellow-500">Terms of Service </Link>
                            and <Link href='/' className="font-semibold text-sky-400 hover:text-yellow-500">Privacy Policy</Link>
                        </label>
                    </section>

                    <section>
                        <input 
                            type='submit' name="submit" value='Sign up' 
                            disabled={isLoading}
                            className="w-full bg-sky-400 p-4 text-slate-100 font-bold text-xl my-4 hover:bg-sky-500 rounded-md cursor-pointer disabled:bg-slate-400"
                        />
                    </section>
                </form>

                <section className="p-4 border-2 border-slate-300 text-center font-semibold">
                    <p>
                        Already have an account? <button id="btnHaveAccount" className="text-sky-500 font-semibold hover:text-yellow-500">Log in</button>
                    </p>
                </section>
            </section>
        </section>
    )
}

export default Signup;