export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const ROLE_LABELS: Record<
  string,
  {
    label: string;
    className: string;
  }
> = {
  OWNER: {
    label: "Propietario",
    className: "bg-purple-50 text-purple-700 border-purple-200",
  },
  ADMIN: {
    label: "Administrador",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  USER: {
    label: "Usuario",
    className: "bg-slate-50 text-slate-600 border-slate-200",
  },
};

// utils/generateUserKey.ts
const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

export function generateUserKey(name: string, lastName: string): string {
  const first = normalize(name.trim().split(/\s+/)[0] ?? "");
  const last = normalize(lastName.trim().split(/\s+/)[0] ?? "");

  const base = `${first.charAt(0)}${last}` || first || "user";

  const suffix = Math.floor(1000 + Math.random() * 9000);

  return `${base}${suffix}`;
}