import {motion} from "framer-motion";


interface Props{
title:string;
text:string;
image:string;
}


export default function Page({
title,
text,
image
}:Props){


return (

<div className="
w-full
h-full
bg-[#fff8ee]
rounded-xl
shadow-2xl
p-8
flex
flex-col
items-center
justify-center
text-center
">


<motion.img

src={image}

className="
w-72
h-72
object-cover
rounded-lg
shadow-lg
mb-8
"

/>

<motion.h1

initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}

className="
text-4xl
text-[#8b5e3c]
mb-5
font-serif
"

>

{title}

</motion.h1>



<p className="
text-xl
leading-relaxed
text-gray-700
max-w-xl
">

{text}

</p>


</div>

)

}