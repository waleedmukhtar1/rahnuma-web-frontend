import icon1 from "../assets/Linkedin.png"
import icon2 from "../assets/Instagram.png"
import logo1 from "../assets/logo1.png"
import Image from "next/image";
function Footer() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 z-30">
        <div>
               <Image src={logo1} className="block md:hidden h-14 w-14 mb-2 object-contain" />
        </div>
        <div className="flex flex-row gap-6 md:gap-4">
            <div>
                <a onClick={()=>{window.open("https://www.instagram.com/rahnuma.io")}}>
                 <Image src={icon2} className=" object-contain cursor-pointer z-40 h-4 w-4 md:h-8 md:w-8" />
                 </a>
            </div>
            <div>
                 <a onClick={()=>{window.open("https://www.linkedin.com/company/rahnuma-io")}}>
                 <Image src={icon1} className=" object-contain cursor-pointer z-40 h-4 w-4 md:h-8 md:w-8" />
                 </a>
            </div>
            

        </div>
         <div className=" mt-2 md:mt-2">
                <p className="text-[#828282] !font-extralight !font-serif text-[8px] md:text-lg ">© Copyrights Tensorr | All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer