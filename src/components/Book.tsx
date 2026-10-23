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


// Pages are 5:7. The flip library shows one page when the book is narrower than 2 x MIN_PAGE_WIDTH.
const PAGE_RATIO = 700 / 500;
const MIN_PAGE_WIDTH = 300;
const MAX_PAGE_WIDTH = 500;


// Widest book that fits the screen: two pages side by side if there is room, otherwise one
const calcBookWidth = () => {

    const desktop = window.innerWidth >= 768;

    // Desktop keeps room for the side arrows, mobile keeps room for the arrows below
    const availWidth = window.innerWidth - (desktop ? 220 : 32);
    const availHeight = window.innerHeight - (desktop ? 48 : 130);

    const maxPage = Math.min(MAX_PAGE_WIDTH, availHeight / PAGE_RATIO);

    const twoPageWidth = Math.floor(Math.min(maxPage, availWidth / 2));

    if(twoPageWidth >= MIN_PAGE_WIDTH){

        return twoPageWidth * 2;

    }

    return Math.floor(Math.min(maxPage, availWidth));

};


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


    const [bookWidth,setBookWidth] = useState(calcBookWidth);


    useEffect(()=>{

        const onResize = () => setBookWidth(calcBookWidth());

        window.addEventListener("resize",onResize);

        return () => window.removeEventListener("resize",onResize);

    },[]);


    // The library measures on its own resize handler, which runs before React applies the new width
    useEffect(()=>{

        bookRef.current?.pageFlip()?.update();

    },[bookWidth]);


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
        flex-col
        items-center
        gap-5
        md:block
        ">


        <div style={{ width: bookWidth }}>


        <FlipBook

            ref={bookRef}

            width={MAX_PAGE_WIDTH}
            height={MAX_PAGE_WIDTH * PAGE_RATIO}

            size="stretch"

            minWidth={MIN_PAGE_WIDTH}
            maxWidth={MAX_PAGE_WIDTH}

            minHeight={MIN_PAGE_WIDTH * PAGE_RATIO}
            maxHeight={MAX_PAGE_WIDTH * PAGE_RATIO}

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
px-[6.4cqw]
font-serif
">


<div className="
text-[length:12cqw]
mb-[6.4cqw]
">

❤️

</div>



<h1 className="
text-[length:9.6cqw]
mb-[4.8cqw]
font-bold
">

Our Story

</h1>



<p className="
text-[length:4.8cqw]
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
mt-[8cqw]
text-[length:4cqw]
">

Happy Birthday My Love ❤️

</p>



<p className="
mt-[4cqw]
text-[length:3.6cqw]
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
        p-[8cqw]
        ">


        <h1 className="text-[length:9.6cqw] mb-[8cqw]">
            Forever ❤️
        </h1>


        <p className="text-[length:4.8cqw] italic">

        If I had another life...

        <br/><br/>

        I would still choose you.

        </p>


        <img

        src="photos/back.jpg"

        className="
        mt-[6.4cqw]
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
        flex-col
        items-center
        justify-center
        text-center
        px-[4.8cqw]
        pb-[6cqw]
        ">

        <h1 className="
        text-[length:12cqw]
        font-bold
        font-serif
        text-white
        leading-tight
        mb-[5cqw]
        drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]
        ">

        Happy
        <br/>
        Birthday

        </h1>


        <p className="
        text-[length:max(11px,3.4cqw)]
        italic
        font-serif
        text-white
        leading-relaxed
        bg-black/40
        backdrop-blur-sm
        rounded-lg
        px-[4cqw]
        py-[3cqw]
        drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]
        ">

        “Since 2019, you have been my constant — my strength when I felt weak, my light in my darkest moments, and my biggest supporter in every step of my journey. Thank you for believing in me when I doubted myself, teaching me with patience, loving me unconditionally, and caring for me in ways words can never fully express. From being my partner in life to becoming my wife in July 2026, you have been my greatest blessing. I am forever grateful for you, my love.”

        </p>

        </div>


        <span className="
        absolute
        bottom-[3cqw]
        right-[4cqw]
        z-10
        text-[length:3.2cqw]
        text-white/80
        font-serif
        ">

        ~V2

        </span>


        </div>



        </FlipBook>


        </div>




        {/* BUTTONS - in a row below the book on mobile, beside the book on desktop */}

        <div className="
        flex
        gap-10
        md:contents
        ">


        {/* PREVIOUS BUTTON */}

        <button

        onClick={previousPage}

        className="
        md:absolute
        md:left-[-80px]
        md:bottom-5
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
        md:absolute
        md:right-[-80px]
        md:bottom-5
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



        </div>

    );

}