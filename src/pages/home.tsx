import { NextPage } from "next";
import Head from "next/head";
import CreatedStudySet from "~/components/CreatedStudySet";
import Loading from "~/components/Loading";
import RecentStudySet from "~/components/RecentStudySet";
import { api } from "~/utils/api";


const HomeUser: NextPage = () => {
    const { data: created, isLoading: createdLoading } = api.studySet.get.useQuery(); 
    const { data: recent, isLoading: reactLoading } = api.user.studing.useQuery();

    if (createdLoading && reactLoading)
        return (
            <Loading />
        )

    if (recent || created) {
        return (
            <>
                <Head>
                    <title>Quizlet Clone | Home</title>
                </Head>

                <main className="page">

                    {
                        recent?.studySets && recent?.studySets.length > 0 && <RecentStudySet studySets={recent?.studySets} />
                    }

                    {
                        created && created.length > 0 && <CreatedStudySet studySets={created} />
                    }

                    {
                        recent?.studySets && recent?.studySets.length === 0 && created && created.length === 0 &&
                        <section className="h-screen flex flex-col justify-center text-center">
                            <h1 className="font-semibold text-3xl text-slate-400">
                                Start study set or join to one
                            </h1>
                        </section>
                    }

                </main>
            </>
        );
    }
}

export default HomeUser