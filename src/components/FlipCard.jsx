import { RotateCw } from 'lucide-react';

// A flashcard in the channel's style: the front is the white card with the term, the back is the
// blue grid with the definition. It is a real <button> with aria-expanded, so it works with
// keyboard and screen readers; the hidden face is aria-hidden. Both faces share one grid cell,
// so the card grows with its content (text zoom) instead of cutting it off.
export default function FlipCard({ flipped, onToggle, front, back, hint }) {
  return (
    <button
      type="button"
      aria-expanded={flipped}
      onClick={onToggle}
      className="press group block h-full w-full rounded-card text-center [perspective:1000px]"
    >
      <span
        className={`grid h-full min-h-72 w-full transition-transform duration-500 motion-reduce:transition-none [transform-style:preserve-3d] ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        <span
          aria-hidden={flipped}
          className="flashcard flex flex-col items-center justify-center p-6 [backface-visibility:hidden] [grid-area:1/1] group-hover:shadow-card-lg"
        >
          {front}
          <span className="mt-5 flex items-center justify-center gap-1.5 text-[13px] leading-snug text-gray-800 [text-wrap:balance]">
            <RotateCw size={14} className="shrink-0" />
            {hint}
          </span>
        </span>
        <span
          aria-hidden={!flipped}
          className="grid-on-blue flex flex-col justify-center rounded-card border-2 border-primary-500 p-6 text-left shadow-card [backface-visibility:hidden] [grid-area:1/1] [transform:rotateY(180deg)]"
        >
          {back}
        </span>
      </span>
    </button>
  );
}
