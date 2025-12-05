import windowsXpDesktop from "@/assets/chatbot/windows-xp-desktop.png"
import mail from "@/assets/chatbot/mail.ico"
import oh from "@/assets/chatbot/oh.png"
import star from "@/assets/chatbot/star.png"
import star_thinking from "@/assets/chatbot/star-thinking.png"
import star_background from "@/assets/chatbot/background.png"
import star_pointing from "@/assets/chatbot/star-pointing.png"
import star_icon from "@/assets/chatbot/star-icon.png"
import user from "@/assets/chatbot/Livemessenger.ico"
import { X } from "lucide-react"
import { useState, useRef } from "react"
import { Rnd } from "react-rnd"

function AssistantMessage({ content }: { content: string }) {
  return (
    <div className="flex justify-start">
      <div className="flex items-start gap-2 max-w-[70%]">
        <div className="w-8 h-8 aspect-square bg-black rounded-full flex items-center justify-center p-1.5 ">
          <img src={mail} alt="Icon" />
        </div>
        <div className="px-3 py-2 bg-[#CBE1FF] border border-[#7AA7E9] rounded-md shadow-sm text-sm">
          {content}
        </div>
      </div>
    </div>
  )
}

function UserMessage({ content }: { content: string }) {
  return (
    <div className="flex justify-end">
      <div className="flex items-start gap-2 max-w-[70%]">
        <div className="px-3 py-2 bg-white border border-gray-400 rounded-md shadow-sm text-sm">
          {content}
        </div>
        <div className="w-8 h-8 aspect-square bg-blue-500 rounded-full flex items-center justify-center p-1.5 ">
          <img src={user} alt="Icon" />
        </div>
      </div>
    </div>
  )
}

type Message = {
  role: "user" | "assistant"
  content: string
}

