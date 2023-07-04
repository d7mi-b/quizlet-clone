import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Term } from "~/types";

const Flashcards = (props: { terms: Term[] | undefined }) => {
    const { terms } = props;

    const [card, setCard] = useState<number>(1)

    useEffect(() => {

    }, [terms])

    return (
        <section className="p-2 my-8">
            {
                terms?.filter((term, i) => i + 1 === card).map(term => {
                    return (
                        <p 
                            key={term.id}
                            className={`
                                h-64 bg-slate-50 flex flex-col justify-center text-center my-2
                                text-4xl font-semibold cursor-pointer rounded-md shadow-md select-none
                                max-lg:text-2xl
                            `}
                            onClick={(e: any) => {
                                if (e.target.innerText === term.term)
                                    e.target.innerText = term.definition
                                else if (e.target.innerText === term.definition)
                                    e.target.innerText = term.term
                            }}
                        >
                            {term.term}
                        </p>
                    )
                })
            }

            <section className="flex justify-center py-2">
                <section>
                    <button 
                        className="p-3 bg-slate-50 rounded-full mx-4 hover:bg-slate-200"
                        onClick={() => setCard(card <= 1 ? 1 : card - 1)}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="w-7" />
                    </button>
                </section>

                <section>
                    <button 
                        className="p-3 bg-slate-50 rounded-full mx-4 hover:bg-slate-200"
                        onClick={() => setCard(terms?.length && card >= terms?.length ? terms?.length : card + 1)}
                    >
                        <FontAwesomeIcon icon={faArrowRight} className="w-7" />
                    </button>
                </section>
            </section>
        </section>
    )
}

export default Flashcards;