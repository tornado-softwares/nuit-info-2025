import { X } from "lucide-react";
import oh from "@/assets/chatbot/oh.png"
import { Rnd } from "react-rnd"

export function ImageWindow() {
    return <div className="flex flex-col w-full h-full">

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
}

export function ImageWindowRnd() {
    return <Rnd
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
        <ImageWindow/>
    </Rnd>
}