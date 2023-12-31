import { useEffect } from "react";
import Login from "~/components/Login";
import Signup from "~/components/Signup";


export default function Home() {

  useEffect(() => {
    const btnLogin = document.getElementById("btnLogin") as HTMLButtonElement;
    const loginPage = document.getElementById("loginPage") as HTMLElement;
    const btnCloseLoginPage = document.getElementById("btnCloseLoginPage") as HTMLElement;

    btnLogin?.addEventListener('click', () => {
      loginPage.style.display = 'flex';
    })

    btnCloseLoginPage?.addEventListener('click', () => {
      loginPage.style.display = 'none';
    })

    const btnSignup = document.getElementById("btnSignup") as HTMLButtonElement;
    const signupPage = document.getElementById("signupPage")as HTMLElement ;
    const btnCloseSignupPage = document.getElementById("btnCloseSignupPage") as HTMLElement;

    btnSignup?.addEventListener('click', () => {
      signupPage.style.display = 'flex';
    })

    btnCloseSignupPage?.addEventListener('click', () => {
      signupPage.style.display = 'none';
    })

    const btnSignupHeroSec = document.getElementById('btnSignupHeroSec') as HTMLElement;

    btnSignupHeroSec?.addEventListener('click', () => {
      signupPage.style.display = 'flex';
    })

    const btnSignupFromLoginPage = document.getElementById('btnSignupFromLoginPage') as HTMLElement;

    btnSignupFromLoginPage?.addEventListener('click', () => {
      signupPage.style.display = 'flex';
      loginPage.style.display = 'none';
    })

    const btnCreateAccount = document.getElementById('btnCreateAccount') as HTMLElement;

    btnCreateAccount?.addEventListener('click', () => {
      signupPage.style.display = 'flex';
      loginPage.style.display = 'none';
    })

    const btnLoginFromSignupPage = document.getElementById('btnLoginFromSignupPage') as HTMLElement;

    btnLoginFromSignupPage?.addEventListener('click', () => {
      signupPage.style.display = 'none';
      loginPage.style.display = 'flex';
    })

    const btnHaveAccount = document.getElementById('btnHaveAccount') as HTMLElement;

    btnHaveAccount?.addEventListener('click', () => {
      signupPage.style.display = 'none';
      loginPage.style.display = 'flex';
    })
    
  }, [])

  return (
    <>
      <main className="w-full min-h-screen">

        {/* Hero section */}
        <article className="bg-hero-section min-h-screen flex flex-col justify-center px-8">
          <header 
            className={`
              text-slate-100 w-2/5 relative left-28 
              max-lg:w-full max-lg:left-0 max max-lg:text-center
            `}
          >
            <h1 className="font-bold text-4xl leading-relaxed">The best digital flashcards and study tools</h1>
            <p className="text-lg my-8">
              Join over 60 million students using Quizlet’s science-backed flashcards, practice tests and expert solutions to improve their grades and reach their goals.
            </p>
            <button id="btnSignupHeroSec" className="bg-indigo-500 px-4 py-2 rounded-md hover:bg-indigo-700">Sign up for free</button>
          </header>
        </article>

        <Login />

        <Signup />
      </main>
    </>
  );
}
