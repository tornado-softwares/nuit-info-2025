import { useEffect, useState } from "react";

interface BlueScreenProps {
  onComplete: () => void;
}

export function BlueScreen({ onComplete }: BlueScreenProps) {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return Math.min(100, prev + Math.floor(Math.random() * 8) + 3);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="absolute inset-0 select-none overflow-hidden bg-[#2067B2] pl-[10%] pt-[5%] font-['Open_Sans',sans-serif] font-light text-white">
      <p className="-ml-1.5 text-[9.5em] leading-[1.35em]">:(</p>
      <p className="max-w-[800px] text-[1.7em] leading-[1.6em]">
        Votre PC a rencontré un problème et doit redémarrer. Nous collectons
        juste quelques informations sur l'erreur, puis nous redémarrerons pour
        vous. (
        <span>{percentage}</span>% terminé)
      </p>
      <p className="mt-10 max-w-[800px] text-[0.8em] leading-[1.6em]">
        Si vous souhaitez en savoir plus, vous pouvez rechercher en ligne plus tard cette erreur :
        WINDOZE_IS_A_BAD_OS
      </p>
    </div>
  );
}
