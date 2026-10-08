export default function FooterPOS() {
  return (
    <footer className="py-6 border-t border-slate-200/60 text-center text-xs text-slate-400 mt-auto">
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>Serva Beta POS Cloud v1.4 • Entorno Seguro</span>
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
  );
}
