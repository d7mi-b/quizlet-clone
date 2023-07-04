import { UploadButton } from "~/utils/uploadthing";
import "@uploadthing/react/styles.css";
import { Term } from "~/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";

const TermCard = (props: { term: Term, card: number }) => {
    const { term } = props;

    const { data: studySets } = api.studySet.get.useQuery();

    const { mutate: moveTerm, isLoading: loadingMoveTerm } = api.term.edit.useMutation();
    const { mutate: deleteTerm } = api.term.delete.useMutation();

    const [studySet, setStudySet] = useState<string>('');

    useEffect(() => {
        if (term)
            setStudySet(term.studySetID);
    }, [term])

    return (
        <article id={term.id} key={term.id} className="card w-full bg-slate-50 rounded-lg shadow-lg my-8">
            <header className="border-b-2 border-slate-100 px-8 py-4 flex justify-between text-slate-400">
                <h1 className="text-md font-bold">{term.order}</h1>
                <section className="flex">
                    <section className="editTerm center-element">
                        <FontAwesomeIcon 
                            icon={faEdit} 
                            className="w-4 cursor-pointer mr-4"
                        />
                        <section className="editTermDropDown">
                            <header className="text-slate-600 font-semibold text-center">
                                <h1>Move the term to different study set</h1>
                            </header>

                            <section>
                                <select 
                                    value={studySet} onChange={e => setStudySet(e.target.value)}
                                    className="w-full py-2 px-4 my-4 rounded-md"
                                >
                                    {
                                        studySet &&
                                        studySets?.map(s => {
                                            return (
                                                <option value={s.id} key={s.id}>{s.title}</option>
                                            )
                                        })
                                    }
                                </select>
                                <section className="text-center">
                                    <button
                                        onClick={() => moveTerm({ id: term.id, studySetID: studySet })} 
                                        disabled={loadingMoveTerm}
                                        className="font-semibold p-3 bg-blue-600 text-slate-50 rounded-md hover:bg-blue-300 disabled:bg-slate-400"
                                    >
                                        Move the term
                                    </button>
                                </section>
                            </section>
                        </section>
                    </section>
                    <FontAwesomeIcon 
                        icon={faTrash} 
                        className="w-3 cursor-pointer mr-2"
                        id={`deleteCard-card-${term.order}`}
                        onClick={() => {
                            deleteTerm({ id: term.id })
                        }}
                    />
                </section>
            </header>

            <section className="flex gap-4 py-4 px-8 max-md:grid max-lg:grid-cols-1">
                <section className="my-4 w-5/12 max-md:w-full">
                    <input 
                        type="text" name={`term-${term.order}`}
                        id={`term-${term.order}`}
                        className={`
                            w-full py-2 border-b-2 border-slate-600 
                            bg-transparent my-2 font-semibold
                            focus-visible:border-yellow-500 focus-visible:outline-none
                        `}
                        defaultValue={term.term}
                    />
                    <label htmlFor={`term-${term.order}`} className="text-slate-400 text-sm font-bold uppercase">term</label>
                </section>

                <section className="my-4 w-5/12 max-md:w-full">
                    <input 
                        type="text" name={`definition-${term.order + 1}`}
                        id={`definition-${term.order}`}
                        className={`
                            w-full py-2 border-b-2 border-slate-600 
                            bg-transparent my-2 font-semibold
                            focus-visible:border-yellow-500 focus-visible:outline-none
                        `}
                        defaultValue={term.definition ? term.definition : ""}
                    />
                    <label htmlFor={`definition-${term.order}`} className="text-slate-400 text-sm font-bold uppercase">definition</label>
                </section>

                <section className="w-32 h-32 text-sm flex flex-col justify-center mx-auto">
                    <UploadButton endpoint="imageUploader"
                        
                        onClientUploadComplete={(res) => {
                            // Do something with the response
                            console.log("Files: ", res);
                            if (res && document.getElementById(`url-${term.order}`)) {
                                const url: any = document.getElementById(`url-${term.order}`)
                                url.value = res[0]?.fileUrl;
                            }
                            alert("Upload Completed");
                        }}
                        onUploadError={(error: Error) => {
                            // Do something with the error.
                            alert(`ERROR! ${error.message}`);
                        }}
                    />
                    <input type="text" name={`url-${term.order}`}
                        id={`url-${term.order}`}
                        className={`hidden`}
                    />
                </section>
            </section>
        </article>
    )
}

export default TermCard;