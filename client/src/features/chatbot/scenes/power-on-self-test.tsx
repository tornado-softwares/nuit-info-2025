import { useEffect, useState } from "react";
import { useNavigate } from "react-router"; 
import american_megatrends_logo from "@/assets/chatbot/american-megatrends-logo.png";

const boot_lines_1 = [
    "AMIBIOS(C)2007 American Legatrends, Inc.",
    "ASUS P5KPL ACPI BIOS Revision 0603",
    "CPU : Intel(R) Pentium(R) Dual CPU E2180 @ 2.00GHz",
    "Speed : 2.51GHz Count :2", 
];

const boot_lines_2 = [
    "Press DEL to run Setup",
    "Press F8 for BBS POPUP",
    "DDR2-667 in Dual-Channel Interleaved Mode",
    "Initializing USB Controllers .. Done.",
    "3584MB OK",
];


export function PowerOnSelfTestPage() {
    const navigate = useNavigate();
    const [visibleLines1, setVisibleLines1] = useState<string[]>([]);
    const [visibleLines2, setVisibleLines2] = useState<string[]>([]);
    const [bootFinished, setBootFinished] = useState(false);

     useEffect(() => {
        if (bootFinished) {
            const timer = setTimeout(() => navigate("/chatbot/loader"), 3500);
            return () => clearTimeout(timer);
        }
    }, [bootFinished, navigate]);

    useEffect(() => {
        boot_lines_1.forEach((line, index) => {
            setTimeout(() => {
                setVisibleLines1((prev) => [...prev, line]);
                if (index === boot_lines_1.length - 1) {
                    boot_lines_2.forEach((line, index) => {
                        setTimeout(() => {
                            setVisibleLines2((prev) => [...prev, line]);
                            if (index === boot_lines_2.length - 1) {
                                setBootFinished(true);
                            }
                        }, index * 250);
                    });
                }
            }, index * 350);
        });
    }, []);

   


    return <div className="h-screen relative bg-black flex flex-col gap-4 w-full p-4 font-bios ">

        <div className="flex flex-col">
            <img src={american_megatrends_logo} alt="American Megatrends Logo" className="w-90 blur-[0.7px]" />
            <p className="tracking-[3px] pl-2 leading-0">www.ami.com</p>
        </div>

        <br />

        <div className="text-xl opacity-80">
            {visibleLines1.map((line, i) => (
                <p key={i}>{line}</p>
            ))}
        </div>

        <div className="text-xl">
            {visibleLines2.map((line, i) => (
                <p key={i}>{line}</p>
            ))}
        </div>

        <div className="absolute bottom-0 py-8 text-xl">
            <p>(C) American Megatrends, Inc.</p>
            <p>64-0603-000001-00101111-022908-Bearlake-A0820000-Y2KC</p>
        </div>
    </div>

}
