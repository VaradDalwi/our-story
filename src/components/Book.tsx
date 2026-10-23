import { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import confetti from "canvas-confetti";
import Page from "./Page";
import { storyPages } from "../data/story";
import { ChevronLeft, ChevronRight } from "lucide-react";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FlipBook = HTMLFlipBook as any;


// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FlipBookInstance = any;


// Cover + story pages + "Forever" page come before the birthday page
const BIRTHDAY_PAGE = storyPages.length + 2;


// Party poppers from both bottom corners plus random bursts over the whole screen
const celebrate = () => {

    const end = Date.now() + 3000;

    const colors = ["#D4AF37","#ff4d6d","#ffffff","#ff99ac","#ffd166"];

    const frame = () => {

        confetti({ particleCount: 6, angle: 60, spread: 70, startVelocity: 70, origin: { x: 0, y: 1 }, colors });
        confetti({ particleCount: 6, angle: 120, spread: 70, startVelocity: 70, origin: { x: 1, y: 1 }, colors });

        if(Math.random() < 0.15){

            confetti({
                particleCount: 60,
                spread: 360,
                startVelocity: 30,
                origin: { x: Math.random(), y: Math.random() * 0.6 },
                colors
            });

        }

        if(Date.now() < end){

            requestAnimationFrame(frame);

        }

    };

    frame();

};


export default function Book() {


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bookRef = useRef<FlipBookInstance>(null);


    const [,setCurrentPage] = useState(0);

    const confettiTimer = useRef<number | undefined>(undefined);


    useEffect(()=>{

        return () => clearTimeout(confettiTimer.current);

    },[]);


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFlip = (e:any) => {

        setCurrentPage(e.data);

        clearTimeout(confettiTimer.current);

        // In two-page (landscape) view the birthday page is the right half of the spread
        const landscape = bookRef.current?.pageFlip().getOrientation() === "landscape";

        const onBirthdayPage =
            e.data === BIRTHDAY_PAGE ||
            (landscape && e.data + 1 === BIRTHDAY_PAGE);

        if(onBirthdayPage){

            confettiTimer.current = window.setTimeout(celebrate,2000);

        }

    };



    const nextPage = () => {

        const book = bookRef.current;

        if(book){

            book.pageFlip().flipNext();

        }

    };


    const previousPage = () => {

        const book = bookRef.current;

        if(book){

            book.pageFlip().flipPrev();

        }

    };



    return (

        <div className="
        relative
        flex
        items-center
        justify-center
        ">


        <FlipBook

            ref={bookRef}

            width={500}
            height={700}

            size="fixed"

            minWidth={315}
            maxWidth={600}

            minHeight={400}
            maxHeight={900}

            drawShadow={true}

            flippingTime={1000}

            startPage={0}

            showCover={true}

            mobileScrollSupport={false}

            disableFlipByClick={false}

            maxShadowOpacity={0.5}

            useMouseEvents={false}

            onFlip={handleFlip}

        >



        {/* COVER PAGE */}

        <div className="
demoPage
relative
w-full
h-full
overflow-hidden
rounded-lg
">


<img

src="photos/cover.jpg"

className="
absolute
inset-0
w-full
h-full
object-cover
"

/>


{/* Dark overlay for readability */}

<div className="
absolute
inset-0
bg-black/40
">


</div>



<div className="
relative
z-10
h-full
flex
flex-col
items-center
justify-center
text-center
text-white
px-8
font-serif
">


<div className="
text-6xl
mb-8
">

❤️

</div>



<h1 className="
text-5xl
mb-6
font-bold
">

Our Story

</h1>



<p className="
text-2xl
italic
leading-relaxed
">

A little book about

<br/>

the woman who became

<br/>

my entire world.

</p>




<p className="
mt-10
text-xl
">

Happy Birthday My Love ❤️

</p>



<p className="
mt-5
text-lg
opacity-90
">

Written with all my heart

<br/>

by your husband

</p>



</div>


</div>





        {
            storyPages.map((page)=>(

                <div
                className="demoPage"
                key={page.id}
                >

                    <Page

                    title={page.title}

                    text={page.text}

                    image={page.image}

                    />

                </div>


            ))
        }





        {/* LAST PAGE */}

        <div className="
        demoPage
        bg-black
        text-white
        ">

        <div className="
        h-full
        flex
        flex-col
        items-center
        text-center
        p-10
        ">


        <h1 className="text-5xl mb-10">
            Forever ❤️
        </h1>


        <p className="text-2xl italic">

        If I had another life...

        <br/><br/>

        I would still choose you.

        </p>


        <img

        src="photos/back.jpg"

        className="
        mt-8
        flex-1
        min-h-0
        w-full
        object-contain
        rounded-lg
        "

        />


        </div>

        </div>




        {/* BIRTHDAY PAGE */}

        <div className="
        demoPage
        relative
        w-full
        h-full
        overflow-hidden
        ">


        <img

        src="photos/end.jpg"

        className="
        absolute
        inset-0
        w-full
        h-full
        object-cover
        "

        />


        <div className="
        absolute
        inset-0
        bg-black/30
        ">
        </div>


        <div className="
        relative
        z-10
        h-full
        flex
        items-center
        justify-center
        text-center
        px-6
        ">

        <h1 className="
        text-7xl
        font-bold
        font-serif
        text-white
        leading-tight
        drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]
        ">

        Happy
        <br/>
        Birthday

        </h1>

        </div>


        </div>



        </FlipBook>




        {/* PREVIOUS BUTTON */}

        <button

        onClick={previousPage}

        className="
        absolute
        left-[-80px]
        bottom-5
        bg-[#D4AF37]
        text-white
        rounded-full
        p-4
        shadow-xl
        hover:scale-110
        transition
        "

        >

        <ChevronLeft size={35}/>

        </button>





        {/* NEXT BUTTON */}

        <button

        onClick={nextPage}

        className="
        absolute
        right-[-80px]
        bottom-5
        bg-[#D4AF37]
        text-white
        rounded-full
        p-4
        shadow-xl
        hover:scale-110
        transition
        "

        >

        <ChevronRight size={35}/>

        </button>



        </div>

    );

}