export function WindowsXpDesktopPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Tu me veux quoi toi ?" },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [starState, setStarState] = useState<"idle" | "pointing" | "thinking">("idle")

  const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }) }

  const sendMessage = async () => {
    if (!input.trim()) return
    setStarState("thinking")


    const newUserMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, newUserMessage])
    setInput("")
    scrollToBottom()

    const newAssistantMessage: Message = { role: "assistant", content: "" }
    setMessages((prev) => [...prev, newAssistantMessage])
    scrollToBottom()

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, newUserMessage] })
      })

      if (!response.body) return

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let text = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((line) => line.startsWith("data:"));

        for (const line of lines) {
          const str = line.replace("data: ", "").trim();
          if (str === "[DONE]") {
            break;
          }

          try {
            const json = JSON.parse(str);
            text += json.choices?.[0]?.delta?.content || "";
            setMessages((prev) => {
              const b = [...prev]
              b[prev.length - 1] = { ...b[prev.length - 1], content: text };
              return b;
            });
          } catch (error) { }
        }
      }
      setStarState("pointing")
      setTimeout(() => { setStarState("idle") }, 3000)
      scrollToBottom()

    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1].content = "Erreur: impossible de récupérer la réponse."
        return updated
      })
    }
  }

  return (
    <div className="h-screen  relative bg-black text-black flex flex-col items-center justify-center opacity-0 animate-fade-in delay-1000 px-40">
      <div className="h-full  pb-[5vh] w-full  relative">
        <img src={windowsXpDesktop} alt="Desktop" className="absolute   size-full -z-1" />

        <div className="size-full   ">

          <Rnd
            default={{
              x: 700,
              y: 500,
              width: 400,
              height: 400,
            }}
            minWidth={400}
            minHeight={300}
            bounds="parent"
            dragHandleClassName="drag-area"
            className="border-[#5399E9] border-4 rounded-lg shadow-lg bg-white mb-[10]"
          >
            <div className="flex flex-col w-full h-full">

              <div className="bg-[#0D66EE] text-white h-8 p-1.5 pl-4 flex justify-between cursor-grab drag-area">
                <p>GLqRrTRX9x6zcVx5V4p3Uqdp</p>

                <div className="border-white border-1 bg-gradient-to-br from-[#DE836D] to-[#FF4000] h-full aspect-square rounded-xs cursor-pointer">
                  <X className="size-full" />
                </div>
              </div>

              <div className="bg-[#EFEBD8] text-black h-8 p-1.5 pl-4 flex justify-between border-black/40 border-x-3 border-y-1">
                <div className="flex gap-5">
                  {["Fichier", "Édition", "Affichage", "Outils", "Aide"].map((x, i) => (
                    <p key={i} className="first-letter:underline leading-none">{x}</p>
                  ))}
                </div>
              </div>

              <div className="flex-1 flex flex-col bg-white border-black/40 border-x-3 p-2 space-y-2  overflow-y-auto">
                <img
                  src={oh}
                  alt="Image"
                  className="w-full h-full object-contain"
                />

              </div>
            </div>
          </Rnd>

          <Rnd
            default={{
              x: 100,
              y: 100,
              width: 800,
              height: 600,
            }}
            minWidth={400}
            minHeight={300}
            bounds="parent"
            dragHandleClassName="drag-area"
            className="border-[#5399E9] border-4 rounded-lg shadow-lg bg-white mb-[10]"
          >
            <div className="flex flex-col w-full h-full">

              <div className="bg-[#0D66EE] text-white h-8 p-1.5 pl-4 flex justify-between cursor-grab drag-area">
                <div className="flex gap-2">
                  <img src={star_icon} alt="Star" className="  h-full " />
                  <p>Subject 07</p>

                </div>
                <div className="flex justify-end gap-1.5 ">
                  <div className="border-white border-1 bg-gradient-to-br from-blue-300 to-blue-600 h-full aspect-square rounded-xs p-[4px] cursor-pointer">
                    <div className="size-full border-white border-1 border-t-3">

                    </div>
                  </div>
                  <div className="border-white border-1 bg-gradient-to-br from-[#DE836D] to-[#FF4000] h-full aspect-square rounded-xs cursor-pointer">
                    <X className="size-full" />
                  </div>
                </div>
              </div>

              <div className="bg-[#EFEBD8] text-black h-8 p-1.5 pl-4 flex justify-between border-black/40 border-x-3 border-y-1">
                <div className="flex gap-5">
                  {["Fichier", "Édition", "Affichage", "Outils", "Aide"].map((x, i) => (
                    <p key={i} className="first-letter:underline leading-none">{x}</p>
                  ))}
                </div>
              </div>

              <div className="flex-1 flex gap-2 bg-white border-black/40 border-x-3 p-2  overflow-y-auto">

                <div className="w-1/3  bg-gray-100 border border-gray-400 flex flex-col overflow-hidden relative ">
                  <img
                    src={starState == "thinking" ? star_thinking : starState == "pointing" ? star_pointing : star}
                    alt="Image Star"
                    data-state={starState}
                    className="w-full h-full object-contain z-1 data-[state=pointing]:scale-160 transition-all duration-300"
                  />
                  <img src={star_background} alt="Desktop" className="absolute   size-full  " />
                  <p className="absolute top-4 w-full text-center font-bios text-white/50">Subject 07</p>
                </div>

                <div className="w-full flex-1 bg-gray-100 border border-gray-400 flex flex-col overflow-hidden">

                  <div className="flex-1 overflow-y-auto p-3 space-y-4 custom-scrollbar bg-[#F5F4E8]">
                    {messages.map((message, i) =>
                      message.role === "user" ? (
                        <UserMessage key={i} content={message.content} />
                      ) : (
                        <AssistantMessage key={i} content={message.content} />
                      )
                    )}
                    <div ref={messagesEndRef}></div>
                  </div>

                  <div className="border-t border-gray-400 bg-[#DFE4F2] p-2 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Tape ton message..."
                      className="flex-1 bg-white border border-gray-500 px-2 py-1 text-sm shadow-inner focus:outline-none"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button
                      className="bg-[#0D66EE] text-white px-4 py-1 text-sm border border-gray-700 shadow active:translate-y-[1px]"
                      onClick={sendMessage}
                    >
                      Envoyer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Rnd>
        </div>
      </div>

    </div>
  )
}
