export function getGreeting(lang: "es" | "en" = "en"):string {
    const hour = new Date().getHours();

    if(lang === 'es'){
        if(hour >=5 && hour < 12) return "¡Buenos días!";
        if(hour >=12 && hour < 18) return "¡Buenas tardes!";
        return "¡Buenas noches!";
    }

    // Eng
    if(hour >= 5 && hour < 12) return "Good morning!";
    if(hour >= 12 && hour < 18) return "Good afternoon!";
    return "Good evening!";
}


export const USER_ROLES = {
    ADMIN: "admin",
    USER: "user",
}