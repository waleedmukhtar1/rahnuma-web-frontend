import Box from "./Box"

function Timer({timeLeft}) {
  return (
    <div className="flex items-center gap-1  md:gap-20 justify-center  md:justify-normal mt-0 md:mt-10 ">
           <div>
                  <Box timeLeft={timeLeft?.days} text="d"/>
           </div>
           <div> <Box timeLeft={timeLeft?.hours} text="h"/></div>
           <div>
                       <Box timeLeft={timeLeft?.minutes} text="m"/>
           </div>
          
           
          
          
    </div>
  )
}

export default Timer