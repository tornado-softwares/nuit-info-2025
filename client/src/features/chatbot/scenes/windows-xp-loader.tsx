import { WindowsXPLoader, WindowsXpBootLogo } from '@/features/chatbot/components/windows-xp'
import microsoft_logo from "@/assets/chatbot/microsoft-logo.png"
import { useNavigate } from 'react-router';
import { useEffect } from 'react';



export function WindowsXpLoaderPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/chatbot/desktop"), 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return <div className="h-screen relative bg-black gap-16 flex flex-col  items-center justify-center w-full">

    <WindowsXpBootLogo />
    <WindowsXPLoader />

    <div className="absolute bottom-0 w-full flex items-center justify-between p-3">
      <div className="flex gap-2 items-end justify-center leading-none">
        <p className="font-light text-sm">Copyright ⓒ Microsoft Corporation</p>
      </div>
      <div className="flex ">
        <img src={microsoft_logo} alt="Microsoft Logo" className="h-[15px]" />
        <p className="text-[14px] leading-[6px]" >®</p>
      </div>
    </div>
  </div>

}
