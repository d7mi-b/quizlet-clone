import Head from "next/head";
import { NextPage } from "next";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import NewTermCard from "~/components/NewTermCard";

const CreateStudySet: NextPage = () => {
    const router = useRouter()

    const { mutate: createStudyset, isLoading: loadingCreate} = api.studySet.create.useMutation({
        onSuccess: async (data) => {
            await router.replace(`/studySet/${data.id}`)
        }
    }) 

    const [cards, setCards] = useState<JSX.Element[]>(() => {
        const cards: JSX.Element[] = [];
        for (let i = 0; i < 3; i++) {
            cards.push(<NewTermCard order={i + 1} card={i + 1} />)
        }

        return cards;
    });
    const [card, setCard] = useState<HTMLElement | null>(null);

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;

        const terms = []
        
        for (let i = 0; i < cards.length; i++) {
            const term = form[`term-${i + 1}`] as HTMLInputElement;
            const definition = form[`definition-${i + 1}`] as HTMLInputElement;
            const image = form[`url-${i + 1}`] as HTMLInputElement;

            if (term.value)
                terms.push({
                    term: term.value, definition: definition.value, order: i + 1, image: image.value
                })
        }

        if (terms.length >= 2) {
            createStudyset({
                title, description, terms
            })
        }
    }

    useEffect(() => {
        if (card) {
            const deleteCard = document.getElementById(`deleteCard-${card?.id}`);
            deleteCard?.addEventListener('click', () => {
                setCards(() => {
                    return cards.filter((c: JSX.Element) => {
                        const cardId = card?.id.split('-')[1] as string;
                        const props = c.props as { order: number, card: number };
                        if (cardId)
                            return props.card !== +cardId
                    })
                });

                setTimeout(() => {
                    card?.remove()
                }, 1000)
                setCard(null)
            })
        }
    }, [card, cards])

    return (
        <>
            <Head>
                <title>Create Study Set</title>
            </Head>

            <main className="page">
                <header className="text-xl font-bold py-8 flex justify-between ">
                    <h1>Create a new study set</h1>
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
                                placeholder='Add description'
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
                                cards.map((c: JSX.Element, i: number) => {
                                    return (
                                        <div 
                                            id={`card-${i + 1}`} key={i} 
                                            onMouseEnter={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                                                const element = e.target as HTMLElement;
                                                if(element.parentElement)
                                                    setCard(element.parentElement?.parentElement)
                                            }}
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
                                className="w-full bg-slate-50 py-8 text-slate-700 font-bold uppercase rounded-md hover:text-yellow-500"
                                onClick={() => setCards([...cards, <NewTermCard order={cards.length + 1} card={cards.length + 1} key={cards.length + 1} />])}

                            >
                                <section className="w-28 h-full mx-auto flex justify-center border-b-4 border-sky-500 py-2 hover:border-yellow-500">
                                    <FontAwesomeIcon icon={faPlus} className="w-4 mr-2" />
                                    <p>Add Card</p>
                                </section>
                            </section>
                        </section>

                        <section className="my-8 flex justify-end">
                            <input 
                                type='submit' value='Create' 
                                disabled={loadingCreate}
                                className="bg-blue-600 px-8 py-4 rounded-md text-slate-50 font-semibold cursor-pointer hover:bg-blue-400 disabled:bg-slate-400" 
                            />
                        </section>
                    </form>

                </section>
            </main>
        </>
    )
}

export default CreateStudySet;