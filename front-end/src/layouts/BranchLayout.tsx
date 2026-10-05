import { useState } from 'react';
import {
    Building2,
    MapPin,
    Phone,
    Mail,
    Clock,
    Users,
    Edit3,
    ChevronRight,
    ArrowLeft,
    ExternalLink, Settings,
    Printer,
    AlertTriangle, Copy,
    Check
} from 'lucide-react';

interface BranchMember {
  id: string;
  name: string;
  role: string;
  avatarBg: string;
  avatarText: string;
}

interface ScheduleDay {
  day: string;
  hours: string;
  isToday?: boolean;
}

const MOCK_BRANCH_MEMBERS: BranchMember[] = [
  { id: '1', name: 'Carlos Mendoza', role: 'Owner / Propietario', avatarBg: 'bg-orange-100 border-orange-200 text-[#C2410C]', avatarText: 'CM' },
  { id: '2', name: 'Mariana Ríos', role: 'Gerente de Sucursal', avatarBg: 'bg-slate-100 border-slate-200 text-slate-700', avatarText: 'MR' },
  { id: '3', name: 'Jorge Gutierrez', role: 'Encargado de Caja', avatarBg: 'bg-slate-100 border-slate-200 text-slate-700', avatarText: 'JG' },
];

const MOCK_SCHEDULE: ScheduleDay[] = [
  { day: 'Lunes', hours: '08:00 — 20:00' },
  { day: 'Martes', hours: '08:00 — 20:00' },
  { day: 'Miércoles', hours: '08:00 — 20:00' },
  { day: 'Jueves', hours: '08:00 — 20:00', isToday: true },
  { day: 'Viernes', hours: '08:00 — 22:00' },
  { day: 'Sábado', hours: '09:00 — 22:00' },
  { day: 'Domingo', hours: '09:00 — 18:00' },
];

