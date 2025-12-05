import { useEffect, useState } from "react";

const ASCII_LOGO = `
                                                 ▒█████████░             
                                            ░███████████████             
                 ██    ▒██░               ██████████████████             
                ▓██   ▒██░              ▓███████▒     ██████             
                ▓█░  ▒██░             ▒██████         ░█████             
                ▓█░  ▒█▒            ▒█████           ░██████             
                ▒██  ▒█▒           ░████▒            ▒█████░             
                 ██▒ ▓██          ▒███▒             ▒█████▓              
                 ▒████████▒      ▓███▒             ▒█████▒               
               ░████████████▒   ▓███             ▒██████░                
             ░███████████████  ▒███            ░██████▒                  
             ░███████████████ ░███░          ███████▒                    
             ███████████▓▒▒▒ ░███▒      ░▓████████████▒                  
            ░███████████░   ░███████████████████████████▒                
             ▒████████▓░    ░█████████████░░        ░▒████░              
               ░░░░░        ██████████░               ▒███▒              
                    ███▒    ███████████▒            █████▒               
                   ░███▒   ████████████████████████████▓                 
                ▓███       █████░       ▓████████████                    
                ▓███       ██▒   ░░░░░░░                                 
                     ███░  █▓  ▓███████████░                             
                     ███░  ▓ ▓█████████████████░                         
                            ▒██████████▓░                                
                       ▒███ ▓██████▓▒      ▒▒▒▒▒▒▒                       
                       ▒███  ▓███▓     ▒██████████░                      
                             ░▒▒    ▓█████████████░                      
                           ████    █████████▒░                           
                           ███▓   ███████▓     ░▓▓                       
                                    ░██▓    ██████░                      
                                           ███████░`;

interface BiosScreenProps {
  onComplete: () => void;
}

export function BiosScreen({ onComplete }: BiosScreenProps) {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"logo" | "bios" | "error">("logo");

  const biosText = `Award Modular BIOS v4.51PG, An Energy Star Ally
Copyright (C) 1984-2015, Award Software, Inc.

NIRD Custom BIOS for H81M-S2PV
Release: 08/15/2015

Intel(R) Core(TM) i5-4460 CPU @ 3.20GHz

Memory Test :   8192K OK
Memory Test :  16384K OK
Memory Test :  24576K OK
Memory Test :  32768K OK

Award Plug and Play BIOS Extension v1.0A
Initializing Plug and Play Cards...
PNP Init Completed

Detecting IDE Primary Master   ... WDC WD10EZEX-00W
Detecting IDE Primary Slave    ... None
Detecting IDE Secondary Master ... HL-DT-ST DVDRAM
Detecting IDE Secondary Slave  ... None

Press DEL to enter SETUP, ESC to skip memory test
08/15/2015-H81-NIRD-00

Boot from CD/DVD :`;

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setPhase("bios");
    }, 1500);

    return () => clearTimeout(logoTimer);
  }, []);

  useEffect(() => {
    if (phase !== "bios") return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < biosText.length) {
        const charsToAdd = Math.min(3, biosText.length - index);
        setDisplayText(biosText.substring(0, index + charsToAdd));
        index += charsToAdd;
      } else {
        clearInterval(interval);
        setTimeout(() => setPhase("error"), 300);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [phase, biosText]);

  useEffect(() => {
    if (phase !== "error") return;

    const timer = setTimeout(onComplete, 1000);
    return () => clearTimeout(timer);
  }, [phase, onComplete]);

  if (phase === "logo") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-black font-mono">
        <pre className="text-[6px] leading-[6px] text-cyan-400 sm:text-[8px] sm:leading-[8px] md:text-[10px] md:leading-[10px]">
          {ASCII_LOGO}
        </pre>
        <div className="mt-6 animate-pulse text-sm text-gray-500">
          Press DEL to run Setup
        </div>
        <div className="mt-2 text-xs text-gray-600">
          08/15/2015-H81-NIRD-00
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-hidden bg-black p-2 font-mono text-[10px] leading-[14px] text-gray-300 sm:p-4 sm:text-xs sm:leading-4 md:text-sm md:leading-5">
      <pre className="whitespace-pre-wrap">
        {displayText}
        <span className="animate-pulse">_</span>
      </pre>

      {phase === "error" && (
        <div className="mt-4">
          <div className="text-white">DISK BOOT FAILURE, INSERT SYSTEM DISK AND PRESS ENTER</div>
          <div className="mt-2 animate-pulse text-red-500">
            *** FATAL: No bootable device found ***
          </div>
        </div>
      )}
    </div>
  );
}
