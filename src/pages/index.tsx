import Link from "next/link";
import Head from "next/head";

const createUrl = process.env.NEXT_PUBLIC_TUNEQUEST_CREATE_URL || "";

export default function Home() {
    return (
        <>
            <Head>
                <title>SimonHits</title>
            </Head>

            <div className="h-screen overflow-scroll bg-black pb-12">
                <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
                            <span className="text-jaro">SimonHits</span>
                        </h1>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                href="/api/login"
                                className="bg-white px-3.5 py-2.5 text-black font-semibold shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Spiel starten
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
