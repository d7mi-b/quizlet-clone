import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Signup = () => {
    
    return (
        <section id="signupPage" className="absolute hidden top-0 w-full min-h-screen bg-slate-50 flex">
            <section className="w-2/4 bg-login-page p-14">
                <header>
                    <h1 className="font-bold text-5xl w-full">
                        Take the guesswork out of your coursework. Sign up today.
                    </h1>
                </header>
            </section>

            <section className="w-2/4 p-14 flex flex-col justify-center relative">
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

                <form className="my-4">
                    <section>
                        <label htmlFor="birthday" className="text-slate-500 font-semibold">Birthday</label>
                        <input 
                            type='date' name="birthday" required
                            className={`
                                w-full p-4 border-2 border-slate-700 
                                bg-transparent my-2 rounded-md text-slate-500
                                focus-visible:border-yellow-500 focus-visible:outline-none
                            `}
                        />
                    </section>

                    <section>
                        <label htmlFor="email" className="text-slate-500 font-semibold">Email</label>
                        <input 
                            type="email" name="email" 
                            required placeholder="email@quizlet.com"
                            className={`
                                w-full p-4 border-2 border-slate-700 
                                bg-transparent my-2 rounded-md
                                focus-visible:border-yellow-500 focus-visible:outline-none
                            `}
                        />
                    </section>

                    <section>
                        <label htmlFor="username" className="text-slate-500 font-semibold">Username</label>
                        <input 
                            type="text" name="username" 
                            required placeholder="username"
                            className={`
                                w-full p-4 border-2 border-slate-700 
                                bg-transparent my-2 rounded-md
                                focus-visible:border-yellow-500 focus-visible:outline-none
                            `}
                        />
                    </section>

                    <section>
                        <label htmlFor="password" className="text-slate-500 font-semibold">Password</label>
                        <input 
                            type="password" name="password" 
                            required placeholder="********" 
                            className={`
                                w-full p-4 border-2 border-slate-700 
                                bg-transparent my-2 rounded-md
                                focus-visible:border-yellow-500 focus-visible:outline-none
                            `}
                        />
                    </section>
                    
                    <section className="my-4">
                        <input type='checkbox' name="privacy" required className="checked:bg-sky-500 w-4 h-4" />
                        <label htmlFor="privacy" className="text-center text-slate-500 mx-2 text-md">
                            I accept Quizlet's <Link href='/' className="font-semibold text-sky-400 hover:text-yellow-500">Terms of Service </Link>
                            and <Link href='/' className="font-semibold text-sky-400 hover:text-yellow-500">Privacy Policy</Link>
                        </label>
                    </section>

                    <section>
                        <input 
                            type='submit' name="submit" value='Sign up' 
                            className="w-full bg-sky-400 p-4 text-slate-100 font-bold text-xl my-4 hover:bg-sky-500 rounded-md cursor-pointer"
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