export default function BranchLayout() {
  const [copiedCode, setCopiedCode] = useState(false);
  const [isBranchActive, setIsBranchActive] = useState(true);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('BR-NCG-001');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50/60 font-sans text-slate-900 pb-16 selection:bg-orange-100 selection:text-orange-900">
      
      {/* ─────────────────────────────────────────────────────────────
          1. BREADCRUMBS & GLOBAL TOP BAR
         ───────────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-200/80 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <button
              type="button"
              className="hover:text-slate-900 transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Volver a</span> Sucursales
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-400">Mi Restaurante S.A.</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-900 font-semibold truncate">Sucursal Centro</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200/90 hover:bg-slate-50 rounded-xl transition-all shadow-sm active:scale-95"
            >
              <span>Cambiar sucursal</span>
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-6">

        {/* ─────────────────────────────────────────────────────────────
            2. HERO / HEADER DE LA SUCURSAL
           ───────────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-[24px] border border-slate-200/90 p-6 sm:p-8 shadow-sm relative overflow-hidden">
          
          {/* Subtle Top Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#C2410C]" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            
            {/* Identity Group */}
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-orange-50 border border-orange-200/80 text-[#C2410C] flex items-center justify-center shrink-0 shadow-sm">
                <Building2 className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
                    Sucursal Centro
                  </h1>

                  {/* Dynamic Status Badge */}
                  {isBranchActive ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Activa
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      Inactiva
                    </span>
                  )}

                  {/* Active Context Tag */}
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-200/70 text-[#C2410C] text-[11px] font-semibold">
                    Contexto Actual
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Av. Constitución 402, Col. Centro — Nuevo Casas Grandes, Chih.</span>
                </p>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#C2410C] hover:bg-[#a3360a] rounded-xl transition-all shadow-md shadow-orange-500/15 active:scale-95"
              >
                <Edit3 className="w-4 h-4" />
                <span>Editar Sucursal</span>
              </button>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. TWO-COLUMN LAYOUT (GRID 8:4 / 12 COLS)
           ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* =========================================================
              COLUMNA IZQUIERDA (MAIN CONTENT - 8 COLS)
             ========================================================= */}
          <div className="lg:col-span-8 space-y-6">

            {/* CARD 1: INFORMACIÓN GENERAL */}
            <div className="bg-white rounded-[20px] border border-slate-200/90 p-6 space-y-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Información General
                </h2>
                <span className="text-[11px] font-medium text-slate-400">
                  Registrada el 12 Ene 2024
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs">
                <div className="space-y-1">
                  <span className="text-slate-400 font-medium">Nombre de la Sucursal</span>
                  <p className="text-slate-900 font-bold text-sm">Sucursal Centro</p>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-medium">Código Identificador (ID)</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      BR-NCG-001
                    </span>
                    <button
                      onClick={handleCopyCode}
                      className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors"
                      title="Copiar código"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-medium">Tipo de Establecimiento</span>
                  <p className="text-slate-800 font-semibold">Restaurante / Sucursal Principal</p>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-medium">Régimen / Razón Social</span>
                  <p className="text-slate-800 font-semibold">Mi Restaurante S.A. de C.V.</p>
                </div>

                <div className="sm:col-span-2 space-y-1 pt-1">
                  <span className="text-slate-400 font-medium">Descripción / Notas Internas</span>
                  <p className="text-slate-600 leading-relaxed bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                    Sucursal matriz de atención en comedor, servicio para llevar y terminales POS de caja principal.
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 2: UBICACIÓN Y DIRECCIÓN */}
            <div className="bg-white rounded-[20px] border border-slate-200/90 p-6 space-y-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C2410C]" />
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Ubicación y Dirección
                  </h2>
                </div>

                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#C2410C] hover:underline"
                >
                  <span>Abrir en Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="sm:col-span-2 space-y-1">
                  <span className="text-slate-400 font-medium">Calle y Número</span>
                  <p className="text-slate-900 font-semibold">Av. Constitución #402 (Esq. Lic. Verdad)</p>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-medium">Colonia / Zona</span>
                  <p className="text-slate-800 font-semibold">Colonia Centro</p>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-medium">Ciudad</span>
                  <p className="text-slate-800 font-semibold">Nuevo Casas Grandes</p>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-medium">Estado / Provincia</span>
                  <p className="text-slate-800 font-semibold">Chihuahua</p>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-medium">Código Postal & País</span>
                  <p className="text-slate-800 font-semibold">31700 — México</p>
                </div>
              </div>
            </div>

            {/* CARD 3: CONTACTO DE OPERACIONES */}
            <div className="bg-white rounded-[20px] border border-slate-200/90 p-6 space-y-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Datos de Contacto Directo
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-start gap-3 p-3 bg-slate-50/60 rounded-xl border border-slate-200/60">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                    <Phone className="w-4 h-4 text-[#C2410C]" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[11px] text-slate-400 font-medium">Teléfono de la Sucursal</span>
                    <p className="text-slate-900 font-bold">+52 636 123 4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50/60 rounded-xl border border-slate-200/60">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                    <Mail className="w-4 h-4 text-[#C2410C]" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[11px] text-slate-400 font-medium">Correo Operativo</span>
                    <p className="text-slate-900 font-bold truncate">centro@mirestaurante.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 4: ZONA PELIGROSA / DANGER ZONE */}
            <div className="bg-white rounded-[20px] border border-red-200/80 p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 pb-2 border-b border-red-100">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <h2 className="text-xs font-bold text-red-600 uppercase tracking-wider">
                  Acciones de Administración Sensibles
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
                <div className="space-y-0.5">
                  <h3 className="text-xs font-bold text-slate-800">
                    {isBranchActive ? 'Desactivar esta sucursal' : 'Reactivar esta sucursal'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Al desactivar, las terminales POS vinculadas no podrán registrar nuevas ventas ni pedidos.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsBranchActive(!isBranchActive)}
                  className="px-3.5 py-2 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200/80 rounded-xl transition-colors shrink-0 self-start sm:self-auto"
                >
                  {isBranchActive ? 'Desactivar Sucursal' : 'Activar Sucursal'}
                </button>
              </div>
            </div>

          </div>

          {/* =========================================================
              COLUMNA DERECHA (SIDEBAR CONTEXTUAL - 4 COLS)
             ========================================================= */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
            
            {/* WIDGET 1: ESTADO DE APERTURA & HORARIOS */}
            <div className="bg-white rounded-[20px] border border-slate-200/90 p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C2410C]" />
                  <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Horario de Atención
                  </h2>
                </div>

                {/* Status Indicator */}
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200/80">
                  Abierto ahora
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {MOCK_SCHEDULE.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between py-1.5 px-2.5 rounded-lg transition-colors ${
                      item.isToday
                        ? 'bg-orange-50/80 font-bold text-slate-900 border border-orange-200/60'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {item.isToday && <span className="w-1.5 h-1.5 rounded-full bg-[#C2410C]" />}
                      {item.day}
                    </span>
                    <span className="font-mono text-[11px] text-slate-500">{item.hours}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="w-full py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl transition-colors"
              >
                Configurar Horarios
              </button>
            </div>

            {/* WIDGET 2: PERSONAL ASIGNADO (BRANCH MEMBERS) */}
            <div className="bg-white rounded-[20px] border border-slate-200/90 p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#C2410C]" />
                  <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Personal con Acceso
                  </h2>
                </div>
                <span className="text-[11px] font-bold text-slate-400">3 Usuarios</span>
              </div>

              <div className="space-y-3">
                {MOCK_BRANCH_MEMBERS.map((member) => (
                  <div key={member.id} className="flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs shrink-0 ${member.avatarBg}`}>
                        {member.avatarText}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-800 truncate">{member.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{member.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="w-full py-2 text-xs font-bold text-[#C2410C] bg-orange-50/60 hover:bg-orange-50 border border-orange-200/60 rounded-xl transition-colors"
              >
                Gestionar Personal y Permisos
              </button>
            </div>

            {/* WIDGET 3: CONFIGURACIONES RÁPIDAS DE LA SUCURSAL */}
            <div className="bg-white rounded-[20px] border border-slate-200/90 p-5 space-y-3 shadow-sm">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-100">
                Ajustes de la Sucursal
              </h2>

              <div className="space-y-1 text-xs">
                <button
                  type="button"
                  className="w-full flex items-center justify-between p-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Printer className="w-4 h-4 text-slate-400 group-hover:text-[#C2410C]" />
                    <span className="font-medium">Impresoras y Terminales POS</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                  type="button"
                  className="w-full flex items-center justify-between p-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Settings className="w-4 h-4 text-slate-400 group-hover:text-[#C2410C]" />
                    <span className="font-medium">Impuestos y Comprobantes</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}