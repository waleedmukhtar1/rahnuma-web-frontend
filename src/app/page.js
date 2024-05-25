"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import logo1 from "./assets/logo1.png";
import logo2 from "./assets/logo2.png";
import logo3 from "./assets/logo3.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, addDoc, where, getDocs, query } from "firebase/firestore";
import { db } from "./backend/firebase";
import Timer from './components/Timer';
import Footer from "./components/Footer"


export default function Home() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [email, setEmail] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const notifyMe = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const querySnapshot = await getDocs(
        query(collection(db, "usersemail"), where("email", "==", email))
      );

      if (!querySnapshot.empty) {
        toast.warn("You are already subscribed.");
        return;
      }

      await addDoc(collection(db, "usersemail"), { email });

      toast.success("You will be notified when the website launches");
      setEmail("");
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      setEmail("");
    }
  };

  function calculateTimeLeft() {
    const difference = +new Date("2024-07-01") - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  return (
    <main className="h-screen bg-[#FFFEF8]">
      <div className="relative h-full flex flex-col justify-between">
                  <div className="flex items-center justify-center">
                    <Image src={logo2} className="h-[55px] w-[300px] object-contain mt-10" />
                  </div>
                  
                  <div className="absolute right-0 bottom-20 md:bottom-0 z-10">
                    <Image src={logo3} className=" h-auto  md:h-[700px] w-auto object-contain mt-20 opacity-30 z-10" />
                  </div>
                  <div className="absolute top-60 md:top-80 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <Timer timeLeft={timeLeft} />
                  </div>


                   <div className="flex flex-col z-30  md:mb-0 md:mt-24 mx-6 md:mx-20 ">
                          <h1 className="text-3xl md:text-[60px] text-[#5E4BA3] z-40 mt-4">We are</h1>
                          <h1 className=" text-3xl md:text-[60px] text-[#5E4BA3] z-40 md:mt-10">Coming Soon...</h1>
                          <h1 className="text-black sm:text-sm md:text-xl mt-4 md:mt-20 z-40">Get notified when we launch </h1>
                          <div className="flex flex-row items-center mt-2 w-auto  md:w-[600px]  z-40">
                          <div className="flex-grow z-40">
                            <input
                              value={email}
                              className=" !font-medium text-sm md:text-lg !font-sans border-2 rounded-bl-lg rounded-tl-lg w-full bg-[#FFFFFF] border-[#E0E0E0] focus:outline-none border-r-0  px-4 py-[7px] md:py-[9px] pl-4  z-40 text-[#828282] placeholder:text-[#828282]"
                              placeholder="Email"
                              type="email"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div>
                            <button
                              onClick={notifyMe}
                              className="bg-[#5E4BA3] rounded-br-lg rounded-tr-lg text-sm md:text-lg  hover:text-black  text-white font-normal py-[8px]  md:py-[10px]  px-2 md:px-6 shadow-2xl z-40  "
                            >
                              Subscribe
                            </button>
                          </div>
                        </div>
                     </div>



              <div className="flex flex-row items-end   z-30 mb-4 md:mb-0 mx-20 pb-4">
                <div className="hidden md:block">
                      <div className="">
                            <Image src={logo1} className=" h-40 w-20 hidden md:block  object-contain" />
                      </div>
                </div>
                <div className="flex-grow ">
                    <Footer/>
                </div>
              
              </div>
      </div>
      <ToastContainer />
    </main>
  );
}
