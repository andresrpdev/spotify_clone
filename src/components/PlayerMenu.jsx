import { useState, useRef, useEffect } from "react";
import { useMusicStore } from "../stores/musicStore";
import {Slider} from "./Slider"
import PlayerControl from "./PlayerControl";
import { VolumeSilenced, VolumeLow, VolumeMedium, VolumeFull } from "../icons/VolumeIcons";


const VolumeIcon = ({ audio }) => {
    const currentVol = audio?.current?.volume ?? 1;
    if (currentVol === 0) {
        return <VolumeSilenced />;
    } else if (currentVol <= 0.33) {
        return <VolumeLow />;
    } else if (currentVol <= 0.66) {
        return <VolumeMedium />;
    } else {
        return <VolumeFull />;
    }
}

const PlayerLeft = ({ imageURL, artists, title }) => {
    return (
        <>
            <picture>
               {imageURL ? <img className="ml-2 max-w-16 h-auto" src={imageURL} alt="Cover" /> : null}
            </picture>
            <div className="text-white">
                <h1 className="text-lg font-semibold">{title}</h1>
                <p className="text-sm text-zinc-400">{artists}</p>
            </div>
        </>
    );
};


const SongSlider = ({ audio }) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [showRemaining, setShowRemaining] = useState(false);

    useEffect(() => {
        audio.current.addEventListener('timeupdate', handleTimeUpdate);
        return () => audio.current.removeEventListener('timeupdate', handleTimeUpdate);
    }, []);

    const handleTimeUpdate = () => {
        setCurrentTime(audio.current.currentTime);
    };

    const formatTime = (time) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const duration = audio?.current?.duration ?? 0;

    const toggleDuration = () => {
        setShowRemaining(!showRemaining);
    };

    return (
        <div className="flex space-x-4 items-center justify-center w-[500px]">
            <span className="w-12 text-center">{formatTime(currentTime)}</span>
            <Slider
                className="flex-grow"
                min={0}
                max={duration}
                defaultValue={[0]}
                value={[currentTime]}
                onValueChange={value => {
                    audio.current.currentTime = value[0];
                }}
            />
            <span className="w-12 text-center cursor-default" onClick={toggleDuration}>{showRemaining ? formatTime(duration - currentTime) : formatTime(duration)}</span>
        </div>
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

    const nextSong = () => {
        const currentIndex = currentMusic.songs.indexOf(currentMusic.song);
        const nextIndex = currentIndex + 1;

        if (nextIndex >= currentMusic.songs.length) {
            return;  // Ya está en la última canción
        }

        setCurrentMusic({ ...currentMusic, song: currentMusic.songs[nextIndex] });
    };
    useEffect(() => {
        const handleEnded = () => {
            nextSong(); // Función para pasar a la siguiente canción
        };

        const audio = audioRef.current;
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("ended", handleEnded);
        };
    }, [nextSong]);

   

    
    

    return (
        <div className="player-menu flex items-center justify-between w-full h-full px-4">
            <div id="left" className="flex items-center space-x-4 w-52">
                <PlayerLeft imageURL={currentMusic.song?.image} artists={currentMusic.song?.artists} title={currentMusic.song?.title} />
            </div>

            <div id="mid" className="flex items-center align-center flex-grow max-w-48 text-gray-400 flex-col ">
                <PlayerControl />
                <SongSlider audio = {audioRef}/>
            </div>

            <div id="right" className="flex items-center justify-center space-x-2">
                <div className="text-zinc-500">
                    <VolumeIcon audio={audioRef} />
                </div>
                <Slider
                    className="w-[100px]"
                    min={0}
                    max={100}
                    defaultValue={[100]}
                    onValueChange={value => {
                        const newVolume = value[0] / 100;
                        audioRef.current.volume = newVolume;
                    }}
                />
            </div>
            <audio ref={audioRef} />
        </div>
    );
};

export default PlayerMenu;