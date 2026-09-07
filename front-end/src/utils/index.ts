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