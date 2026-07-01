import { useEffect, useState } from "react";
import { ABackgrounds } from "@/data/ABackgrounds";

const CHANGE_TIME = 3000;
const ANIMATION_TIME = 250;

export default function CAuth() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (current + 1) % ABackgrounds.length;

      setNext(nextIndex);
      setAnimating(true);

      setTimeout(() => {
        setCurrent(nextIndex);
        setNext(null);
        setAnimating(false);
      }, ANIMATION_TIME);
    }, CHANGE_TIME);

    return () => clearInterval(interval);
  }, [current]);

  return (
    <div
      className="relative
                w-full
                max-w-xl
                h-180
                overflow-hidden
                rounded-3xl
                shadow-2xl
                select-none"
    >
      {/* Imagen actual */}
      <img
        key={ABackgrounds[current].id}
        src={ABackgrounds[current].url}
        alt={ABackgrounds[current].alt}
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-450 ${
          animating ? "-translate-x-full" : "translate-x-0"
        }`}
      />

      {/* Imagen siguiente */}
      {next !== null && (
        <img
          key={ABackgrounds[next].id}
          src={ABackgrounds[next].url}
          alt={ABackgrounds[next].alt}
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-450 ${
            animating ? "translate-x-0" : "translate-x-full"
          }`}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
    </div>
  );
}
