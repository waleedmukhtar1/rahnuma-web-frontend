"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import logo1 from "./assets/logo1.png";
import logo2 from "./assets/logo2.png";
import help from "./assets/5570863.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, addDoc, where, getDocs, query } from "firebase/firestore";
import { db } from "./backend/firebase";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [email, setEmail] = useState(undefined);
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

      const docRef = await addDoc(collection(db, "usersemail"), { email });

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
    <main className=" h-screen bg-gradient-to-r from-[#5e4ba3] to-[#8f7ecd] flex items-center justify-center ">
      <div
        style={{
          backgroundImage: `url(${help.src})`,

          backgroundRepeat: "no-repeat",
          backgroundSize: `cover`,
          backgroundPosition: "center",
        }}
        className="
                  bg-gray-400 flex flex-col items-center justify-center 
                  rounded-none md:rounded-xl md:px-20  
                  shadow-none md:shadow-2xl p-4 h-screen w-screen md:w-4/5 
                  md:h-4/5  overflow-auto relative 
                  md:overflow-y-hidden"
      >
        <div className="flex flex-col items-center justify-center gap-1 md:justify-normal md:items-start ">
          <Image src={logo1} className="h-40 w-40 object-contain" />
        </div>
        <div className=" ">
          <Image src={logo2} className="h-40 w-40 object-contain" />
        </div>

        <div className="flex flex-col ">
          <div className="flex items-center gap-2  justify-center  md:justify-normal mt-10 ">
            <div className="flex flex-col p-3 bg-white font-semibold border-4  rounded-xl w-20 border-[#5e4ba3] shadow-2xl items-center ">
              <div>
                <h1 className="text-black  text-md">{timeLeft?.days}</h1>
              </div>

              <div>
                <h1 className="text-[#5e4ba3] text-xs ">DAYS</h1>
              </div>
            </div>
            <div className="flex flex-col p-3 bg-white font-semibold border-4  rounded-xl w-20 border-[#5e4ba3] shadow-2xl items-center ">
              <div>
                <h1 className="text-black   text-md">{timeLeft?.hours}</h1>
              </div>

              <div>
                <h1 className="text-[#5e4ba3] text-xs ">HOURS</h1>
              </div>
            </div>
            <div className="flex flex-col p-3 bg-white font-semibold border-4 rounded-xl w-20 border-[#5e4ba3] shadow-2xl items-center ">
              <div>
                {" "}
                <h1 className="text-black   text-md">{timeLeft?.minutes}</h1>
              </div>
              <div>
                {" "}
                <h1 className="text-[#5e4ba3] text-xs ">MINUTES</h1>
              </div>
            </div>
            <div className="flex flex-col p-3 bg-white font-semibold border-4  rounded-xl w-20 border-[#5e4ba3] shadow-2xl items-center ">
              <div>
                {" "}
                <h1 className="text-black    text-md  ">{timeLeft?.seconds}</h1>
              </div>
              <div>
                {" "}
                <h1 className="text-[#5e4ba3] text-xs ">SECONDS</h1>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center    mt-10   gap-1">
            <div className="flex-grow">
              <input
                value={email || ""}
                className="border-4 w-full border-[#5e4ba3] font-normal rounded-xl p-2 pl-4  shadow-2xl  text-[#5e4ba3] placeholder:text-[#5e4ba3] "
                placeholder="Email"
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div>
              <button
                onClick={(e) => {
                  notifyMe(e);
                }}
                class="bg-[#8f7ecd] hover:bg-white hover:text-black border  text-white font-normal py-[11px] px-4 shadow-2xl  border-[#5e4ba3]  rounded-xl  "
              >
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </main>
  );
}
