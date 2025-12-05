import { useState } from "react";
import { BootSequence } from "./boot-sequence";
import { PixelTunnel } from "./pixel-tunnel";
import { Tux } from "./tux";
import { DialogueBox } from "./dialogue-box";

export function OpenningPage() {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden bg-black">
      {!bootComplete && <BootSequence onComplete={() => setBootComplete(true)} />}

      <div
        className={`relative flex h-full w-full flex-col items-center justify-center transition-opacity duration-1000 ${
          bootComplete ? "opacity-100" : "opacity-0"
        }`}
      >
        <PixelTunnel />
        <Tux />
        <DialogueBox />
      </div>
    </div>
  );
}
