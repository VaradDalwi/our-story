import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";


export default function MusicPlayer(){


    const audioRef = useRef<HTMLAudioElement>(null);

    const [muted,setMuted] = useState(false);



    // Browsers block autoplay, so start the music on the first click / tap / key press

    useEffect(()=>{

        const start = () => {

            audioRef.current?.play().catch(()=>{});

            window.removeEventListener("pointerdown",start);
            window.removeEventListener("keydown",start);

        };

        window.addEventListener("pointerdown",start);
        window.addEventListener("keydown",start);

        return () => {

            window.removeEventListener("pointerdown",start);
            window.removeEventListener("keydown",start);

        };

    },[]);



    const toggleMute = () => {

        const audio = audioRef.current;

        if(audio){

            audio.muted = !muted;

            if(audio.paused){

                audio.play().catch(()=>{});

            }

        }

        setMuted(!muted);

    };



    return (

        <>

        <audio

        ref={audioRef}

        src="music/background.mp3"

        loop

        />


        <button

        onClick={toggleMute}

        className="
        fixed
        top-5
        right-5
        z-50
        bg-[#D4AF37]
        text-white
        rounded-full
        p-3
        shadow-xl
        hover:scale-110
        transition
        "

        >

        {muted ? <VolumeX size={28}/> : <Volume2 size={28}/>}

        </button>

        </>

    );

}
