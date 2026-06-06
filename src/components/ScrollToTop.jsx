export default function ScrollToTop() {
  return (
    <button type="button" className="scroll-to-top" aria-label="Scroll to top">
      <span className="scroll-top-inner">
        <span className="scroll-bar" aria-hidden="true">
          <span className="bar-inner"></span>
        </span>
        <span className="scroll-bar-text">Go To Top</span>
      </span>
    </button>
  );
}
