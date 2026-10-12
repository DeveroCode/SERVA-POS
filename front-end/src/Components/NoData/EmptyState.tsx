type EmptyStateProps = {
    title?: string;
    description?: string;
    actionButton?: React.ReactNode;
}


export function EmptyState({
  title = "No hay registros disponibles",
  description = "No encontramos información para mostrar en este momento.",
  actionButton,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center max-w-sm mx-auto">
      {/* Ilustración Vectorial */}
      <div className="w-32 h-32 mb-4 shrink-0">
        <img
          src="/logos/not_found.svg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Contenido Textual */}
      <h3 className="text-sm font-bold text-slate-800 mb-1">{title}</h3>
      <p className="text-xs text-slate-500 mb-4 leading-relaxed">{description}</p>

      {/* Botón de Acción Opcional */}
      {actionButton && <div>{actionButton}</div>}
    </div>
  );
}