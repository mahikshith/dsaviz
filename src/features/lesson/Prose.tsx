/** Renders validated, escaped lesson Markdown that was converted to HTML at build time. */
export function Prose({ html, className = '' }: { html: string; className?: string }) {
  return <div className={`prose ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}
