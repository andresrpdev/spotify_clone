import { useMusicStore } from '../stores/musicStore.js'; // Asegúrate de que esta ruta sea correcta
import {Play, Pause} from '../icons/PlayerIcons'; // Asegúrate de que esta ruta sea correcta

export default function GreenButton({ className, id }) {
    const { isPlaying, setIsPlaying, currentMusic, setCurrentMusic } = useMusicStore(state => state);

    const handleClick = () => {
        setIsPlaying(!isPlaying);
        setCurrentMusic({
            playlist: {
                id
            }
        });
        console.log("hola");
    };

    const isPlayingPlaylist = isPlaying && currentMusic.playlist?.id === id;
    return (
        <button onClick={handleClick} className={`${className} bg-green-500 w-11 h-11 flex justify-center items-center rounded-full mr-2 cursor-pointer`}>
            {isPlayingPlaylist ? <Pause className={"w-5 h-5"}/> : <Play className={"w-5 h-5"}/>}
        </button>
    );
}