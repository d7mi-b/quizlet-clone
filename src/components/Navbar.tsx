import { faFile, faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "~/hooks/useAuth";
import { useLogout } from "~/hooks/useLogout";
import { api } from "~/utils/api";

const Navbar = () => {
    const { user } = useAuth();
    const { logout } = useLogout();

    const [title, setTitle] = useState<string>('');
    const [searchSection, setSearchSection] = useState<boolean>(false);

    const { mutate: search, data: studySet, error } = api.studySet.search.useMutation();

    useEffect(() => {
        const btnCreate = document.getElementById('btnCreate');
        const createList = document.getElementById('create-List');

        btnCreate?.addEventListener('click', () => {
            if (createList)
                createList.style.display = 'block'
        })

        createList?.addEventListener('mouseleave', () => {
            if (createList)
                createList.style.display = 'none'
        });

        if (title) {
            search({ title })
        }

        // console.log(user.avatar)

    }, [title])
    
    return (
        <nav 
            className={`
                w-full h-16 bg-slate-50 flex justify-between border-b border-stone-200 pt-1 pb-1 px-8  sticky 
                max-md:px-1
            `}
        >
            <section className="logo w-24 center-element sm:w-32 max-sm:w-36 max-md:w-14 max-lg:w-64 max-lg:mx-2">
                <Link href='/'>
                    <img 
                        src="/images/Quizlet-Logo.png" 
                        alt="Quizlet Logo" 
                        className="w-full"
                    />
                </Link>
            </section>

            {
                user && 
                <section 
                    className={`
                        "list center-element h-full w-48 mx-8 
                        max-md:hidden
                        max-xl:w-96
                    `}
                >
                    <ul className="h-full list-none flex justify-between font-semibold">
                        <li className="h-full">
                            <Link href='/home' className="center-element hover-link-navbar active-link">Home</Link>
                        </li>
                        <li>
                            <Link href='/create-study-set' className="center-element hover-link-navbar">Create study set</Link>
                        </li>
                    </ul>
                </section>
            }

            {
                user && 
                <section className="search-section center-element w-7/12 relative">
                    <form>
                        <section className="flex bg-slate-100 p-2 px-4 rounded-3xl focus-within:outline-2">
                            <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4"/>
                            <input 
                                type="search" name="search" 
                                className="w-full bg-transparent px-2 focus-visible:outline-none" 
                                placeholder="Study sets, textbooks, quistions"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                onFocus={() => setSearchSection(true)}
                                onBlur={() => setTimeout(() => setSearchSection(false), 1000)}
                            />
                        </section>
                    </form>
                    {
                        searchSection && title && 
                        <section className="absolute top-16 bg-slate-50 rounded-md w-full" onMouseOver={() => setSearchSection(true)} onMouseLeave={() => setSearchSection(false)}>
                            {
                                studySet?.map(set => {
                                    return (
                                        <Link href={`/studySet/${set.id}`} key={set.id} className="flex text-lg p-4 hover:text-sky-400 ">
                                            <FontAwesomeIcon icon={faMagnifyingGlass} className="w-5 mx-2"/>
                                            <p className="font-semibold">{set.title}</p>
                                        </Link>
                                    )
                                })
                            }
                        </section>
                    }
                    {
                        searchSection && studySet?.length === 0 && title &&
                        <section className="absolute top-16 bg-slate-50 rounded-md w-full">
                            <p className="text-lg p-4 text-center font-semibold">Not found</p>
                        </section>
                    }
                </section>
            }

            <section className="btn-containers w-76 flex justify-between ml-8 relative">
                {
                    user && 
                    <section className="createBtn center-element" title="Create">
                        <button id="btnCreate" className="p-2 w-8 h-8 bg-blue-500 rounded-full text-slate-100 hover:bg-blue-700">
                            <FontAwesomeIcon icon={faPlus} />
                        </button>

                        <section id="create-List" className="hidden absolute top-14 bg-slate-50 py-1 rounded-lg shadow max-md:right-0 max-md:w-48">
                            <ul>
                                <li>
                                    <Link href='/create-study-set' className="flex text-slate-500 hover:bg-slate-200  p-4">
                                        <FontAwesomeIcon icon={faFile} className="w-3 mx-2" />
                                        <span className="font-semibold text-xl mx-2">Study set</span>
                                    </Link>
                                </li>
                            </ul>
                        </section>
                    </section>
                }
                {
                    !user?.token &&
                    <section className="center-element">
                        <button id="btnLogin" className="btn font-semibold hover:bg-slate-100">Log in</button>
                    </section>
                }
                {
                    !user?.token && 
                    <section className="center-element">
                        <button id="btnSignup" className="btn font-semibold bg-yellow-400 hover:bg-yellow-200">Sign up</button>
                    </section>
                }
                {
                    user && user.avatar && 
                    <section className="w-8 rounded-full center-element mx-2">
                        <Link href='/profile'>
                            <img src={user.avatar} alt="avatar" className="rounded-full" />
                        </Link>
                    </section>
                }
                {
                    user && user.token &&
                    <section className="center-element">
                        <button 
                            id="btnLogout" className="btn font-semibold hover:bg-slate-100"
                            onClick={() => logout()}
                        >
                            Log out
                        </button>
                    </section>
                }
            </section>
        </nav>
    )
}

export default Navbar;