import Link from "next/link";
import { StudySet } from "~/types";

const CreatedStudySet = (props: {studySets: StudySet[] | undefined}) => {
    return (
        <article className="my-14">
            <header className="font-semibold">
                <h1>Created study set</h1>
            </header>

            <section className="grid grid-cols-4 my-4 gap-4 max-md:grid-cols-1 max-lg:grid-cols-2">
                {
                    props.studySets &&
                    props.studySets.map((e: StudySet) => {
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
        </article>
    )
}

export default CreatedStudySet;