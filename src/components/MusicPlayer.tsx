import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";


export default function MusicPlayer(){


    const audioRef = useRef<HTMLAudioElement>(null);

    const [muted,setMuted] = useState(false);

    const [opened,setOpened] = useState(false);



    // Browsers block autoplay, so start the music on the first click / tap / key press.
    // Capture phase so other components can't swallow the event first.

    useEffect(()=>{

        const events = ["click","touchend","keydown"];

        const start = () => {

            const audio = audioRef.current;

            if(!audio || !audio.paused) return;

            audio.play()
            .then(()=>{

                events.forEach(e => window.removeEventListener(e,start,true));

            })
            .catch(()=>{});

        };

        events.forEach(e => window.addEventListener(e,start,true));

        return () => {

            events.forEach(e => window.removeEventListener(e,start,true));

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


        {/* START SCREEN - the tap here is what lets the music play */}

        {!opened && (

            <div

            onClick={()=>setOpened(true)}

            className="
            fixed
            inset-0
            z-[60]
            flex
            flex-col
            items-center
            justify-center
            bg-gradient-to-br
            from-[#2b1815]
            to-[#6b4035]
            text-white
            font-serif
            cursor-pointer
            "

            >

            <div className="text-6xl mb-6 animate-pulse">

            ❤️

            </div>

            <p className="text-3xl italic">

            Tap to open

            </p>

            </div>

        )}


        <button

        onClick={toggleMute}

        className="
        fixed
        bottom-4
        left-4
        md:bottom-auto
        md:left-auto
        md:top-5
        md:right-5
        z-50
        bg-[#D4AF37]
        text-white
        rounded-full
        p-2.5
        md:p-3
        shadow-xl
        hover:scale-110
        transition
        "

        >

        {muted ? <VolumeX className="w-5 h-5 md:w-7 md:h-7"/> : <Volume2 className="w-5 h-5 md:w-7 md:h-7"/>}

        </button>

        </>

    );

}
