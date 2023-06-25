import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="w-full h-16 bg-slate-50 flex border-b border-stone-200 pt-1 pb-1 px-8 overflow-hidden sticky">
            <section className="logo w-24">
                <Link href='/'>
                    <img 
                        src="/images/Quizlet-Logo.png" 
                        alt="Quizlet Logo" 
                        className="w-full"
                    />
                </Link>
            </section>

            <section className="list center-element h-full w-72 mx-8">
                <ul className="h-full list-none flex justify-between font-semibold">
                    <li className="h-full">
                        <Link href='/' className="center-element hover-link-navbar active-link">Home</Link>
                    </li>
                    <li>
                        <Link href='/' className="center-element hover-link-navbar">Subjects</Link>
                    </li>
                    <li>
                        <Link href='/' className="center-element hover-link-navbar">Expert solutions</Link>
                    </li>
                </ul>
            </section>

            <section className="search-section center-element w-5/12">
                <form>
                    <section className="flex bg-slate-100 p-2 px-4 rounded-3xl focus-within:outline-2">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4"/>
                        <input 
                            type="search" name="search" 
                            className="w-full bg-transparent px-2 focus-visible:outline-none" 
                            placeholder="Study sets, textbooks, quistions" 
                        />
                    </section>
                </form>
            </section>

            <section className="btn-containers w-80 flex justify-between ml-8 ">
                <section className="center-element">
                    <button className="p-2 w-8 h-8 bg-blue-500 rounded-full text-slate-100 hover:bg-blue-700">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </section>
                <section className="center-element">
                    <button id="btnLogin" className="btn font-semibold hover:bg-slate-100">Log in</button>
                </section>
                <section className="center-element">
                    <button id="btnSignup" className="btn font-semibold bg-yellow-400 hover:bg-yellow-200">Sign up</button>
                </section>
            </section>
        </nav>
    )
}

export default Navbar;