import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Building2,
    Users,
    Shield,
    CheckCircle2,
    Edit3,
    Plus,
    UserPlus,
    Search,
    Filter,
    ArrowUpDown,
    MapPin,
    Phone,
    ExternalLink,
    MoreVertical,
    Globe,
    Mail,
    Palette,
    Image as ImageIcon,
    CreditCard,
    Settings,
    AlertTriangle,
    ChevronRight, Store,
    Trash2
} from 'lucide-react';

// ==========================================
// MOCK DATA & TYPES
// ==========================================

interface Branch {
  id: string;
  name: string;
  code: string;
  address: string;
  phone: string;
  adminName: string;
  adminAvatar: string;
  employeeCount: number;
  status: 'active' | 'busy' | 'closed';
  image: string;
  monthlyRevenue: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Employee' | 'Manager';
  branch: string;
  status: 'active' | 'invited' | 'offline';
  lastLogin: string;
  avatar: string;
}

const INITIAL_BUSINESS = {
  name: "Serva Café & Bistro Group",
  legalName: "Serva Hospitality Group S.A. de C.V.",
  tagline: "Experiencias gastronómicas artesanales e innovación culinaria urbana.",
  logo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=300&q=80",
  cover: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80",
  status: "Active Enterprise",
  email: "contacto@servacafe.com",
  phone: "+52 (55) 8432-9000",
  website: "https://servacafe.com",
  socials: {
    instagram: "@serva.cafe",
    facebook: "/servacafebistro",
    twitter: "@serva_pos"
  },
  primaryColor: "#F75C03",
  theme: "Light Minimal",
  taxId: "SHG1904128X4"
};

const MOCK_BRANCHES: Branch[] = [
  {
    id: 'br-1',
    name: 'Serva Roma Norte',
    code: 'ROM-01',
    address: 'Av. Álvaro Obregón 124, Roma Nte., CDMX',
    phone: '+52 55 1234 5678',
    adminName: 'Carlos Mendoza',
    adminAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    employeeCount: 18,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80',
    monthlyRevenue: '$482,000 MXN'
  },
  {
    id: 'br-2',
    name: 'Serva Condesa Hub',
    code: 'CND-02',
    address: 'Amsterdam 89, Hipódromo Condesa, CDMX',
    phone: '+52 55 8765 4321',
    adminName: 'Valeria Gómez',
    adminAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    employeeCount: 22,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    monthlyRevenue: '$610,000 MXN'
  },
  {
    id: 'br-3',
    name: 'Serva Polanco Express',
    code: 'POL-03',
    address: 'Anatole France 71, Polanco, CDMX',
    phone: '+52 55 4567 8901',
    adminName: 'Mateo Ortiz',
    adminAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    employeeCount: 14,
    status: 'busy',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=600&q=80',
    monthlyRevenue: '$395,000 MXN'
  }
];

const MOCK_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Carlos Mendoza',
    email: 'carlos.m@servacafe.com',
    role: 'Admin',
    branch: 'Serva Roma Norte',
    status: 'active',
    lastLogin: 'Hace 5 min',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'usr-2',
    name: 'Valeria Gómez',
    email: 'valeria.g@servacafe.com',
    role: 'Admin',
    branch: 'Serva Condesa Hub',
    status: 'active',
    lastLogin: 'Hace 1 hora',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'usr-3',
    name: 'Mateo Ortiz',
    email: 'mateo.o@servacafe.com',
    role: 'Admin',
    branch: 'Serva Polanco Express',
    status: 'active',
    lastLogin: 'Ayer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 'usr-4',
    name: 'Sofia Reyes',
    email: 'sofia.r@servacafe.com',
    role: 'Manager',
    branch: 'Serva Roma Norte',
    status: 'invited',
    lastLogin: 'Pendiente',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80'
  }
];

// Animation Container Variants
const containerVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

