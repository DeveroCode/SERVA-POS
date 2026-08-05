export const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};


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
export const INITIAL_BUSINESS = {
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

export const MOCK_BRANCHES: Branch[] = [
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

export const MOCK_USERS: User[] = [
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