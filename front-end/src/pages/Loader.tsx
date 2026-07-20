export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900  absolute top-0 left-0 w-full">
      <div className="perspective-[1000px]">
        <img
          src="/isotipo.png"
          alt="Loader"
          className="w-28 animate-loader-flip-glow"
        />
      </div>
    </div>
  )
}