export default function ExampleOwerner() {
  const [searchTerm, setSearchTerm] = useState('');
  const [businessData] = useState(INITIAL_BUSINESS);

  const filteredBranches = MOCK_BRANCHES.filter(
    (b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50/60 p-4 sm:p-6 lg:p-8 space-y-8 font-sans text-gray-900 max-w-[1600px] mx-auto pb-24"
    >
      {/* ==========================================
          1. BUSINESS HERO SECTION
      ========================================== */}
      <motion.section variants={itemVariants} className="relative">
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden group">
          {/* Cover Header */}
          <div className="h-48 sm:h-64 w-full relative overflow-hidden bg-gray-900">
            <img
              src={businessData.cover}
              alt="Business Cover"
              className="w-full h-full object-cover object-center opacity-85 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            {/* Status Badge Top Right */}
            <div className="absolute top-4 right-4 flex items-center space-x-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-gray-800 tracking-wide uppercase">
                {businessData.status}
              </span>
            </div>
          </div>

          {/* Business Core Info Bar */}
          <div className="px-6 sm:px-8 pb-6 pt-0 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between -mt-16 sm:-mt-20 gap-6">
              
              {/* Logo + Identity */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
                <div className="relative group/logo">
                  <img
                    src={businessData.logo}
                    alt={businessData.name}
                    className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-4 border-white shadow-xl bg-white transition-transform duration-300"
                  />
                  <button className="absolute bottom-2 right-2 p-1.5 bg-gray-900/80 hover:bg-gray-900 text-white rounded-lg opacity-0 group-hover/logo:opacity-100 transition-opacity duration-200 backdrop-blur-sm">
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1 mb-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
                      {businessData.name}
                    </h1>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-[#F75C03] border border-orange-200/60">
                      Owner Portal
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 max-w-xl font-normal leading-relaxed">
                    {businessData.tagline}
                  </p>
                </div>
              </div>

              {/* Header Action Buttons */}
              <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
                <button className="px-4 py-2.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-all duration-200 shadow-sm flex items-center gap-2 active:scale-[0.98]">
                  <Edit3 className="w-3.5 h-3.5 text-gray-500" />
                  Editar Negocio
                </button>
                <button className="px-4 py-2.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-all duration-200 shadow-sm flex items-center gap-2 active:scale-[0.98]">
                  <UserPlus className="w-3.5 h-3.5 text-gray-500" />
                  Invitar Usuario
                </button>
                <button className="px-4.5 py-2.5 text-xs font-semibold text-white bg-[#F75C03] hover:bg-[#e05302] rounded-xl transition-all duration-200 shadow-md shadow-orange-500/10 flex items-center gap-2 active:scale-[0.98]">
                  <Plus className="w-4 h-4" />
                  Nueva Sucursal
                </button>
              </div>

            </div>

            {/* Quick Meta Stats Line */}
            <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-6 text-xs font-medium text-gray-500 overflow-x-auto">
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-gray-400" />
                <span><strong className="text-gray-900 font-semibold">{MOCK_BRANCHES.length}</strong> Sucursales Activas</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-300" />
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span><strong className="text-gray-900 font-semibold">54</strong> Empleados Totales</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-300" />
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-gray-400" />
                <span><strong className="text-gray-900 font-semibold">{MOCK_USERS.filter(u => u.role === 'Admin').length}</strong> Administradores</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-300" />
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-gray-400" />
                <a href={businessData.website} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-[#F75C03] transition-colors">
                  {businessData.website.replace('https://', '')}
                </a>
              </div>
            </div>

          </div>
        </div>
      </motion.section>

      {/* ==========================================
          2. KPI CARDS SECTION
      ========================================== */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Sucursales Activas",
            value: "12",
            subtext: "2 en expansión este año",
            icon: Building2,
            trend: "+16.6%",
            color: "text-blue-600",
            bgColor: "bg-blue-50"
          },
          {
            title: "Empleados Totales",
            value: "54",
            subtext: "En 3 ubicaciones",
            icon: Users,
            trend: "+8 este mes",
            color: "text-purple-600",
            bgColor: "bg-purple-50"
          },
          {
            title: "Administradores",
            value: "5",
            subtext: "Acceso Super Admin",
            icon: Shield,
            trend: "Control Total",
            color: "text-amber-600",
            bgColor: "bg-amber-50"
          },
          {
            title: "Estatus de Cuenta",
            value: "Operativo",
            subtext: "Plan Enterprise Serva",
            icon: CheckCircle2,
            trend: "100% Uptime",
            color: "text-emerald-600",
            bgColor: "bg-emerald-50"
          }
        ].map((kpi, idx) => {
          const IconComponent = kpi.icon;
          return (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {kpi.title}
                </span>
                <div className={`p-2.5 rounded-xl ${kpi.bgColor} transition-transform group-hover:scale-110 duration-200`}>
                  <IconComponent className={`w-5 h-5 ${kpi.color}`} />
                </div>
              </div>

              <div className="mt-3">
                <div className="text-3xl font-extrabold text-gray-900 tracking-tight">
                  {kpi.value}
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50 text-xs">
                  <span className="text-gray-500 font-normal">{kpi.subtext}</span>
                  <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {kpi.trend}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.section>

      {/* ==========================================
          3. BRANCH MANAGEMENT SECTION (CARDS GRID)
      ========================================== */}
      <motion.section variants={itemVariants} className="space-y-4">
        {/* Header & Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
              <Store className="w-5 h-5 text-[#F75C03]" />
              Gestión de Sucursales
            </h2>
            <p className="text-xs text-gray-500 font-normal">
              Acceso directo y control operativo independiente por ubicación
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar sucursal o dirección..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F75C03]/20 focus:border-[#F75C03] transition-all"
              />
            </div>

            {/* Filter Buttons */}
            <button className="p-2 text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors text-xs font-medium flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Filtrar</span>
            </button>
            <button className="p-2 text-gray-600 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-colors text-xs font-medium flex items-center gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ordenar</span>
            </button>

            <button className="px-3.5 py-2 text-xs font-semibold text-white bg-[#F75C03] hover:bg-[#e05302] rounded-xl transition-all duration-200 shadow-sm flex items-center gap-1.5 active:scale-[0.98]">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Agregar Sucursal</span>
            </button>
          </div>
        </div>

        {/* Responsive CSS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBranches.map((branch) => (
            <motion.div
              key={branch.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Branch Image Banner */}
                <div className="h-36 w-full relative overflow-hidden bg-gray-100">
                  <img
                    src={branch.image}
                    alt={branch.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase text-gray-800 shadow-sm">
                    {branch.code}
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold capitalize shadow-sm ${
                      branch.status === 'active'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {branch.status === 'active' ? 'Operando' : 'Alta Demanda'}
                    </span>
                  </div>
                </div>

                {/* Branch Details */}
                <div className="p-5 space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-[#F75C03] transition-colors flex items-center justify-between">
                      {branch.name}
                    </h3>
                    <p className="text-xs text-gray-500 flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span className="truncate">{branch.address}</span>
                    </p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-gray-100 text-xs">
                    <div className="flex items-center justify-between text-gray-600">
                      <span className="text-gray-400 flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" /> Teléfono:
                      </span>
                      <span className="font-medium text-gray-800">{branch.phone}</span>
                    </div>

                    <div className="flex items-center justify-between text-gray-600">
                      <span className="text-gray-400 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" /> Equipo:
                      </span>
                      <span className="font-semibold text-gray-900">{branch.employeeCount} Empleados</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-gray-400 text-xs">Administrador:</span>
                      <div className="flex items-center gap-2">
                        <img
                          src={branch.adminAvatar}
                          alt={branch.adminName}
                          className="w-5 h-5 rounded-full object-cover border border-gray-200"
                        />
                        <span className="font-semibold text-xs text-gray-800">{branch.adminName}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Branch Action Footer */}
              <div className="p-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between gap-2">
                <button className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-gray-900 hover:bg-[#F75C03] rounded-xl transition-colors duration-200 shadow-sm flex items-center justify-center gap-1.5">
                  <span>Abrir Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200/60 rounded-xl transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200/60 rounded-xl transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}

          {/* ==========================================
              4. ADD BRANCH SPECIAL CARD
          ========================================== */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#F75C03] bg-gray-50/50 hover:bg-orange-50/20 p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 min-h-[340px] group"
          >
            <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 group-hover:border-orange-300 group-hover:bg-[#F75C03] text-gray-400 group-hover:text-white flex items-center justify-center shadow-sm transition-all duration-300 mb-4">
              <Plus className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-gray-900 group-hover:text-[#F75C03] transition-colors">
              Crear Nueva Sucursal
            </h3>
            <p className="text-xs text-gray-500 max-w-xs mt-1.5 leading-relaxed font-normal">
              Despliega un nuevo punto de venta, asigna administradores y sincroniza menús en segundos.
            </p>
            <span className="mt-4 px-4 py-2 bg-white group-hover:bg-[#F75C03] text-gray-700 group-hover:text-white text-xs font-semibold rounded-xl border border-gray-200 group-hover:border-transparent shadow-sm transition-all duration-300">
              Comenzar Configuración
            </span>
          </motion.div>
        </div>
      </motion.section>

      {/* ==========================================
          5. USERS SECTION (SMALL CARDS GRID)
      ========================================== */}
      <motion.section variants={itemVariants} className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
              <Users className="w-5 h-5 text-[#F75C03]" />
              Personal & Administradores
            </h2>
            <p className="text-xs text-gray-500 font-normal">
              Gestión de roles globales e invitaciones a la plataforma
            </p>
          </div>
          <button className="text-xs font-semibold text-[#F75C03] hover:text-[#e05302] flex items-center gap-1">
            Ver todos los usuarios ({MOCK_USERS.length})
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_USERS.map((user) => (
            <motion.div
              key={user.id}
              whileHover={{ y: -2 }}
              className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-11 h-11 rounded-xl object-cover border border-gray-200 shadow-sm"
                    />
                    <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                      user.status === 'active' ? 'bg-emerald-500' : 'bg-amber-400'
                    }`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{user.name}</h4>
                    <p className="text-[11px] text-gray-400 truncate max-w-[130px]">{user.email}</p>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  user.role === 'Admin'
                    ? 'bg-purple-50 text-purple-700 border border-purple-200'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}>
                  {user.role}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-gray-500">
                  <span>Sucursal:</span>
                  <span className="font-semibold text-gray-800 truncate max-w-[120px]">{user.branch}</span>
                </div>
                <div className="flex items-center justify-between text-gray-500">
                  <span>Último acceso:</span>
                  <span className="text-gray-600">{user.lastLogin}</span>
                </div>
              </div>

              <div className="mt-3 pt-2 flex items-center justify-end gap-1 border-t border-gray-50">
                <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}

          {/* Special Invite User Card */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="rounded-2xl border-2 border-dashed border-gray-300 hover:border-[#F75C03] bg-gray-50/40 hover:bg-orange-50/20 p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 min-h-[170px]"
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-[#F75C03] flex items-center justify-center shadow-sm mb-2">
              <UserPlus className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-gray-900">Invitar Nuevo Usuario</span>
            <span className="text-[11px] text-gray-400 mt-0.5">Asigna rol de Admin o Empleado</span>
          </motion.div>
        </div>
      </motion.section>

      {/* ==========================================
          6. BUSINESS INFO & BRANDING SECTION (SIDE BY SIDE)
      ========================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Business Info (2 cols) */}
        <motion.section variants={itemVariants} className="lg:col-span-2 bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#F75C03]" />
                Información Corporativa & Contacto
              </h2>
              <p className="text-xs text-gray-500">Datos públicos e información fiscal del grupo</p>
            </div>
            <button className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
              Editar Datos
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="space-y-1">
              <span className="text-gray-400 font-medium">Nombre Legal / Razón Social</span>
              <p className="text-sm font-semibold text-gray-900">{businessData.legalName}</p>
            </div>

            <div className="space-y-1">
              <span className="text-gray-400 font-medium">RFC / Identificación Fiscal</span>
              <p className="text-sm font-semibold text-gray-900">{businessData.taxId}</p>
            </div>

            <div className="space-y-1">
              <span className="text-gray-400 font-medium">Correo Electrónico Oficial</span>
              <p className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                {businessData.email}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-gray-400 font-medium">Teléfono Principal</span>
              <p className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                {businessData.phone}
              </p>
            </div>
          </div>

        </motion.section>

        {/* 7. Branding Card (1 col) */}
        <motion.section variants={itemVariants} className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm space-y-5 flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-gray-100">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <Palette className="w-5 h-5 text-[#F75C03]" />
                Branding & Personalización
              </h2>
              <p className="text-xs text-gray-500">Identidad visual en tickets y menús</p>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Color Primario de Marca</span>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#F75C03] ring-2 ring-orange-200" />
                  <span className="font-mono text-gray-700 font-semibold">{businessData.primaryColor}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500">Tema Visual del POS</span>
                <span className="font-medium text-gray-900">{businessData.theme}</span>
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 space-y-2">
                <span className="text-[11px] font-semibold text-gray-400">Assets de Marca</span>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Logo Oficial</span>
                  <span className="text-emerald-600 font-bold">Cargado</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Portada del Menú</span>
                  <span className="text-emerald-600 font-bold">Cargado</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button className="py-2 px-3 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors flex items-center justify-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5" />
              Cambiar Logo
            </button>
            <button className="py-2 px-3 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors flex items-center justify-center gap-1.5">
              <Palette className="w-3.5 h-3.5" />
              Ver Estilos
            </button>
          </div>
        </motion.section>

      </div>

      {/* ==========================================
          8. QUICK ACTIONS SHORTCUTS
      ========================================== */}
      <motion.section variants={itemVariants} className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Accesos Rápidos de Configuración
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { label: "Nueva Sucursal", icon: Store, action: "branch" },
            { label: "Invitar Empleado", icon: UserPlus, action: "user" },
            { label: "Modificar Roles", icon: Shield, action: "roles" },
            { label: "Ajustar Branding", icon: Palette, action: "branding" },
            { label: "Facturación SaaS", icon: CreditCard, action: "billing" },
            { label: "Ajustes API", icon: Settings, action: "api" }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                className="bg-white hover:bg-gray-900 text-gray-700 hover:text-white border border-gray-200/80 rounded-2xl p-3.5 flex flex-col items-center justify-center text-center gap-2 shadow-sm transition-all duration-200 group active:scale-[0.97]"
              >
                <Icon className="w-5 h-5 text-[#F75C03] group-hover:text-white transition-colors" />
                <span className="text-xs font-semibold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </motion.section>

      {/* ==========================================
          9. DANGER ZONE (GITHUB STYLE)
      ========================================== */}
      <motion.section variants={itemVariants} className="pt-6">
        <div className="bg-red-50/30 rounded-2xl border border-red-200/80 p-6 space-y-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-red-100">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <div>
              <h3 className="text-base font-bold text-red-950">Zona de Peligro</h3>
              <p className="text-xs text-red-700/80">Acciones destructivas e irreversibles para la organización</p>
            </div>
          </div>

          <div className="space-y-4">
            
            {/* Action 1 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-red-100 shadow-sm">
              <div>
                <h4 className="text-xs font-bold text-gray-900">Desactivar Negocio Temporalmente</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Suspende el acceso de todas las sucursales y terminales POS inmediatamente.
                </p>
              </div>
              <button className="px-3.5 py-2 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 transition-colors whitespace-nowrap">
                Desactivar Negocio
              </button>
            </div>

            {/* Action 2 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-red-100 shadow-sm">
              <div>
                <h4 className="text-xs font-bold text-gray-900">Transferir Propiedad del Negocio</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Transfiere los derechos de Super Admin (Owner) a otro usuario verificado.
                </p>
              </div>
              <button className="px-3.5 py-2 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors whitespace-nowrap">
                Transferir Propiedad
              </button>
            </div>

            {/* Action 3 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white rounded-xl border border-red-200 shadow-sm">
              <div>
                <h4 className="text-xs font-bold text-red-600">Eliminar Negocio Definitivamente</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Elimina permanentemente todas las sucursales, historial de ventas, menús y datos fiscales.
                </p>
              </div>
              <button className="px-3.5 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm whitespace-nowrap">
                Eliminar Empresa
              </button>
            </div>

          </div>
        </div>
      </motion.section>

    </motion.div>
  );
}