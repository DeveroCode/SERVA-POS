import type { MacroKey } from "@/types/Index.types";


// Macros
// NEW_BRANCH     → CTRL + ALT + SHIFT + 1
// POS            → CTRL + ALT + SHIFT + 2
// GENERAL_ROLES  → CTRL + ALT + SHIFT + 3
// SAAS_BILLING   → CTRL + ALT + SHIFT + 4
// NEW_PERSONNEL  → CTRL + ALT + SHIFT + 5
// LOGOUT         → CTRL + ALT + SHIFT + 6

export const SERVA_MACROS: Record<MacroKey, { code: string, ctrl: boolean, alt: boolean, shift: boolean }> = {
    NEW_BRANCH: {
        code: "Digit1",
        ctrl: true,
        alt: true,
        shift: true,
    },

    POS: {
        code: "Digit2",
        ctrl: true,
        alt: true,
        shift: true,
    },

    GENERAL_ROLES: {
        code: "Digit3",
        ctrl: true,
        alt: true,
        shift: true,
    },

    SAAS_BILLING: {
        code: "Digit4",
        ctrl: true,
        alt: true,
        shift: true,
    },

    NEW_PERSONNEL: {
        code: "Digit5",
        ctrl: true,
        alt: true,
        shift: true,
    },

    LOGOUT: {
        code: "Digit6",
        ctrl: true,
        alt: true,
        shift: true,
    },
};