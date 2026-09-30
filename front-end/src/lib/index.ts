import { isAxiosError } from "axios";

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