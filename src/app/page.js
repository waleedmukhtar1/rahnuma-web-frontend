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
          <Image src={logo2} className="h-20 w-40 object-contain" />
        </div>

        <div className="flex">
          <a
            href="https://www.linkedin.com/company/rahnuma-io"
            className="cursor-ponter"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40"
              height="40"
              viewBox="0 0 50 50"
            >
              <path
                fill="#5e4ba3"
                d="M 9 4 C 6.2504839 4 4 6.2504839 4 9 L 4 41 C 4 43.749516 6.2504839 46 9 46 L 41 46 C 43.749516 46 46 43.749516 46 41 L 46 9 C 46 6.2504839 43.749516 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.668484 6 44 7.3315161 44 9 L 44 41 C 44 42.668484 42.668484 44 41 44 L 9 44 C 7.3315161 44 6 42.668484 6 41 L 6 9 C 6 7.3315161 7.3315161 6 9 6 z M 14 11.011719 C 12.904779 11.011719 11.919219 11.339079 11.189453 11.953125 C 10.459687 12.567171 10.011719 13.484511 10.011719 14.466797 C 10.011719 16.333977 11.631285 17.789609 13.691406 17.933594 A 0.98809878 0.98809878 0 0 0 13.695312 17.935547 A 0.98809878 0.98809878 0 0 0 14 17.988281 C 16.27301 17.988281 17.988281 16.396083 17.988281 14.466797 A 0.98809878 0.98809878 0 0 0 17.986328 14.414062 C 17.884577 12.513831 16.190443 11.011719 14 11.011719 z M 14 12.988281 C 15.392231 12.988281 15.94197 13.610038 16.001953 14.492188 C 15.989803 15.348434 15.460091 16.011719 14 16.011719 C 12.614594 16.011719 11.988281 15.302225 11.988281 14.466797 C 11.988281 14.049083 12.140703 13.734298 12.460938 13.464844 C 12.78117 13.19539 13.295221 12.988281 14 12.988281 z M 11 19 A 1.0001 1.0001 0 0 0 10 20 L 10 39 A 1.0001 1.0001 0 0 0 11 40 L 17 40 A 1.0001 1.0001 0 0 0 18 39 L 18 33.134766 L 18 20 A 1.0001 1.0001 0 0 0 17 19 L 11 19 z M 20 19 A 1.0001 1.0001 0 0 0 19 20 L 19 39 A 1.0001 1.0001 0 0 0 20 40 L 26 40 A 1.0001 1.0001 0 0 0 27 39 L 27 29 C 27 28.170333 27.226394 27.345035 27.625 26.804688 C 28.023606 26.264339 28.526466 25.940057 29.482422 25.957031 C 30.468166 25.973981 30.989999 26.311669 31.384766 26.841797 C 31.779532 27.371924 32 28.166667 32 29 L 32 39 A 1.0001 1.0001 0 0 0 33 40 L 39 40 A 1.0001 1.0001 0 0 0 40 39 L 40 28.261719 C 40 25.300181 39.122788 22.95433 37.619141 21.367188 C 36.115493 19.780044 34.024172 19 31.8125 19 C 29.710483 19 28.110853 19.704889 27 20.423828 L 27 20 A 1.0001 1.0001 0 0 0 26 19 L 20 19 z M 12 21 L 16 21 L 16 33.134766 L 16 38 L 12 38 L 12 21 z M 21 21 L 25 21 L 25 22.560547 A 1.0001 1.0001 0 0 0 26.798828 23.162109 C 26.798828 23.162109 28.369194 21 31.8125 21 C 33.565828 21 35.069366 21.582581 36.167969 22.742188 C 37.266572 23.901794 38 25.688257 38 28.261719 L 38 38 L 34 38 L 34 29 C 34 27.833333 33.720468 26.627107 32.990234 25.646484 C 32.260001 24.665862 31.031834 23.983076 29.517578 23.957031 C 27.995534 23.930001 26.747519 24.626988 26.015625 25.619141 C 25.283731 26.611293 25 27.829667 25 29 L 25 38 L 21 38 L 21 21 z"
              ></path>
            </svg>
          </a>
          <a
            href="https://www.instagram.com/rahnuma.io"
            className="cursor-ponter"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40"
              height="40"
              viewBox="0 0 50 50"
            >
              <path
                fill="#5e4ba3"
                d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"
              ></path>
            </svg>
          </a>
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
                className="bg-[#8f7ecd] hover:bg-white hover:text-black border  text-white font-normal py-[11px] px-4 shadow-2xl  border-[#5e4ba3]  rounded-xl  "
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
