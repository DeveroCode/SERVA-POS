import { useState, useMemo } from 'react';
import {
    // Lucide Icons
    Search,
    Plus, X,
    Edit3,
    Eye,
    Power, ChevronLeft,
    ChevronRight, Package, CheckCircle2,
    XCircle,
    AlertTriangle,
    ArrowLeft, RefreshCw
} from 'lucide-react';

// ============================================================================
// TIPOS E INTERFACES
// ============================================================================

export type ProductStatus = 'ACTIVE' | 'INACTIVE';
export type ProductAvailability = 'AVAILABLE' | 'UNAVAILABLE';

export interface Product {
  id: string;
  name: string;
  description?: string;
  categoryId: string;
  categoryName: string;
  price: number;
  currency: string;
  status: ProductStatus;
  availability: ProductAvailability;
  imageUrl?: string;
  sku?: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
}

// ============================================================================
// DATOS DE PRUEBA (MOCKS)
// ============================================================================

const MOCK_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Entradas' },
  { id: 'cat-2', name: 'Platos Fuertes' },
  { id: 'cat-3', name: 'Bebidas' },
  { id: 'cat-4', name: 'Postres' },
  { id: 'cat-5', name: 'Coctelería' },
];

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Hamburguesa Clásica 200g',
    description: 'Carne de res premium, queso cheddar, lechuga, jitomate y aderezo especial de la casa.',
    categoryId: 'cat-2',
    categoryName: 'Platos Fuertes',
    price: 185.00,
    currency: 'MXN',
    status: 'ACTIVE',
    availability: 'AVAILABLE',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150&auto=format&fit=crop&q=80',
    sku: 'HAM-CLA-001',
    updatedAt: 'Hace 2 horas',
  },
  {
    id: 'prod-2',
    name: 'Tacos al Pastor (4 uds)',
    description: 'Carne marinada con receta tradicional, piña, cilantro y cebolla recién picada.',
    categoryId: 'cat-2',
    categoryName: 'Platos Fuertes',
    price: 120.00,
    currency: 'MXN',
    status: 'ACTIVE',
    availability: 'AVAILABLE',
    sku: 'TAC-PAS-002',
    updatedAt: 'Ayer',
  },
  {
    id: 'prod-3',
    name: 'Limonada Mineral con Menta',
    description: 'Jugo natural de limón, agua mineralizada y hojas frescas de menta.',
    categoryId: 'cat-3',
    categoryName: 'Bebidas',
    price: 55.00,
    currency: 'MXN',
    status: 'ACTIVE',
    availability: 'UNAVAILABLE', // Agotado en cocina
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=150&auto=format&fit=crop&q=80',
    sku: 'BEB-LIM-003',
    updatedAt: 'Hace 3 días',
  },
  {
    id: 'prod-4',
    name: 'Postre Limón Supremo',
    description: 'Cremoso pastel helado de limón con galleta triturada y ralladura cítrica.',
    categoryId: 'cat-4',
    categoryName: 'Postres',
    price: 85.00,
    currency: 'MXN',
    status: 'INACTIVE', // Desactivado del catálogo
    availability: 'UNAVAILABLE',
    imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=150&auto=format&fit=crop&q=80',
    sku: 'POS-LIM-004',
    updatedAt: 'Hace 1 semana',
  },
];

// ============================================================================
// COMPONENTE PRINCIPAL DEL MÓDULO DE PRODUCTOS
// ============================================================================

