import { useState } from "react";
import { BiosScreen } from "./bios-screen";
import { WindowsLoader } from "./windows-loader";
import { BlueScreen } from "./blue-screen";

type BootStage = "bios" | "loader" | "bsod" | "complete";

interface BootSequenceProps {
  onComplete: () => void;
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [stage, setStage] = useState<BootStage>("bios");

  if (stage === "complete") {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {stage === "bios" && (
        <BiosScreen onComplete={() => setStage("loader")} />
      )}
      {stage === "loader" && (
        <WindowsLoader onComplete={() => setStage("bsod")} />
      )}
      {stage === "bsod" && (
        <BlueScreen
          onComplete={() => {
            setStage("complete");
            onComplete();
          }}
        />
      )}
    </div>
  );
}
