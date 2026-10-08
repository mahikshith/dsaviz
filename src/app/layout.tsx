import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/instrument-sans';
import '@fontsource-variable/jetbrains-mono';
import './globals.css';
import { SiteHeader } from '@/components/shell/SiteHeader';
import { SiteFooter } from '@/components/shell/SiteFooter';
import { ProgressProvider } from '@/features/progress/ProgressProvider';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: { default: SITE.name, template: `%s · ${SITE.name}` },
  description: SITE.description,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f7f9' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1013' },
  ],
};

// Sets the theme before first paint: the saved choice, else the system preference.
// ponytail: without JavaScript the page renders light only; add a prefers-color-scheme copy of the dark tokens if that matters.
const themeScript = `(function(){var t;try{t=localStorage.getItem('${SITE.storagePrefix}:theme')}catch(e){}if(t!=='light'&&t!=='dark'&&t!=='terminal')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <ProgressProvider>
          <SiteHeader />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </ProgressProvider>
      </body>
    </html>
  );
}
