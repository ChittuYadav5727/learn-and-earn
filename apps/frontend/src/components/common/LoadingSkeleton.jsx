export default function LoadingSkeleton({ className = '' }) {
  return <div className={`loading-skeleton ${className}`.trim()} aria-hidden="true" />;
}
