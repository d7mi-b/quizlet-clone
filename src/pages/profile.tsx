import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "~/components/Loading";
import { StudySet } from "~/types";
import { api } from "~/utils/api";
import { UploadDropzone } from "~/utils/uploadthing";
import "@uploadthing/react/styles.css";
import { utapi } from "uploadthing/server";
import { useRouter } from "next/router";

const Profile = () => {
    const router = useRouter();

    const { data: user, isLoading } = api.user.user.useQuery();

    const { mutate: updateUser, isLoading: loadingUpdate, error } = api.user.update.useMutation({
        onSuccess: () => {
            router.reload()
        }
    })

    const [tab, setTab] = useState('Study sets');

    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');

    const handelUpdate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        updateUser({
            email, username, password, avatar
        })
    }

    useEffect(() => {

        if (user) {
            setEmail(user.email);
            setUsername(user.username);
            setAvatar(user.avatar ? user.avatar: "")
        }

        const studySetsTab = document.getElementById('studySetsTab');
        const settingsTab = document.getElementById('settingsTab');

        if (tab === 'Study sets') {
            studySetsTab?.classList.add('text-blue-600', 'border-b', 'border-blue-600')
            settingsTab?.classList.remove('text-blue-600', 'border-b', 'border-blue-600')
        }

        if (tab === 'Settings') {
            settingsTab?.classList.add('text-blue-600', 'border-b', 'border-blue-600')
            studySetsTab?.classList.remove('text-blue-600', 'border-b', 'border-blue-600')
        }

    }, [tab, user])

    if (isLoading)
        return (
            <Loading />
        )

    if (user) {
        return (
            <main className="page">
                <header className="flex py-8 h-36">
                    <section className="w-24 mr-4 h-full">
                        <img src={user.avatar ? user.avatar : ''} alt="avatar" className="rounded-full w-full" />
                    </section>
                    <section className="center-element">
                        <h1 className="font-semibold text-2xl">{user.username}</h1>
                    </section>
                </header>

                <section className="flex text-xl my-4 border-b border-slate-300 text-slate-500">
                    <p 
                        id="studySetsTab"
                        className="mr-4 cursor-pointer px-2 py-3 hover:border-b-2 hover:border-blue-600 hover:text-blue-600"
                        onClick={() => setTab('Study sets')}
                    >
                        Study sets
                    </p>
                    <p 
                        id="settingsTab"
                        className="mr-4 cursor-pointer px-2 py-3 hover:border-b-2 hover:border-blue-600 hover:text-blue-600"
                        onClick={() => setTab('Settings')}
                    >
                        Settings
                    </p>
                </section>

                {
                    tab === 'Study sets' &&
                    <section className="grid grid-cols-4 my-8 gap-4 max-md:grid-cols-1 max-lg:grid-cols-2">
                        {
                            user.studySets &&
                            user.studySets.map((e: StudySet) => {
                                return (
                                    <Link href={`/studySet/${e.id}`} className="bg-slate-50 p-4 shadow-lg rounded-md h-34 hover:border-b-4 hover:border-slate-300" key={e.id}>
                                        <header className="text-lg font-semibold">
                                            <h1>{e.title}</h1>
                                        </header>
                                        <p className="text-sm text-slate-600 font-semibold">{e.terms?.length} terms</p>

                                        <p className="mt-4 font-semibold">{e.userCreated}</p>
                                    </Link>
                                )
                            })
                        }
                    </section>
                }

                {
                    tab === 'Settings' && 
                    <section>
                        <form className="my-4" onSubmit={handelUpdate}>
                            <section className="my-4 text-sm">
                                <label htmlFor="urlAvatar" className="text-slate-400 font-semibold uppercase">Change avatar</label>
                                <UploadDropzone endpoint="imageUploader"
                                    
                                    onClientUploadComplete={async (res) => {
                                        if (avatar !== '/images/Profile avatar.jpg')
                                            await utapi.deleteFiles(avatar);
                                        // Do something with the response
                                        if (res && res[0])
                                            setAvatar(res[0]?.fileUrl)
                                        alert("Upload Completed");
                                    }}
                                    onUploadError={(error: Error) => {
                                        // Do something with the error.
                                        alert(`ERROR! ${error.message}`);
                                    }}
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
                                    placeholder="********" 
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
                                error && <p className="text-red-400 font-semibold text-center">{error.message}</p>
                            }

                            <section>
                                <input 
                                    type='submit' name="submit" value='Save' 
                                    disabled={loadingUpdate}
                                    className="w-full bg-sky-400 p-4 text-slate-100 font-bold text-xl my-4 hover:bg-sky-500 rounded-md cursor-pointer disabled:bg-slate-400"
                                />
                            </section>
                        </form>
                    </section>
                }
            </main>
        )
    }
}

export default Profile;