import { useState } from 'react';

export default function FlipCard({ frontContent, backContent, frontColor, backColor }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group h-72 w-full cursor-pointer [perspective:1000px]"
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          setIsFlipped(!isFlipped);
        }
      }}
    >
      <div
        className={`relative h-full w-full rounded-xl transition-all duration-500 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        <div
          className={`absolute inset-0 h-full w-full rounded-xl [backface-visibility:hidden] ${frontColor}`}
        >
          {frontContent}
        </div>
        <div
          className={`absolute inset-0 h-full w-full rounded-xl [backface-visibility:hidden] [transform:rotateY(180deg)] ${backColor}`}
        >
          {backContent}
        </div>
      </div>
    </div>
  );
}
