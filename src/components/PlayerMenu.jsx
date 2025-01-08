import { useState } from "react";

const PlayButton = () => (
    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor"
  ><path fill="currentColor" d="M8 5.14v14l11-7-11-7z"></path></svg>
  )

const PauseButton = () => (
    <svg role="img" className="h-8 w-8" aria-hidden="true" viewBox="0 0 16 16"
  ><path
    d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"
  ></path></svg>
)



const PlayerMenu = ({imageURL}) => {

    const [isPlaying, setIsPlaying] = useState(false);


    return (
        <div className="player-menu flex items-center justify-between w-full h-full ">
            <div id="left" className="flex items-center space-x-4">
            <picture>
                    <img className='ml-2 max-w-16 h-auto' src= {imageURL} alt = "Cover" />
                </picture>
                <div className="text-white">
                <h1 className="text-lg font-semibold">Nombre de la canción</h1>
                    <p className="text-sm text-zinc-400">Nombre del artista</p>
                </div>
            </div>

            <div id="mid" className="flex items-center align-center flex-grow max-w-48 text-gray-400 ">
                <button onClick={()=>setIsPlaying(!isPlaying)} className="bg-white rounded-full p-1 text-black">
                    {isPlaying ? <PauseButton /> : <PlayButton />}
                </button>
                
            </div> 

            <div id="right" className="flex items-center space-x-3">
                volumen
            </div>
        </div>
    );
}

export default PlayerMenu;