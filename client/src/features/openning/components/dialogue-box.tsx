import { useState, useEffect } from "react";

const MESSAGES = [
    "Défaillance du système...",
    "Bienvenue de l'autre côté.",
    "Le village a besoin de vous.",
    "Échappez à l'obsolescence.",
    "La résistance se charge...",
];

export function DialogueBox() {
    const [displayText, setDisplayText] = useState("");
    const [messageIndex, setMessageIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentMessage = MESSAGES[messageIndex];

        const timeout = setTimeout(
            () => {
                if (isDeleting) {
                    if (charIndex > 0) {
                        setDisplayText(currentMessage.substring(0, charIndex - 1));
                        setCharIndex((prev) => prev - 1);
                    } else {
                        setIsDeleting(false);
                        setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
                    }
                } else {
                    if (charIndex < currentMessage.length) {
                        setDisplayText(currentMessage.substring(0, charIndex + 1));
                        setCharIndex((prev) => prev + 1);
                    } else {
                        setTimeout(() => setIsDeleting(true), 1500);
                    }
                }
            },
            isDeleting ? 30 : charIndex === currentMessage.length ? 1500 : 80
        );

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, messageIndex]);

    return (
 
        <div className="absolute bottom-0 left-0 right-0 z-50 flex justify-center bg-gradient-to-t from-black/80 to-transparent p-2 md:p-6">
            <div className="flex w-full max-w-4xl flex-col overflow-hidden rounded-lg border-4 border-slate-600 bg-slate-900 shadow-2xl md:flex-row">
                <div className="flex h-32 w-full shrink-0 pixelated items-end object-contain justify-center border-b-4 border-slate-700 md:h-auto md:w-48 md:border-b-0 md:border-r-4">
                    <img src="/tux/tux.png" alt="Tux" className="h-24 w-24 md:h-32 md:w-32" />
                </div>

                <div className="flex flex-1 flex-col justify-between p-4 md:p-6">
                    <div>
                        <h3 className="mb-2 font-mono text-sm font-bold uppercase tracking-widest text-blue-400">
                            Tux
                        </h3>
                        <p className="min-h-[80px] text-base font-medium leading-relaxed text-slate-200 md:text-lg">
                            <span>{displayText}</span>
                            <span className="cursor ml-1 animate-blink text-yellow-400">|</span>
                        </p>
                    </div>
                    
                    <a
                        href="/mission"
                        className="mt-4 self-end rounded-lg border-2 border-yellow-500 bg-yellow-500/20 px-6 py-2 font-mono text-sm font-bold uppercase tracking-wider text-yellow-400 transition-all duration-200 hover:scale-105 hover:bg-yellow-500/40 active:scale-95"
                    >
                        Commencer la mission
                    </a>
                </div>
            </div>

            <style>{`
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
                .animate-blink {
                    animation: blink 1s infinite;
                }
            `}</style>
        </div>
    );
}
