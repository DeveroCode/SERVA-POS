import type { ScheduleDataForm } from "@/types/Branch.types";
import { isAxiosError } from "axios";

export const avatarColors = [
    "bg-blue-600",
    "bg-emerald-600",
    "bg-purple-600",
    "bg-pink-600",
    "bg-cyan-700",
    "bg-indigo-600",
    "bg-rose-600",
    "bg-teal-600",
];

export const DEFAULT_SCHEDULE_DAYS: ScheduleDataForm["schedule"] = [
  { day: "lunes", isOpen: true, openTime: "08:00", closeTime: "20:00" },
  { day: "martes", isOpen: true, openTime: "08:00", closeTime: "20:00" },
  { day: "miércoles", isOpen: true, openTime: "08:00", closeTime: "20:00" },
  { day: "jueves", isOpen: true, openTime: "08:00", closeTime: "20:00" },
  { day: "viernes", isOpen: true, openTime: "08:00", closeTime: "22:00" },
  { day: "sábado", isOpen: true, openTime: "09:00", closeTime: "22:00" },
  { day: "domingo", isOpen: false, openTime: "09:00", closeTime: "18:00" },
];


export function getGreeting(lang: "es" | "en" = "en"): string {
    const hour = new Date().getHours();

    if (lang === 'es') {
        if (hour >= 5 && hour < 12) return "Buenos días!";
        if (hour >= 12 && hour < 18) return "Buenas tardes!";
        return "Buenas noches!";
    }

    // Eng
    if (hour >= 5 && hour < 12) return "Good morning!";
    if (hour >= 12 && hour < 18) return "Good afternoon!";
    return "Good evening!";
}


export const USER_ROLES = {
    OWNER: "owner",
    ADMIN: "admin",
    USER: "user",
}
export const USER_ROLES_EXPLAIN = {
    OWNER: "Propietario (Owner)",
    ADMIN: "Administrador Global (Admin)",
    USER: "Usuario Estándar (User)",
}

export function getUserInitials(name: string, lastNames: string): string {
    const firstInitial = name.charAt(0).toUpperCase();
    const lastInitial = lastNames.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`
}

export function getApiErrorMessage(error: Error): string {
    if (isAxiosError(error) && error.response) {
        const data = error.response.data;

        if (data?.message) {
            return data.message;
        }

        if (Array.isArray(data?.errors) && data.errors.length > 0) {
            return data.errors[0];
        }
    }

    return "Ocurrió un error inesperado.";
}

export function formatActivityDate(date: string | Date): string {
    const targetDate = new Date(date);
    const now = new Date();

    if (Number.isNaN(targetDate.getTime())) {
        return 'Fecha inválida';
    }

    const diffMs = targetDate.getTime() - now.getTime();

    // Future Date
    if (diffMs < 0) {
        return "Ahora";
    }

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    // This day
    if (targetDate.toDateString() === now.toDateString()) {
        if (seconds < 60) {
            return seconds === 1 ? `${seconds} segundo` : `${seconds} segundos`;
        }
        if (minutes < 60) {
            return minutes === 1 ? `${minutes} minuto` : `${minutes} minutos`;
        }

        return hours === 1 ? `${hours} hora` : `${hours} horas`;
    }

    // Yesterday
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (targetDate.toDateString() === yesterday.toDateString()) {
        return "Ayer";
    }

    // This Month and year
    if (
        targetDate.getMonth() === now.getMonth() &&
        targetDate.getFullYear() === now.getFullYear()
    ) {
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        return days === 1
            ? "Hace 1 día"
            : `Hace ${days} días`;
    }

    return "Inactivo"
}
export const pluralize = (count: number, singular: string, plural: string) =>
    count === 1 ? singular : plural;
export function getAvatarColor(id: string) {
    let hash = 0;

    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }

    return avatarColors[Math.abs(hash) % avatarColors.length];
}

export function getInitials(name?: string, lastName?: string) {
    const firstNameInitial = name?.trim().charAt(0) ?? "";
    const lastNameInitial = lastName?.trim().charAt(0) ?? "";

    return `${firstNameInitial}${lastNameInitial}`.toUpperCase() || "?";
}