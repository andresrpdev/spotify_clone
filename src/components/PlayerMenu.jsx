import { useRef, useEffect } from "react";
import { useMusicStore } from "../stores/musicStore";
import {Slider} from "./Slider"
import PlayerControl from "./PlayerControl";

const PlayerLeft = ({ imageURL, artists, title }) => {
    return (
        <>
            <picture>
                <img className="ml-2 max-w-16 h-auto" src={imageURL} alt="Cover" />
            </picture>
            <div className="text-white">
                <h1 className="text-lg font-semibold">{title}</h1>
                <p className="text-sm text-zinc-400">{artists}</p>
            </div>
        </>
    );
};

const PlayerMenu = () => {
    const { isPlaying, setIsPlaying, currentMusic, setCurrentMusic } = useMusicStore(state => state);
    const audioRef = useRef();

    useEffect(() => {
        const { song, playlist } = currentMusic;
        if (song) {
            const url = `/music/${playlist.id}/0${song.id}.mp3`;
            audioRef.current.src = url;
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [currentMusic]);

    useEffect(() => {
        isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }, [isPlaying]);

    return (
        <div className="player-menu flex items-center justify-between w-full h-full px-2">
            <div id="left" className="flex items-center space-x-4 w-52">
                <PlayerLeft imageURL={currentMusic.song?.image} artists={currentMusic.song?.artists} title={currentMusic.song?.title} />
            </div>

            <div id="mid" className="flex items-center align-center flex-grow max-w-48 text-gray-400">
                <PlayerControl />
            </div>

            <div id="right" className="flex items-center space-x-3">
                <Slider
                    className="w-[95px]"
                />
            </div>
            <audio ref={audioRef} />
        </div>
    );
};

export default PlayerMenu;