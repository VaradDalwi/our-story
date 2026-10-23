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
p-[6.4cqw]
flex
flex-col
items-center
justify-center
text-center
">


<motion.img

src={image}

className="
w-[57.6cqw]
h-[57.6cqw]
object-cover
rounded-lg
shadow-lg
mb-[6.4cqw]
"

/>

<motion.h1

initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}

className="
text-[length:7.2cqw]
text-[#8b5e3c]
mb-[4cqw]
font-serif
"

>

{title}

</motion.h1>



<p className="
text-[length:4cqw]
leading-relaxed
text-gray-700
max-w-xl
">

{text}

</p>


</div>

)

}