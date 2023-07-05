import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Term } from "~/types";

const Learn = (props: { terms: Term[] | undefined }) => {
    const { terms } = props;

    const [card, setCard] = useState<number>(1)

    const [term, setTerm] = useState<Term | undefined>();

    const [choose, setChoose] = useState<string[]>([]);

    const getRandomChooses = (arr: Term[], term: Term): string[] => {

        const definitions: string[] = [];

        if (term.term)
            definitions.push(term.term)

        for (let i = 0; definitions.length < 2; i++) {
            const randomIndex = Math.floor(Math.random() * arr.length);

            // get random item
            const item = arr[randomIndex];

            if (item?.term && item?.term !== term.term)
                definitions.push(item?.term);
        }

        const choose: string[] = [];

        for (let i = 0; choose.length < 2; i++) {
            const randomIndex = Math.floor(Math.random() * definitions.length);

            // get random item
            const item = definitions[randomIndex];

            if(item && item !== choose[0])
                choose.push(item);
        }
        return choose;
    }

    useEffect(() => {
        if (!term && card === 1 && terms && terms.length > 2) {
            setTerm(terms[0])
        }

        if (card)
            setTerm(terms && terms[card - 1]);

        if (terms && term && terms.length > 2)
            setChoose(getRandomChooses(terms, term))
    }, [terms, card, term])

    return (
        <section className="p-2 my-8">
            {
                terms && terms?.length > 2 && 
                <section>
                    {
                        terms?.filter((term, i) => i + 1 === card).map(term => {
                            return (
                                <article className="p-4 bg-slate-50 rounded-md shadow-md" key={term.id}>
                                    <header className="text-lg font-semibold text-slate-400 max-lg:text-sm">
                                        <h1>Definition</h1>
                                    </header>
                                    <section>
                                        <p className="text-2xl font-semibold my-8 max-lg:text-xl">
                                            {term.definition}
                                        </p>
                                    </section>
                                    <section>
                                        <header className="text-lg font-semibold text-slate-400 max-lg:text-sm">
                                            <h1>Choose matching term</h1>
                                        </header>
                                        <section className="p-4 flex justify-evenly max-sm:justify-between">
                                            {
                                                choose.map((e, i) => {
                                                    return (
                                                        <p 
                                                            key={i} onClick={(e: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
                                                                const p = e.target as HTMLParagraphElement;
                                                                if (p.innerText === term?.term) {
                                                                    p.classList.add(`border-green-500`, `text-green-500`)
                                                                } else if (p.innerText !== term?.term) {
                                                                    p.classList.add(`border-red-500`, `text-red-500`)
                                                                }
                                                            }}
                                                            className={`
                                                                answers
                                                                border-2 border-slate-200 p-4 w-64 text-center text-xl rounded-md 
                                                                cursor-pointer select-none font-semibold hover:bg-slate-100
                                                                max-sm:text-sm max-sm:w-18 max-sm:p-2 max-md:mx-1
                                                            `}
                                                        >
                                                            {e}
                                                        </p>
                                                    )
                                                })
                                            }
                                        </section>
                                    </section>
                                </article>
                            )
                        })
                    }

                    <section className="flex justify-center py-2">
                        <section>
                            <button 
                                className="p-2 bg-slate-50 rounded-full mx-4 hover:bg-slate-200"
                                onClick={() => {
                                    setCard(card <= 1 ? 1 : card - 1);
                                }}
                            >
                                <FontAwesomeIcon icon={faArrowLeft} className="w-4" />
                            </button>
                        </section>

                        <section>
                            <button 
                                className="p-2 bg-slate-50 rounded-full mx-4 hover:bg-slate-200"
                                onClick={() => {
                                    setCard(terms?.length && card >= terms?.length ? terms?.length : card + 1);
                                }}
                            >
                                <FontAwesomeIcon icon={faArrowRight} className="w-4" />
                            </button>
                        </section>
                    </section>
                </section>
            }

            {
                terms && terms?.length <= 2 && 
                <section className="bg-slate-50 p-4 text-center font-semibold rounded-md shadow-sm text-red-400">
                    <p>Sorry, there are not enough terms!</p>
                </section>
            }
        </section>
    )
}

export default Learn;