import { Play, Pause, Prev as PrevIcon, Next as NextIcon } from './PlayerIcons';
import { useMusicStore } from '../stores/musicStore';

export default function PlayerControl() {
    const { isPlaying, setIsPlaying, currentMusic, setCurrentMusic } = useMusicStore(state => state);

    const handleClick = () => {
        setIsPlaying(!isPlaying);
    };

    const handlePrev = () => {
        const currentIndex = currentMusic.songs.indexOf(currentMusic.song);
        const prevIndex = currentIndex - 1;

        if (prevIndex < 0) {
            return;  // Ya está en la primera canción
        }

        setCurrentMusic({ ...currentMusic, song: currentMusic.songs[prevIndex]});
    };

    const handleNext = () => {
        const currentIndex = currentMusic.songs.indexOf(currentMusic.song);
        const nextIndex = currentIndex + 1;

        if (nextIndex >= currentMusic.songs.length) {
            return;  // Ya está en la última canción
        }

        setCurrentMusic({ ...currentMusic, song: currentMusic.songs[nextIndex] });
    };

    return (
        <div className='flex gap-x-4'>
            <button onClick={handlePrev}>
                <PrevIcon />
            </button>
            <button onClick={handleClick}>
                {isPlaying ? <Pause /> : <Play />}
            </button>
            <button onClick={handleNext}>
                <NextIcon />
            </button>
        </div>
    );
}
