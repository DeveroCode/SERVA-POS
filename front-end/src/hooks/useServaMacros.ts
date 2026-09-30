import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShorcurtsBusiness } from "@/data/Shorcurts";
import { SERVA_MACROS } from "../macros/macro.registery";

export default function useServaMacros() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const shortcut = ShorcurtsBusiness.find((item) => {
                if (!item.macro) return false;

                const macro = SERVA_MACROS[item.macro];

                return (
                    event.code === macro.code &&
                    event.ctrlKey === macro.ctrl &&
                    event.altKey === macro.alt &&
                    event.shiftKey === macro.shift
                );
            });

            if (!shortcut) return;

            event.preventDefault();

            if (shortcut.macro === "LOGOUT") {
                console.log("Logout");
                return;
            }

            navigate(shortcut.url);
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [navigate]);
}
