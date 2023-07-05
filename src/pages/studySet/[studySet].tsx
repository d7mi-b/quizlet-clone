import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Term } from '@prisma/client';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Loading from '~/components/Loading';
import { api } from '~/utils/api';
import Flashcards from '~/components/Flashcards';
import Learn from '~/components/Learn';

const StudySetPage = () => {
    const router = useRouter();

    const studySetID: string | string[] = router.query.studySet ? router.query.studySet : '';

    const { data, isLoading } = api.studySet.getOne.useQuery({
        id: typeof studySetID === 'string' ? studySetID : ' '
    });

    const { mutate: deleteStudySet } = api.studySet.delete.useMutation({
        onSuccess: async () => {
            await router.replace('/home');
        }
    });

    const { data: checkStudy } = api.user.checkStudy.useQuery({ 
        studySetID: typeof studySetID === 'string' ? studySetID : "" 
    })

    const { mutate: study, isLoading: loadingStudy } = api.user.study.useMutation({
        onSuccess: () => {
            const btnStudy = document.getElementById('btnstudy');
            if (btnStudy)
                btnStudy.style.display = 'noun';
        }
    });

    const [test, setTest] = useState<string>('Flashcards');

    if (isLoading)
        return (
            <Loading />
        )

    if (data) {
        return (
            <>
                <Head>
                    <title>Study set {data?.title}</title>
                </Head>
                
                <main className='page'>
                    <header className='my-8 font-bold text-4xl flex justify-between max-md:text-2xl'>
                        <h1>{data?.title}</h1>
                        <section className='text-sm text-slate-50 font-semibold'>
                            {
                                !checkStudy &&
                                <button 
                                    id='btnstudy'
                                    className='bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-300 disabled:bg-slate-300'
                                    onClick={() => study({ studySetID: typeof studySetID === 'string' ? studySetID : "" })}
                                    disabled={loadingStudy}
                                >
                                    Study
                                </button>
                            }
                        </section>
                    </header>

                    <section className='flex my-8 max-lg:justify-center'>
                        <section>
                            <button 
                                className={`
                                    px-4 py-3 bg-slate-50 text-xl font-semibold rounded-md shadow w-56 mr-4
                                    hover:bg-slate-200
                                    max-md:w-32 max-md:text-sm
                                    max-lg:w-36 max-md:text-lg
                                    max-lg:mx-2
                                `}
                                onClick={() => setTest('Flashcards')}
                            >
                                Flashcards
                            </button>
                        </section>

                        <section>
                            <button 
                                className={`
                                    px-4 py-3 bg-slate-50 text-xl font-semibold rounded-md shadow w-56 mr-4
                                    hover:bg-slate-200
                                    max-md:w-32 max-md:text-sm
                                    max-lg:w-36 max-md:text-lg
                                    max-lg:mx-2
                                `}
                                onClick={() => setTest('Learn')}
                            >
                                Learn
                            </button>
                        </section>
                    </section>

                    {
                        test === 'Flashcards' && <Flashcards terms={data?.terms} />
                    }

                    {
                        test === 'Learn' && <Learn terms={data?.terms} />
                    }

                    <section className='flex justify-between'>
                        <section className='center-element'>
                            <p className='text-slate-400 text-sm'>Creater by</p>
                            <p className='font-semibold'>{data?.userCreated}</p>
                        </section>

                        <section className='text-slate-400 flex' title='Delete Study set '>
                            <Link href={`/editStudySet/${data?.id}`} className='center-element'>
                                <FontAwesomeIcon icon={faEdit}  className='w-8 h-8 cursor-pointer bg-slate-50 p-2 border border-slate-300 rounded-md ml-2 hover:text-sky-600'/>
                            </Link>
                            <button onClick={() => deleteStudySet({ id: data?.id ? data?.id : ''})}>
                                <FontAwesomeIcon icon={faTrash}  className='w-8 h-8 cursor-pointer bg-slate-50 p-2 border border-slate-300 rounded-md ml-2 hover:text-red-600'/>
                            </button>
                        </section>
                    </section>

                    <article>
                        <header className='my-4 font-semibold text-xl'>
                            <h1>Terms in this set ({data?.terms?.length})</h1>
                        </header>

                        <section className='my-8'>
                            {
                                data?.terms?.map((t: Term) => {
                                    return (
                                        <section 
                                            key={t.id} 
                                            className='px-4 py-4 bg-slate-50 my-4 shadow grid grid-cols-5 max-md:grid-cols-1'
                                        >
                                            <dfn 
                                                className={`
                                                    border-r border-slate-200 mr-4 not-italic col-span-2 max-md:border-b
                                                    max-md:border-r-0 max-md:w-full max-md:my-4 max-md:py-2 max-md:text-center
                                                `}
                                            >
                                                {t.term}
                                            </dfn>
                                            <p className='col-span-2 max-lg:w-full max-md:py-2 max-md:text-center'>{t?.definition}</p>
                                            {
                                                t.image &&
                                                <section className='text-center my-4 mx-auto'>
                                                    <img src={t.image ? t.image : ''} alt={t.term} className='rounded-sm'/>
                                                </section>
                                            }
                                        </section>
                                    )
                                })
                            }
                        </section>

                        {
                            checkStudy && 
                            <section className='btn-container text-center my-14'>
                                <Link href={`/editStudySet/${data?.id}`} className='bg-blue-600 p-4 font-semibold text-slate-50 rounded-md hover:bg-blue-300'>Add or Remove Terms</Link>
                            </section>
                        }
                    </article>
                </main>
            </>
        )
    }
}

export default StudySetPage;