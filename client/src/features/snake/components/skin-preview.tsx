import { SnakeSkin } from "../types";


export function SnakeSkinPreview({ skin }: { skin: SnakeSkin }) {
   return <div className="flex items-center justify-center">
        <img src={skin.tail.src} alt="Tail" className="-rotate-90 h-10" style={{ imageRendering: "pixelated" }} />
        <img src={skin.body.src} alt="Body" className="rotate-90 h-10" style={{ imageRendering: "pixelated" }} />
        <img src={skin.body.src} alt="Body" className="rotate-90 h-10" style={{ imageRendering: "pixelated" }} />
        <img src={skin.body.src} alt="Body" className="rotate-90 h-10" style={{ imageRendering: "pixelated" }} />
        <img src={skin.head_tongue.src} alt="Body" className="rotate-90 h-13" style={{ imageRendering: "pixelated" }} />
    </div>
}