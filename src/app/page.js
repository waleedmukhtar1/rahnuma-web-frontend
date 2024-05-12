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

        <div>
          <a href="https://www.linkedin.com/company/rahnuma-io" className="cursor-ponter" target="_blank"> 
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40"
              height="40"
              viewBox="0 0 48 48"
            >
              <path
                fill="#0078d4"
                d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z"
              ></path>
              <path
                d="M30,37V26.901c0-1.689-0.819-2.698-2.192-2.698c-0.815,0-1.414,0.459-1.779,1.364	c-0.017,0.064-0.041,0.325-0.031,1.114L26,37h-7V18h7v1.061C27.022,18.356,28.275,18,29.738,18c4.547,0,7.261,3.093,7.261,8.274	L37,37H30z M11,37V18h3.457C12.454,18,11,16.528,11,14.499C11,12.472,12.478,11,14.514,11c2.012,0,3.445,1.431,3.486,3.479	C18,16.523,16.521,18,14.485,18H18v19H11z"
                opacity=".05"
              ></path>
              <path
                d="M30.5,36.5v-9.599c0-1.973-1.031-3.198-2.692-3.198c-1.295,0-1.935,0.912-2.243,1.677	c-0.082,0.199-0.071,0.989-0.067,1.326L25.5,36.5h-6v-18h6v1.638c0.795-0.823,2.075-1.638,4.238-1.638	c4.233,0,6.761,2.906,6.761,7.774L36.5,36.5H30.5z M11.5,36.5v-18h6v18H11.5z M14.457,17.5c-1.713,0-2.957-1.262-2.957-3.001	c0-1.738,1.268-2.999,3.014-2.999c1.724,0,2.951,1.229,2.986,2.989c0,1.749-1.268,3.011-3.015,3.011H14.457z"
                opacity=".07"
              ></path>
              <path
                fill="#fff"
                d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12	c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698	c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19	c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z"
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
