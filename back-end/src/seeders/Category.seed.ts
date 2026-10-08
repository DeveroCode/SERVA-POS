
import { Category } from "../models/Category";

const categories = [
    {
        name: "Entradas",
        icon: "Utensils",
    },
    {
        name: "Aperitivos",
        icon: "Utensils",
    },
    {
        name: "Botanas",
        icon: "Utensils",
    },
    {
        name: "Sopas",
        icon: "Soup",
    },
    {
        name: "Ensaladas",
        icon: "Salad",
    },
    {
        name: "Antojitos",
        icon: "Utensils",
    },
    {
        name: "Hamburguesas",
        icon: "Hamburger",
    },
    {
        name: "Hot Dogs",
        icon: "Utensils",
    },
    {
        name: "Pizzas",
        icon: "Pizza",
    },
    {
        name: "Pastas",
        icon: "Utensils",
    },
    {
        name: "Arroz",
        icon: "Soup",
    },
    {
        name: "Mariscos",
        icon: "Fish",
    },
    {
        name: "Pescados",
        icon: "Fish",
    },
    {
        name: "Carnes",
        icon: "Beef",
    },
    {
        name: "Pollo",
        icon: "Drumstick",
    },
    {
        name: "Cerdo",
        icon: "Beef",
    },
    {
        name: "Parrilla",
        icon: "Flame",
    },
    {
        name: "Alitas",
        icon: "Drumstick",
    },
    {
        name: "Sushi",
        icon: "Fish",
    },
    {
        name: "Ramen",
        icon: "Soup",
    },
    {
        name: "Wok",
        icon: "CookingPot",
    },
    {
        name: "Desayunos",
        icon: "Egg",
    },
    {
        name: "Guarniciones",
        icon: "Utensils",
    },
    {
        name: "Complementos",
        icon: "Plus",
    },
    {
        name: "Extras",
        icon: "Plus",
    },
    {
        name: "Salsas",
        icon: "Soup",
    },
    {
        name: "Aderezos",
        icon: "Droplets",
    },
    {
        name: "Postres",
        icon: "Cake",
    },
    {
        name: "Bebidas",
        icon: "GlassWater",
    },
    {
        name: "Alcohol",
        icon: "Wine",
    },
    {
        name: "Menú infantil",
        icon: "Baby",
    },
    {
        name: "Combos",
        icon: "Package",
    },
    {
        name: "Paquetes",
        icon: "Package",
    },
    {
        name: "Promociones",
        icon: "BadgePercent",
    },
    {
        name: "Especialidades",
        icon: "Star",
    },
    {
        name: "Temporada",
        icon: "CalendarDays",
    },
    {
        name: "Menú del día",
        icon: "CalendarDays",
    },
    {
        name: "Menú ejecutivo",
        icon: "BriefcaseBusiness",
    },
    {
        name: "Para compartir",
        icon: "Users",
    },
    {
        name: "Familiar",
        icon: "Users",
    },
];

export const seedCategories = async () => {
    try {
        const existingCategories = await Category.countDocuments();

        if (existingCategories > 0) {
            console.log("⚠️ Las categorías ya existen. Seeder omitido.");
            return;
        }

        await Category.insertMany(
            categories.map((category) => ({
                ...category,
                isActive: true,
            }))
        );

        const totalCategories = await Category.countDocuments();

        console.log(
            `✅ ${totalCategories} categorías creadas correctamente.`
        );
    } catch (error) {
        console.error("❌ Error al crear las categorías:", error);
        throw error;
    }
};