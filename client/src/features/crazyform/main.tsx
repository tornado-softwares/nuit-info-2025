import { useState } from 'react';
import fondImage from '../../assets/form/Fond.png';

export function CrazyForm() {
    // On type explicitement le state comme un tableau de nombres
    const [pairs, setPairs] = useState<number[]>([0, 0, 0, 0, 0]);

    // La matrice est implicitement number[][], pas besoin de forcer le type ici,
    // mais pour être propre en TS on pourrait le faire.
    const chaosMatrix: number[][] = [
        [1, 3, -1, 0, -2],   
        [-2, 1, 2, 0, 1],    
        [0, -3, 1, 2, 0],    
        [1, 0, -2, 1, 3],    
        [2, 1, 0, -3, 1],    
    ];

    // On ajoute les types (: number) aux arguments
    const handleSlide = (index: number, newValue: number) => {
        const oldValue = pairs[index];
        const diff = newValue - oldValue;

        let newPairs = [...pairs];

        chaosMatrix[index].forEach((impactFactor: number, targetIndex: number) => {
            if (index === targetIndex) {
                newPairs[targetIndex] = newValue;
            } else {
                let impact = diff * impactFactor;
                let impactedValue = newPairs[targetIndex] + impact;

                if (impactedValue > 99) impactedValue = impactedValue % 100;
                if (impactedValue < 0) impactedValue = 100 + (impactedValue % 100);

                newPairs[targetIndex] = Math.round(impactedValue);
            }
        });

        setPairs(newPairs);
    };

    const formatPair = (num: number) => num.toString().padStart(2, '0');
    const fullNumber = pairs.map(formatPair).join(' ');

    return (
        <div 
            className="min-h-screen flex items-center justify-center p-4"
            style={{
                background: 'linear-gradient(to bottom, #3b82f6, #ffffff)'
            }}
        >
            <div 
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(${fondImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 1
                }}
            />
            
            <div className="max-w-md w-full bg-white/90 rounded-xl overflow-hidden relative z-10">
                
                <div className="bg-[#846248]/80 p-6 text-white text-center">
                    <h1 className="text-xl font-bold uppercase tracking-widest mb-1">
                        SWS saisie unifié 
                    </h1>
                    <p>Entrez votre numéro de téléphone</p>
                    <p>(si vous le pouvez 😈 ...)</p>
                </div>

                <div className="p-8 space-y-6">

                    <div className="bg-[#846248]/80 rounded-lg p-4 text-center shadow-inner">
                        <span className="font-mono text-3xl text-white tracking-wider font-bold drop-shadow-md">
                            {fullNumber}
                        </span>
                    </div>

                    <div className="space-y-5">
                        {pairs.map((val: number, index: number) => (
                            <div key={index} className="relative">
                                <div className="flex justify-between text-xs text-gray-500 font-bold mb-1 uppercase">
                                    <span>Secteur {index + 1}</span>
                                    <span>Calibrage: {val}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="99"
                                    value={val}
                                    onChange={(e) => handleSlide(index, parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-ew-resize accent-orange-600 hover:accent-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all"
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => alert(`Transformation réussie... ou pas.\nNuméro soumis : ${fullNumber}`)}
                        className="w-full bg-[#846248]/80 hover:bg-[#846248]/70 text-white font-bold py-3 px-4 rounded transition-colors duration-200 shadow-lg transform active:scale-95 uppercase tracking-wide text-sm">
                        Valider
                    </button>
                
                </div>
            </div>
        </div>
    );
}