/**
 * Pure CSS Aurora layer.
 * GPU-only animation (transform/opacity). Reduced-motion safe via globals.css.
 */
export function AuroraCanvas() {
  return (
    <div className="aurora-bg" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,var(--surface-1)_75%)]" />
    </div>
  );
}
