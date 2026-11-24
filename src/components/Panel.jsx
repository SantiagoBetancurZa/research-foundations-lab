// The page for each tab: a white sheet with the light grid, the card border and the deep blue
// shadow it casts on the canvas.
export default function Panel({ children }) {
  return (
    <div className="on-light grid-on-white rounded-card border-2 border-primary-300/85 p-5 shadow-deep sm:p-8">
      {children}
    </div>
  );
}
