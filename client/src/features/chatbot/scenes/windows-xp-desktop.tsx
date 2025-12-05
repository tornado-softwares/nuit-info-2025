import windowsXpDesktop from "@/assets/chatbot/windows-xp-desktop.png"
import { ChatBotWindow, ChatBotWindowRnd } from "../components/windows/chatbot"
import { ImageWindowRnd } from "../components/windows/image"

export function WindowsXpDesktopPage() {

  return (
    <div className="h-screen  relative bg-black text-black flex flex-col items-center justify-center opacity-0 animate-fade-in delay-1000  px-0 xl:px-40">
      <div className="xl:block hidden h-full  pb-[5vh] w-full  relative">
        <img src={windowsXpDesktop} alt="Desktop" className="absolute   size-full -z-1" />
        <div className="size-full   ">
          <ImageWindowRnd />
          <ChatBotWindowRnd />
        </div>
      </div>

      <div className="xl:hidden block h-full w-full  relative">
        <div className="size-full">
          <ChatBotWindow />
        </div>
      </div>

    </div>
  )
}
