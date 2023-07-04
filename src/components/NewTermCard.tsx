import { UploadButton } from "~/utils/uploadthing";
import "@uploadthing/react/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const NewTermCard = (props: { order: number, card: number }) => {
    const { order } = props;

    const [term, setTerm] = useState<string>('');
    const [definition, setDefinition] = useState<string>('')

    useEffect(() => {
        
    }, [order])

    return (
        <article id={`card-${order}`} key={`card-${order}`} className="card w-full bg-slate-50 rounded-lg shadow-lg my-8">
            <header className="border-b-2 border-slate-100 px-8 py-4 flex justify-between text-slate-400">
                <h1 className="text-md font-bold">{order}</h1>
                <section className="flex">
                    <FontAwesomeIcon 
                        icon={faTrash} 
                        className="w-3 cursor-pointer mr-2"
                        id={`deleteCard-card-${order}`}
                    />
                </section>
            </header>

            <section className="flex gap-4 py-4 px-8 max-md:grid max-lg:grid-cols-1">
                <section className="my-4 w-5/12 max-md:w-full">
                    <input 
                        type="text" name={`term-${order}`}
                        id={`term-${order}`}
                        className={`
                            w-full py-2 border-b-2 border-slate-600 
                            bg-transparent my-2 font-semibold
                            focus-visible:border-yellow-500 focus-visible:outline-none
                        `}
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                    />
                    <label htmlFor={`term-${order}`} className="text-slate-400 text-sm font-bold uppercase">term</label>
                </section>

                <section className="my-4 w-5/12 max-md:w-full">
                    <input 
                        type="text" name={`definition-${order}`}
                        id={`definition-${order}`}
                        className={`
                            w-full py-2 border-b-2 border-slate-600 
                            bg-transparent my-2 font-semibold
                            focus-visible:border-yellow-500 focus-visible:outline-none
                        `}
                        value={definition}
                        onChange={(e) => setDefinition(e.target.value)}
                    />
                    <label htmlFor={`definition-${order}`} className="text-slate-400 text-sm font-bold uppercase">definition</label>
                </section>

                <section className="w-32 h-32 text-sm flex flex-col justify-center mx-auto">
                    <UploadButton endpoint="imageUploader"
                        
                        onClientUploadComplete={(res) => {
                            // Do something with the response
                            console.log("Files: ", res);
                            if (res && document.getElementById(`url-${order}`)) {
                                const url: any = document.getElementById(`url-${order}`)
                                url.value = res[0]?.fileUrl;
                            }
                            alert("Upload Completed");
                        }}
                        onUploadError={(error: Error) => {
                            // Do something with the error.
                            alert(`ERROR! ${error.message}`);
                        }}
                    />
                    <input type="text" name={`url-${order}`}
                        id={`url-${order}`}
                        className={`hidden`}
                    />
                </section>
            </section>
        </article>
    )
}

export default NewTermCard;