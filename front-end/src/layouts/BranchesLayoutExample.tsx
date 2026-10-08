import { useState, useMemo } from "react";
import {
  Store,
  MapPin,
  Search,
  ArrowRight,
  LogOut,
  Building2,
  Clock,
  AlertCircle,
  Plus,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";

// --- TIPOS DE DATOS ---
interface Branch {
  id: string;
  code: string;
  name: string;
  address: string;
  city: string;
  status: "active" | "closed" | "disabled";
  isLastUsed?: boolean;
  role: string;
}

// --- DATOS DE PRUEBA (MOCK) ---
const MOCK_BUSINESS = {
  name: "Taquería Los Arcos",
  taxId: "TLA-920810-HA2",
  userRole: "Administrador de Operaciones",
  userName: "Carlos Mendoza",
};

const MOCK_BRANCHES: Branch[] = [
  {
    id: "b-1",
    code: "SUC-001",
    name: "Sucursal Centro",
    address: "Av. Hidalgo #402, Col. Centro",
    city: "Nuevo Casas Grandes",
    status: "active",
    isLastUsed: true,
    role: "Administrador",
  },
  {
    id: "b-2",
    code: "SUC-002",
    name: "Sucursal Plaza Senderos",
    address: "Blvd. Tecnológico #1250, Local 12",
    city: "Nuevo Casas Grandes",
    status: "active",
    isLastUsed: false,
    role: "Administrador",
  },
  {
    id: "b-3",
    code: "SUC-003",
    name: "Sucursal Macroplaza",
    address: "Av. Las Américas #890",
    city: "Ciudad Juárez",
    status: "active",
    isLastUsed: false,
    role: "Supervisión",
  },
  {
    id: "b-4",
    code: "SUC-004",
    name: "Sucursal Madero (En remodelación)",
    address: "Calle Madero #104",
    city: "Nuevo Casas Grandes",
    status: "disabled",
    isLastUsed: false,
    role: "Sin acceso",
  },
];

export default function BranchesLayoutExample() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [userCanCreateBranch] = useState(true); // Control de permisos

  // Filtrado dinámico por término de búsqueda
  const filteredBranches = useMemo(() => {
    return MOCK_BRANCHES.filter(
      (branch) =>
        branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.address.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  // Sucursal recientemente utilizada
  const lastUsedBranch = useMemo(() => {
    return MOCK_BRANCHES.find((b) => b.isLastUsed && b.status === "active");
  }, []);

  // Manejador de selección e ingreso directo
  const handleSelectBranch = (branch: Branch) => {
    if (branch.status === "disabled") return;
    setSelectedBranchId(branch.id);
    setIsNavigating(true);

    // Simulación de transición hacia el Dashboard/POS
    setTimeout(() => {
      console.log(
        `[SERVA] Estableciendo contexto activo en Branch: ${branch.name} (${branch.id})`,
      );
      // Aquí iría el router.push('/dashboard') o dispatch de estado global
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col selection:bg-orange-100 selection:text-orange-900">
      {/* ─────────────────────────────────────────────────────────────────────────────
            1. TOP BAR (Contexto de Aplicación y Usuario)
           ───────────────────────────────────────────────────────────────────────────── */}
      <header className="bg-white border-b border-slate-200/80 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand Logo Serva */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-orange-700 text-white font-bold text-lg tracking-tight shadow-sm shadow-orange-700/20">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 tracking-tight text-base leading-none">
                SERVA
              </span>
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider mt-0.5">
                POS & Management
              </span>
            </div>
          </div>

          {/* Business & Account Info */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right pr-4 border-r border-slate-200">
              <span className="text-xs font-semibold text-slate-900 flex items-center gap-1.5 justify-end">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                {MOCK_BUSINESS.name}
              </span>
              <span className="text-[11px] text-slate-500">
                {MOCK_BUSINESS.userName} • {MOCK_BUSINESS.userRole}
              </span>
            </div>

            <button
              onClick={() => console.log("Cerrando sesión...")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-orange-700/20"
              title="Cerrar sesión activa"
            >
              <LogOut className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────────────────────
            2. CONTENIDO PRINCIPAL
           ───────────────────────────────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col">
        {/* Header de la Pantalla */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            ¿Dónde quieres trabajar hoy?
          </h1>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed">
            Selecciona una sucursal para acceder a su punto de venta,
            inventarios y panel administrativo.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────────────────
              3. BANNER: ÚLTIMA SUCURSAL UTILIZADA (FAST-TRACK)
             ───────────────────────────────────────────────────────────────────────── */}
        {lastUsedBranch && !searchQuery && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-orange-700" />
                Continuar rápida
              </span>
            </div>

            <div
              onClick={() => handleSelectBranch(lastUsedBranch)}
              className={`group relative bg-white rounded-2xl border transition-all duration-200 p-4 sm:p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:shadow-md ${
                selectedBranchId === lastUsedBranch.id
                  ? "border-orange-700 ring-2 ring-orange-700/10 bg-orange-50/30"
                  : "border-slate-200 hover:border-orange-300"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-orange-50 border border-orange-100 text-orange-700 shrink-0 group-hover:bg-orange-700 group-hover:text-white transition-colors duration-200">
                  <Store className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-slate-900 text-base group-hover:text-orange-700 transition-colors">
                      {lastUsedBranch.name}
                    </h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                      Última sesión
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    {lastUsedBranch.address}, {lastUsedBranch.city}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end sm:justify-start gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                <span className="text-xs font-semibold text-orange-700 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  {selectedBranchId === lastUsedBranch.id && isNavigating
                    ? "Entrando..."
                    : "Ingresar ahora"}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────────────────
              4. SEARCH & UTILITY BAR
             ───────────────────────────────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar sucursal por nombre, zona o código..."
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-700 focus:ring-2 focus:ring-orange-700/10 transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 hover:text-slate-600 px-1.5 py-0.5 rounded"
              >
                Limpiar
              </button>
            )}
          </div>

          <div className="text-xs text-slate-500 px-1 flex items-center justify-between sm:justify-end gap-2 shrink-0">
            <span>
              {filteredBranches.length}{" "}
              {filteredBranches.length === 1
                ? "sucursal disponible"
                : "sucursales disponibles"}
            </span>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────────────
              5. GRID DE BRANCH CARDS
             ───────────────────────────────────────────────────────────────────────── */}
        {filteredBranches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBranches.map((branch) => {
              const isDisabled = branch.status === "disabled";
              const isSelected = selectedBranchId === branch.id;

              return (
                <div
                  key={branch.id}
                  onClick={() => handleSelectBranch(branch)}
                  className={`group relative rounded-2xl border p-5 transition-all duration-200 flex flex-col justify-between ${
                    isDisabled
                      ? "bg-slate-100/70 border-slate-200 opacity-60 cursor-not-allowed"
                      : "bg-white cursor-pointer shadow-sm hover:shadow-md"
                  } ${
                    isSelected
                      ? "border-orange-700 ring-2 ring-orange-700/15 bg-orange-50/20"
                      : !isDisabled &&
                        "border-slate-200 hover:border-orange-300"
                  }`}
                >
                  <div>
                    {/* Header Card: Icono y Código */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div
                        className={`p-2.5 rounded-xl transition-colors ${
                          isDisabled
                            ? "bg-slate-200 text-slate-400"
                            : isSelected
                              ? "bg-orange-700 text-white"
                              : "bg-slate-100 text-slate-600 group-hover:bg-orange-50 group-hover:text-orange-700"
                        }`}
                      >
                        <Store className="w-5 h-5" />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/60">
                          {branch.code}
                        </span>
                      </div>
                    </div>

                    {/* Nombre y Dirección */}
                    <h3
                      className={`font-semibold text-sm leading-snug mb-1 ${
                        isDisabled
                          ? "text-slate-500"
                          : "text-slate-900 group-hover:text-orange-700 transition-colors"
                      }`}
                    >
                      {branch.name}
                    </h3>

                    <p className="text-xs text-slate-500 flex items-start gap-1.5 leading-relaxed">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>
                        {branch.address}, {branch.city}
                      </span>
                    </p>
                  </div>

                  {/* Footer Card: Rol y Acción */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    {isDisabled ? (
                      <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        Acceso restringido
                      </span>
                    ) : (
                      <>
                        <span className="text-[11px] font-medium text-slate-500">
                          Rol:{" "}
                          <strong className="text-slate-700 font-semibold">
                            {branch.role}
                          </strong>
                        </span>

                        <span className="font-semibold text-orange-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                          {isSelected && isNavigating ? (
                            <span className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-700 animate-ping" />
                              Entrando
                            </span>
                          ) : (
                            <>
                              Entrar
                              <ChevronRight className="w-4 h-4" />
                            </>
                          )}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ─────────────────────────────────────────────────────────────────────────
                6. EMPTY STATE (Sin Resultados o Sin Sucursales)
               ───────────────────────────────────────────────────────────────────────── */
          <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center max-w-md mx-auto my-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 text-orange-700 flex items-center justify-center mx-auto mb-4">
              {searchQuery ? (
                <Search className="w-6 h-6" />
              ) : (
                <AlertCircle className="w-6 h-6" />
              )}
            </div>

            {searchQuery ? (
              <>
                <h3 className="text-base font-bold text-slate-900">
                  Sin coincidencias
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-6 leading-relaxed">
                  No encontramos ninguna sucursal que coincida con{" "}
                  <strong className="text-slate-700">"{searchQuery}"</strong>.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Ver todas las sucursales
                </button>
              </>
            ) : (
              <>
                <h3 className="text-base font-bold text-slate-900">
                  No tienes sucursales asignadas
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-6 leading-relaxed">
                  Tu cuenta actualmente no tiene acceso a ninguna sucursal
                  activa dentro de {MOCK_BUSINESS.name}.
                </p>

                {userCanCreateBranch ? (
                  <button
                    onClick={() => console.log("Abrir modal de crear sucursal")}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-orange-700 hover:bg-orange-800 rounded-xl transition-all shadow-sm shadow-orange-700/20 active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    Crear primera sucursal
                  </button>
                ) : (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-xs text-slate-600">
                    Pide al administrador del negocio que modifique tus permisos
                    de acceso.
                  </div>
                )}
              </>
            )}
          </div>
        )}

          <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 text-center max-w-md mx-auto my-6 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 text-orange-700 flex items-center justify-center mx-auto mb-4">
              {searchQuery ? (
                <Search className="w-6 h-6" />
              ) : (
                <AlertCircle className="w-6 h-6" />
              )}
            </div>

            {searchQuery ? (
              <>
                <h3 className="text-base font-bold text-slate-900">
                  Sin coincidencias
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-6 leading-relaxed">
                  No encontramos ninguna sucursal que coincida con{" "}
                  <strong className="text-slate-700">"{searchQuery}"</strong>.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Ver todas las sucursales
                </button>
              </>
            ) : (
              <>
                <h3 className="text-base font-bold text-slate-900">
                  No tienes sucursales asignadas
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-6 leading-relaxed">
                  Tu cuenta actualmente no tiene acceso a ninguna sucursal
                  activa dentro de {MOCK_BUSINESS.name}.
                </p>

                {userCanCreateBranch ? (
                  <button
                    onClick={() => console.log("Abrir modal de crear sucursal")}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-orange-700 hover:bg-orange-800 rounded-xl transition-all shadow-sm shadow-orange-700/20 active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    Crear primera sucursal
                  </button>
                ) : (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-xs text-slate-600">
                    Pide al administrador del negocio que modifique tus permisos
                    de acceso.
                  </div>
                )}
              </>
            )}
          </div>
      </main>

      {/* ─────────────────────────────────────────────────────────────────────────────
            7. FOOTER DE APOYO Y SOPORTE
           ───────────────────────────────────────────────────────────────────────────── */}
      <footer className="py-6 border-t border-slate-200/60 text-center text-xs text-slate-400 mt-auto">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Serva POS Cloud v2.4 • Entorno Seguro</span>
          <a
            href="#soporte"
            onClick={(e) => {
              e.preventDefault();
              alert("Iniciando chat de soporte Serva...");
            }}
            className="hover:text-slate-600 transition-colors"
          >
            ¿Necesitas ayuda para acceder?
          </a>
        </div>
      </footer>
    </div>
  );
}