export default function ProductsModule() {
  // Estado de vista actual: 'LIST' | 'CREATE' | 'EDIT'
  const [currentView, setCurrentView] = useState<'LIST' | 'CREATE' | 'EDIT'>('LIST');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  
  // Estado de colecciones
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  
  // Estados de Búsqueda y Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('ALL');

  // Estados de UI auxiliares
  const [detailDrawerProduct, setDetailDrawerProduct] = useState<Product | null>(null);
  const [toggleStatusProduct, setToggleStatusProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filtrado optimizado de productos
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.sku && product.sku.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === 'ALL' || product.categoryId === selectedCategory;

      const matchesStatus =
        selectedStatus === 'ALL' || product.status === selectedStatus;

      const matchesAvailability =
        selectedAvailability === 'ALL' || product.availability === selectedAvailability;

      return matchesSearch && matchesCategory && matchesStatus && matchesAvailability;
    });
  }, [products, searchQuery, selectedCategory, selectedStatus, selectedAvailability]);

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'ALL' ||
    selectedStatus !== 'ALL' ||
    selectedAvailability !== 'ALL';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedStatus('ALL');
    setSelectedAvailability('ALL');
  };

  // Handlers
  const handleToggleProductStatus = (product: Product) => {
    const updatedStatus: ProductStatus = product.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    setProducts((prev) =>
      prev.map((p) => (p.id === product.id ? { ...p, status: updatedStatus } : p))
    );
    setToggleStatusProduct(null);
  };

  const handleSaveProduct = (productData: Partial<Product>) => {
    setIsLoading(true);
    setTimeout(() => {
      if (currentView === 'CREATE') {
        const newProduct: Product = {
          id: `prod-${Date.now()}`,
          name: productData.name || 'Nuevo Producto',
          description: productData.description || '',
          categoryId: productData.categoryId || 'cat-1',
          categoryName:
            MOCK_CATEGORIES.find((c) => c.id === productData.categoryId)?.name || 'General',
          price: productData.price || 0,
          currency: 'MXN',
          status: productData.status || 'ACTIVE',
          availability: productData.availability || 'AVAILABLE',
          imageUrl: productData.imageUrl,
          sku: productData.sku,
          updatedAt: 'Hace un momento',
        };
        setProducts([newProduct, ...products]);
      } else if (currentView === 'EDIT' && selectedProductId) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === selectedProductId
              ? {
                  ...p,
                  ...productData,
                  categoryName:
                    MOCK_CATEGORIES.find((c) => c.id === productData.categoryId)?.name ||
                    p.categoryName,
                  updatedAt: 'Hace un momento',
                }
              : p
          )
        );
      }
      setIsLoading(false);
      setCurrentView('LIST');
      setSelectedProductId(null);
    }, 600);
  };

  const editingProduct = useMemo(
    () => products.find((p) => p.id === selectedProductId),
    [products, selectedProductId]
  );

  return (
    <div className="w-full min-h-screen bg-slate-50/60 font-sans text-slate-900 pb-16">
      
      {/* ─────────────────────────────────────────────────────────────
          BREADCRUMBS & CONTEXTO DE HEADER
         ───────────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-slate-200/80 px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className="text-slate-400">Sucursal Centro</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-400">Catálogo</span>
            <span className="text-slate-300">/</span>
            <button
              onClick={() => {
                setCurrentView('LIST');
                setSelectedProductId(null);
              }}
              className={`hover:text-slate-900 transition-colors ${
                currentView === 'LIST' ? 'text-[#C2410C] font-bold' : ''
              }`}
            >
              Productos
            </button>
            {currentView === 'CREATE' && (
              <>
                <span className="text-slate-300">/</span>
                <span className="text-slate-900 font-bold">Nuevo Producto</span>
              </>
            )}
            {currentView === 'EDIT' && (
              <>
                <span className="text-slate-300">/</span>
                <span className="text-slate-900 font-bold">Editar Producto</span>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">

        {/* ─────────────────────────────────────────────────────────────
            VISTA 1: LISTADO DE PRODUCTOS (MAIN VISTA)
           ───────────────────────────────────────────────────────────── */}
        {currentView === 'LIST' && (
          <div className="space-y-6">
            
            {/* ENCABEZADO DE SECCIÓN */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Productos
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Administra los productos de tu sucursal, sus precios y disponibilidad operativa.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCurrentView('CREATE')}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#C2410C] hover:bg-[#a3360a] text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-orange-500/15 active:scale-95 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Nuevo producto</span>
              </button>
            </div>

            {/* CONTROLES: BÚSQUEDA Y FILTROS */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
                
                {/* Búsqueda */}
                <div className="lg:col-span-5 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar productos por nombre o SKU..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20 focus:border-[#C2410C] transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filtro: Categoría */}
                <div className="lg:col-span-3">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20 focus:border-[#C2410C] transition-all"
                  >
                    <option value="ALL">Todas las categorías</option>
                    {MOCK_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Filtro: Estado */}
                <div className="lg:col-span-2">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20 focus:border-[#C2410C] transition-all"
                  >
                    <option value="ALL">Todos los estados</option>
                    <option value="ACTIVE">Activos</option>
                    <option value="INACTIVE">Inactivos</option>
                  </select>
                </div>

                {/* Filtro: Disponibilidad */}
                <div className="lg:col-span-2">
                  <select
                    value={selectedAvailability}
                    onChange={(e) => setSelectedAvailability(e.target.value)}
                    className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20 focus:border-[#C2410C] transition-all"
                  >
                    <option value="ALL">Disponibilidad</option>
                    <option value="AVAILABLE">Disponibles</option>
                    <option value="UNAVAILABLE">Agotados</option>
                  </select>
                </div>
              </div>

              {/* Reset Bar */}
              {hasActiveFilters && (
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="text-slate-500 font-medium">
                    Filtros activos aplicados
                  </span>
                  <button
                    onClick={resetFilters}
                    className="text-[#C2410C] hover:underline font-bold flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    Limpiar filtros
                  </button>
                </div>
              )}
            </div>

            {/* TABLA DE PRODUCTOS (DESKTOP) / TARJETAS (MOBILE) */}
            {filteredProducts.length > 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        <th className="py-3 px-4">Producto</th>
                        <th className="py-3 px-4">Categoría</th>
                        <th className="py-3 px-4">Precio</th>
                        <th className="py-3 px-4">Estado</th>
                        <th className="py-3 px-4">Disponibilidad POS</th>
                        <th className="py-3 px-4 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-slate-50/60 transition-colors group">
                          
                          {/* Producto e Imagen */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200/80 overflow-hidden shrink-0 flex items-center justify-center">
                                {product.imageUrl ? (
                                  <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <Package className="w-5 h-5 text-slate-400" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className="font-bold text-slate-900 truncate group-hover:text-[#C2410C] transition-colors">
                                  {product.name}
                                </p>
                                <p className="text-[11px] text-slate-400 font-mono truncate">
                                  SKU: {product.sku || 'N/A'}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Categoría */}
                          <td className="py-3.5 px-4 font-medium text-slate-600">
                            {product.categoryName}
                          </td>

                          {/* Precio */}
                          <td className="py-3.5 px-4 font-bold text-slate-900 font-mono">
                            \${product.price.toFixed(2)} {product.currency}
                          </td>

                          {/* Estado Administrativo */}
                          <td className="py-3.5 px-4">
                            {product.status === 'ACTIVE' ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                Activo
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-[11px] font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                Inactivo
                              </span>
                            )}
                          </td>

                          {/* Disponibilidad Operativa POS */}
                          <td className="py-3.5 px-4">
                            {product.availability === 'AVAILABLE' ? (
                              <span className="text-slate-700 font-medium flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                Disponible
                              </span>
                            ) : (
                              <span className="text-amber-700 font-medium flex items-center gap-1">
                                <XCircle className="w-3.5 h-3.5 text-amber-600" />
                                Agotado
                              </span>
                            )}
                          </td>

                          {/* Acciones */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => setDetailDrawerProduct(product)}
                                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                                title="Ver detalles"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedProductId(product.id);
                                  setCurrentView('EDIT');
                                }}
                                className="p-1.5 text-slate-400 hover:text-[#C2410C] hover:bg-orange-50 rounded-lg transition-colors"
                                title="Editar producto"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setToggleStatusProduct(product)}
                                className={`p-1.5 rounded-lg transition-colors ${
                                  product.status === 'ACTIVE'
                                    ? 'text-slate-400 hover:text-red-600 hover:bg-red-50'
                                    : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                                }`}
                                title={product.status === 'ACTIVE' ? 'Desactivar' : 'Activar'}
                              >
                                <Power className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* PAGINACIÓN DISCRETA */}
                <div className="bg-slate-50/50 border-t border-slate-100 px-4 py-3 flex items-center justify-between text-xs text-slate-500">
                  <span>
                    Mostrando <strong>1–{filteredProducts.length}</strong> de <strong>{filteredProducts.length}</strong> productos
                  </span>
                  <div className="flex items-center gap-1">
                    <button disabled className="p-1 text-slate-300 rounded disabled:opacity-50">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button disabled className="p-1 text-slate-300 rounded disabled:opacity-50">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* EMPTY STATE: SIN RESULTADOS O SIN PRODUCTOS */
              <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center space-y-4 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200/80 text-[#C2410C] flex items-center justify-center mx-auto">
                  <Package className="w-7 h-7" />
                </div>
                {hasActiveFilters ? (
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900">No encontramos productos</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      No hay coincidencias con los filtros aplicados. Intenta modificar los términos de búsqueda.
                    </p>
                    <button
                      onClick={resetFilters}
                      className="mt-3 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                    >
                      Limpiar filtros
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900">Todavía no tienes productos</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Agrega el primer producto para comenzar a construir el menú o catálogo de tu sucursal.
                    </p>
                    <button
                      onClick={() => setCurrentView('CREATE')}
                      className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-[#C2410C] hover:bg-[#a3360a] text-white text-xs font-bold rounded-xl transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Crear primer producto</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            VISTA 2 & 3: FORMULARIO CREAR Y EDITAR PRODUCTO
           ───────────────────────────────────────────────────────────── */}
        {(currentView === 'CREATE' || currentView === 'EDIT') && (
          <ProductFormView
            mode={currentView}
            initialData={currentView === 'EDIT' ? editingProduct : undefined}
            onCancel={() => {
              setCurrentView('LIST');
              setSelectedProductId(null);
            }}
            onSave={handleSaveProduct}
            isLoading={isLoading}
          />
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          DRAWER / PANEL LATERAL: DETALLES DE LECTURA DE PRODUCTO
         ───────────────────────────────────────────────────────────── */}
      {detailDrawerProduct && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="p-6 space-y-6">
              
              {/* Header Drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Detalles del Producto
                </span>
                <button
                  onClick={() => setDetailDrawerProduct(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Imagen y Titular */}
              <div className="space-y-3">
                <div className="w-full h-48 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center">
                  {detailDrawerProduct.imageUrl ? (
                    <img
                      src={detailDrawerProduct.imageUrl}
                      alt={detailDrawerProduct.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Package className="w-12 h-12 text-slate-300" />
                  )}
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {detailDrawerProduct.name}
                  </h2>
                  <p className="text-xs text-slate-500 font-mono">
                    SKU: {detailDrawerProduct.sku || 'No asignado'}
                  </p>
                </div>
              </div>

              {/* Ficha Informativa */}
              <div className="space-y-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-slate-400 font-medium">Descripción</span>
                  <p className="text-slate-700 leading-relaxed">
                    {detailDrawerProduct.description || 'Sin descripción registrada.'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                    <span className="text-slate-400 font-medium">Precio</span>
                    <p className="text-slate-900 font-bold font-mono text-sm">
                      \${detailDrawerProduct.price.toFixed(2)} {detailDrawerProduct.currency}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                    <span className="text-slate-400 font-medium">Categoría</span>
                    <p className="text-slate-800 font-bold">
                      {detailDrawerProduct.categoryName}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                    <span className="text-slate-400 font-medium">Estado</span>
                    <div>
                      {detailDrawerProduct.status === 'ACTIVE' ? (
                        <span className="text-emerald-700 font-bold">Activo</span>
                      ) : (
                        <span className="text-slate-500 font-bold">Inactivo</span>
                      )}
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl space-y-0.5">
                    <span className="text-slate-400 font-medium">Disponibilidad POS</span>
                    <div>
                      {detailDrawerProduct.availability === 'AVAILABLE' ? (
                        <span className="text-emerald-700 font-bold">Disponible</span>
                      ) : (
                        <span className="text-amber-700 font-bold">Agotado</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Drawer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <button
                onClick={() => {
                  setSelectedProductId(detailDrawerProduct.id);
                  setDetailDrawerProduct(null);
                  setCurrentView('EDIT');
                }}
                className="w-full py-2.5 bg-[#C2410C] hover:bg-[#a3360a] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>Editar este producto</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL DE CONFIRMACIÓN: CAMBIO DE ESTADO
         ───────────────────────────────────────────────────────────── */}
      {toggleStatusProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {toggleStatusProduct.status === 'ACTIVE'
                    ? '¿Desactivar producto?'
                    : '¿Reactivar producto?'}
                </h3>
                <p className="text-xs text-slate-500">
                  {toggleStatusProduct.name}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {toggleStatusProduct.status === 'ACTIVE'
                ? 'Al desactivar el producto, este no aparecerá disponible para venta en las terminales POS ni en el menú digital de la sucursal.'
                : 'El producto volverá a estar disponible en el catálogo administrativo y listo para publicarse en la sucursal.'}
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setToggleStatusProduct(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleToggleProductStatus(toggleStatusProduct)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#C2410C] hover:bg-[#a3360a] rounded-xl transition-colors"
              >
                Confirmar cambio
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ============================================================================
// COMPONENTE SECUNDARIO: FORMULARIO (CREAR / EDITAR)
// ============================================================================

interface ProductFormViewProps {
  mode: 'CREATE' | 'EDIT';
  initialData?: Product;
  onCancel: () => void;
  onSave: (data: Partial<Product>) => void;
  isLoading?: boolean;
}

function ProductFormView({
  mode,
  initialData,
  onCancel,
  onSave,
  isLoading,
}: ProductFormViewProps) {
  const [formData, setFormData] = useState<Partial<Product>>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    categoryId: initialData?.categoryId || 'cat-1',
    price: initialData?.price || 0,
    status: initialData?.status || 'ACTIVE',
    availability: initialData?.availability || 'AVAILABLE',
    sku: initialData?.sku || '',
    imageUrl: initialData?.imageUrl || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name?.trim()) newErrors.name = 'El nombre del producto es obligatorio.';
    if (formData.price === undefined || formData.price < 0)
      newErrors.price = 'Ingresa un precio válido.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Encabezado Formulario */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            title="Volver"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">
              {mode === 'CREATE' ? 'Nuevo Producto' : `Editar: ${initialData?.name}`}
            </h1>
            <p className="text-xs text-slate-500">
              {mode === 'CREATE'
                ? 'Agrega un nuevo elemento al catálogo de esta sucursal.'
                : 'Actualiza los datos y configuración del producto.'}
            </p>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SECCIÓN 1: INFORMACIÓN GENERAL */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-4 shadow-sm">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-100">
            Información General
          </h2>

          <div className="space-y-4 text-xs">
            {/* Nombre */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Nombre del producto <span className="text-[#C2410C]">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej. Tacos al Pastor (4 uds)"
                className={`w-full p-2.5 bg-slate-50 border rounded-xl font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20 ${
                  errors.name ? 'border-red-500' : 'border-slate-200 focus:border-[#C2410C]'
                }`}
              />
              {errors.name && <p className="text-red-600 text-[11px] mt-1">{errors.name}</p>}
            </div>

            {/* Categoría & SKU */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Categoría</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20 focus:border-[#C2410C]"
                >
                  {MOCK_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Código SKU (Opcional)</label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="Ej. TAC-PAS-002"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20 focus:border-[#C2410C]"
                />
              </div>
            </div>

            {/* Descripción */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">Descripción corta</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe los ingredientes, alérgenos o acompañamientos del platillo..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20 focus:border-[#C2410C]"
              />
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: PRECIO Y MONEDA */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-4 shadow-sm">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-100">
            Precio de Venta
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Precio al público <span className="text-[#C2410C]">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold font-mono">
                  \$
                </span>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                  className={`w-full pl-8 pr-4 p-2.5 bg-slate-50 border rounded-xl font-bold font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20 ${
                    errors.price ? 'border-red-500' : 'border-slate-200 focus:border-[#C2410C]'
                  }`}
                />
              </div>
              {errors.price && <p className="text-red-600 text-[11px] mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Moneda del Sistema</label>
              <input
                type="text"
                disabled
                value="MXN (Pesos Mexicanos)"
                className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl font-medium text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* SECCIÓN 3: ESTADO Y DISPONIBILIDAD */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-4 shadow-sm">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-slate-100">
            Disponibilidad y Estado
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Estado Administrativo</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as ProductStatus })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20 focus:border-[#C2410C]"
              >
                <option value="ACTIVE">Activo (Publicado)</option>
                <option value="INACTIVE">Inactivo (Oculto)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Disponibilidad en POS</label>
              <select
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value as ProductAvailability })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#C2410C]/20 focus:border-[#C2410C]"
              >
                <option value="AVAILABLE">Disponible para venta</option>
                <option value="UNAVAILABLE">Agotado en cocina</option>
              </select>
            </div>
          </div>
        </div>

        {/* ACCIONES DEL FORMULARIO */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#C2410C] hover:bg-[#a3360a] rounded-xl transition-all shadow-md shadow-orange-500/15 flex items-center gap-2 active:scale-95 disabled:opacity-50"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <span>{mode === 'CREATE' ? 'Guardar producto' : 'Guardar cambios'}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
