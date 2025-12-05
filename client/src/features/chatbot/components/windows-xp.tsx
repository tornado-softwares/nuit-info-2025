import windows_xp_logo from '@/assets/chatbot/windows-xp-logo.png';

export const WindowsXpBootLogo = () => {
    return <div className="leading-5">
        <div className=" flex place-items-end">
            <div className=" flex place-items-start -mb-2">
                <p className="text-[20px] leading-7 font-light">Microsoft</p>
                <p className="text-[14px] leading-5" >®</p>
            </div>
            <div className=" flex place-items-end relative  mx-3">
                <img src={windows_xp_logo} alt="Windows XP Logo" className="size-30" />
                <p className=" absolute  right-2.5 text-[7px]" >TM</p>
            </div>
        </div>

        <div className=" flex place-items-start">
            <p className="text-[48px] leading-12 font-semibold" >Windows</p>
            <p className="text-[20px] leading-7" >®</p>
            <span className="text-[rgb(255,94,0)] text-[40px] leading-4 font-semibold">
                xp
            </span>
        </div>
        <p className="px-2 text-[30px]">Professional</p>
    </div>
}


export function WindowsXPLoader() {
    return (
      <div className="w-[150px] h-[17px] border-2 border-[#b2b2b2] rounded-sm mx-auto p-[2px_1px] overflow-hidden bg-black text-[0] flex">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-[7px] h-full mr-0.5 bg-linear-to-b from-[#2838c7] via-[#869ef3] to-[#071ac9] animate-windows-xp-loader"
            style={{ animationTimingFunction:"linears" }}
          ></div>
        ))}
      </div>
    );
  }
  