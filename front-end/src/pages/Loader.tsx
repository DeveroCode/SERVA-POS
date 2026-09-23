export default function Loader() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-gray-900">
      <div className="perspective-[1000px]">
        <img
          src="/isotipo.png"
          alt="Loader"
          className="w-28 animate-loader-flip-glow"
        />
      </div>
    </div>
  );
}