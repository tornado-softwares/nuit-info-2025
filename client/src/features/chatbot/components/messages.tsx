import mail from "@/assets/chatbot/mail.ico"
import user from "@/assets/chatbot/Livemessenger.ico"

export function AssistantMessage({ content }: { content: string }) {
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

export function UserMessage({ content }: { content: string }) {
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
