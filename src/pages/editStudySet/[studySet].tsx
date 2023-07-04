import Head from "next/head";
import { NextPage } from "next";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { api } from "~/utils/api";
import { useRouter } from 'next/router';
import "@uploadthing/react/styles.css";
import Loading from "~/components/Loading";
import TermCard from "~/components/TermCard";
import NewTermCard from "~/components/NewTermCard";

const CreateStudySet: NextPage = () => {
    const router = useRouter();

    const studySetID: string | string[] = router.query.studySet ? router.query.studySet : '';

    const { data, isLoading, error } = api.studySet.getOne.useQuery({
        id: typeof studySetID === 'string' ? studySetID : ' '
    });

    const { mutate: editStudySet, isLoading: loadingEdit } = api.studySet.edit.useMutation({
        onSuccess: () => {
            router.back()
        }
    });

    const [cards, setCards] = useState<any>([]);
    const [card, setCard] = useState<any>(null);

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const terms = []
        
        for (let i = 0; i < cards.length; i++) {
            const term = e.target[`term-${i + 1}`].value;
            const definition = e.target[`definition-${i + 1}`].value;
            const image = e.target[`url-${i + 1}`].value;

            if (term && data?.terms)
                terms.push({
                    id: data?.terms[i]?.id || 'new term',
                    term: term || '', 
                    definition: definition || '', 
                    order: data?.terms[i]?.order || i + 1,
                    image: image
                })
        }

        if (terms.length >= 2) {
            editStudySet({
                id: data?.id ? data?.id : '', title, description, terms: terms
            })
        }
    }

    useEffect(() => {
        if (data) {
            setTitle(data.title)
            setDescription(data?.description ? data?.description: '' )
            if (data.terms && cards.length === 0) {
                setCards(() => {
                    if (data.terms) {
                        return data?.terms.map((t, i) => <TermCard term={t} card={i} />)
                    }
                })
            }
        }

        if (card) {
            const deleteCard = document.getElementById(`deleteCard-${card?.id}`);
            deleteCard?.addEventListener('click', () => {
                setCards(() => {
                    return cards.filter((c: any) => c.props.card !== +card?.id.split('-')[1])
                });

                console.log(cards)
                setTimeout(() => {
                    card?.remove()
                }, 1000)
                setCard(null)
            })
        }

    }, [data, card])

    if (isLoading)
        return (
            <Loading />
        )

    if (data) {
        return (
            <>
                <Head>
                    <title>Edit | {data?.title} </title>
                </Head>

                <main className="page">
                    <header className="text-md font-semibold py-8 flex justify-between ">
                        <button onClick={() => router.back()} className="hover:text-yellow-500">
                            <span className="mr-2 text-sky-500 font-bold text-lg">&lt;</span>
                            Back to set
                        </button>
                    </header>

                    <section className="mt-14">
                        <form id="study-set-form" onSubmit={handelSubmit}>
                            <section className="my-4 wide-width">
                                <input 
                                    type="text" name="title" 
                                    required placeholder='Enter a title, like "Biology - Chapter 22: Evolution" '
                                    className={`
                                        w-full py-2 border-b-2 border-slate-600 
                                        bg-transparent my-2 font-semibold
                                        focus-visible:border-yellow-500 focus-visible:outline-none
                                    `}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <label htmlFor="title" className="text-slate-400 text-sm font-bold uppercase">title</label>
                            </section>

                            <section className="my-4 wide-width">
                                <input 
                                    type="text" name="description" 
                                    required placeholder='Add description'
                                    className={`
                                        w-full py-2 border-b-2 border-slate-600 
                                        bg-transparent my-2 font-semibold
                                        focus-visible:border-yellow-500 focus-visible:outline-none
                                    `}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <label htmlFor="description" className="text-slate-400 text-sm font-bold uppercase">description</label>
                            </section>

                            <section id="term-card-container" className="my-10">
                                {
                                    cards.map((c: any, i: number) => {
                                        return (
                                            <div 
                                                id={`card-${i + 1}`} key={i} 
                                                onMouseEnter={(e: any) => setCard(e.target.parentElement.parentElement)}
                                                onMouseLeave={() => setCard(null)}
                                            >
                                                {c}
                                            </div>  
                                        )
                                    })
                                }
                            </section>

                            <section className="my-8">
                                <section 
                                    id="btnAddCard" 
                                    className="w-full cursor-pointer bg-slate-50 py-8 text-slate-700 font-bold uppercase rounded-md hover:text-yellow-500"
                                    onClick={() => setCards([...cards, <NewTermCard order={cards.length + 1} card={cards.length + 1} />])}
                                >
                                    <section className="cursor-pointer w-28 h-full mx-auto flex justify-center border-b-4 border-sky-500 py-2 hover:border-yellow-500">
                                        <FontAwesomeIcon icon={faPlus} className="w-4 mr-2 cursor-pointer" />
                                        <p className="cursor-pointer">Add Card</p>
                                    </section>
                                </section>
                            </section>

                            <section className="my-8 flex justify-end">
                                <input 
                                    type='submit' value='Done' 
                                    disabled={loadingEdit}
                                    className="bg-blue-600 px-8 py-4 rounded-md text-slate-50 font-semibold cursor-pointer hover:bg-blue-400 disabled:bg-slate-400" 
                                />
                            </section>
                        </form>
                    </section>
                </main>
            </>
        )
    }
}

export default CreateStudySet;