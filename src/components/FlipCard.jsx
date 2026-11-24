import { RotateCw } from 'lucide-react';

// A card that flips to show a definition. It is a real <button> with aria-expanded, so it works
// with keyboard and screen readers; the hidden face is aria-hidden. Both faces share one grid cell,
// so the card grows with its content (text zoom) instead of cutting it off.
export default function FlipCard({ flipped, onToggle, front, back, frontClass, backClass, hint }) {
  return (
    <button
      type="button"
      aria-expanded={flipped}
      onClick={onToggle}
      className="group block w-full rounded-xl text-center [perspective:1000px]"
    >
      <span
        className={`grid min-h-72 w-full rounded-xl transition-transform duration-500 motion-reduce:transition-none [transform-style:preserve-3d] ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        <span
          aria-hidden={flipped}
          className={`flex flex-col items-center justify-center rounded-xl [backface-visibility:hidden] [grid-area:1/1] ${frontClass}`}
        >
          {front}
          <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-gray-700">
            <RotateCw size={14} />
            {hint}
          </span>
        </span>
        <span
          aria-hidden={!flipped}
          className={`flex flex-col items-center justify-center rounded-xl [backface-visibility:hidden] [grid-area:1/1] [transform:rotateY(180deg)] ${backClass}`}
        >
          {back}
        </span>
      </span>
    </button>
  );
}
