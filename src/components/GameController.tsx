import React, {useEffect, useState} from "react";
import { usePlayerDevice, useSpotifyPlayer } from "react-spotify-web-playback-sdk";
import QRCodeScanner from "./QRCodeScanner";
import Link from "next/link";
import { PlayButton } from "./PlayButton";
import { ForwardButton } from "./ForwardButton";
import { RewindButton } from "./RewindButton";
import ProgressBar from "./ProgressBar";
import NoSleep from 'nosleep.js';

type Props = {
    token: string;
};

const hitsterMapping = {
    'de': {
        '00300': 'spotify:track:5IMtdHjJ1OtkxbGe4zfUxQ',
    }
}

export default function GameController({token}: Props) {
    const player = useSpotifyPlayer();
    const device = usePlayerDevice();
    const [showScanner, setShowScanner] = useState<boolean>(true);


    useEffect(() => {
        if(!showScanner){
            const noSleep = new NoSleep();
            noSleep.enable();
        }
    }, [showScanner]);
    const handleQrResult = (trackId: string) => {
        setShowScanner(false);
        if (device === null) return;

        fetch(
            `https://api.spotify.com/v1/me/player/play?device_id=${device?.device_id}`,
            {
                method: "PUT",
                body: JSON.stringify({uris: [`spotify:track:${trackId}`]}),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            },
        );
    }


    const goToNext = () => {
        player?.pause();
        setShowScanner(true);
    }

    if (device === null) return null;
    if (player === null) return null;

    return (
        <div
            className="relative flex flex-col justify-around w-full min-h-screen bg-gradient-to-t bg-black">
            {showScanner && (
                <>
                    <h1 className="fixed top-0 left-1/2 transform -translate-x-1/2 z-10 text-3xl font-bold tracking-tight text-black xs:text-4xl sm:text-5xl lg:text-6xl mt-8 uppercase text-center drop-shadow-lg">
                        QR-Code scannen
                    </h1>

                    <QRCodeScanner handleSpotifyTrackId={handleQrResult}/>

                    <div className="fixed flex w-full mb-4 bottom-0 left-1/2 transform -translate-x-1/2 z-20 px-4">
                        <Link
                            href="/public"
                            className="text-center w-full rounded-md bg-white bg-opacity-70 px-3.5 py-2.5 text-sm font-bold text-slate-900 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-opacity-10"
                        >
                            Zurück
                        </Link>
                    </div>
                </>
            )}
            {!showScanner && (<>
                <div className="flex flex-col w-full sm:w-2/5 py-24 px-4 mx-auto">
                    <h1 className="w-full text-center text-4xl font-bold tracking-tight sm:text-5xl mb-12">
                        <span className="text-white">SimonHits</span>
                    </h1>
                    <div className="mb-8">
                        <ProgressBar/>
                    </div>
                    <div className="flex justify-around gap-x-6">
                        <RewindButton player={player} amount={10}/>
                        <PlayButton player={player}/>
                        <ForwardButton player={player} amount={10}/>

                    </div>
                    <div className="mt-16 flex w-full">
                        <button
                            className="w-full rounded-md bg-white bg-opacity-30 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-opacity-60"
                            onClick={() => goToNext()}
                        >
                            Nächster Song
                        </button>
                    </div>
                </div>
            </>)}
        </div>
    );
}