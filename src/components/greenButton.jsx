import { useMusicStore } from '../stores/musicStore.js'; // Asegúrate de que esta ruta sea correcta
import {Play, Pause} from '../icons/PlayerIcons'; // Asegúrate de que esta ruta sea correcta

export default function GreenButton({ className, id }) {
    const { isPlaying, setIsPlaying, currentMusic, setCurrentMusic } = useMusicStore(state => state);
    const isPlayingPlaylist = isPlaying && currentMusic.playlist?.id === id;
    const handleClick = async () => {
        
        if (isPlayingPlaylist) {
            setIsPlaying(!isPlaying)
            return;
        }

        const data = await fetch(`/api/get-info-playlist.json?id=${id}`);
        const { playlist, songs } = await data.json();
        setCurrentMusic({ playlist, songs, song: songs[0] });
        
       setIsPlaying(true);
    };

   
    return (
        <button onClick={handleClick} className={`${className} bg-green-500 w-11 h-11 flex justify-center items-center rounded-full mr-2 cursor-pointer`}>
            {isPlayingPlaylist ? <Pause className={"w-5 h-5"}/> : <Play className={"w-5 h-5"}/>}
        </button>
    );
}