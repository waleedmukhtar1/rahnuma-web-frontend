

function Box({ text, timeLeft }) {
  return (
    <div className="flex flex-row p-3 bg-transparent font-semibold rounded-xl items-baseline  opacity-40">
      <div className=" flex row gap-1 items-baseline ">
        <h1 className="text-white text-[60px] md:text-[188px] lg:text-[288px] font-outline-2 font-extrabold">{timeLeft}</h1>
        <h1 className="text-white text-2xl lg:text-[80px] font-outline-2 font-extrabold  mt-26">{text}</h1>
      </div>
      <div>
       
      </div>
    </div>
  );
}

export default Box;