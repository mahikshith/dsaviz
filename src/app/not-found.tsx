// Prefetch on hover or focus, not on sight: lists here link to many pages.
import { IntentLink as Link } from '@/components/ui/IntentLink';

export default function NotFound() {
  return (
    <div className="page">
      <span className="eyebrow">Page not found</span>
      <h1 style={{ fontSize: 40, margin: '8px 0 12px' }}>Nothing at this address</h1>
      <p className="lede">The page may have moved, or the lesson is not published yet.</p>
      <p style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Link href="/" className="btn btn-primary">
          Home
        </Link>
        <Link href="/patterns/" className="btn">
          Browse patterns
        </Link>
      </p>
    </div>
  );
}
