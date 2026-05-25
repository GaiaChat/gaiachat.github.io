import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Blocks,
  Download,
  Github,
  HardDriveDownload,
  Laptop,
  MessageSquareText,
  MonitorDown,
  Network,
  PanelsTopLeft,
  Server,
  Shield,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  UsersRound,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import globeImage from './assets/globe.webp';
import brandLogo from './assets/logo_grayscale.svg';

type WindowWithAds = Window & {
  adsbygoogle?: unknown[];
};

type DownloadLink = {
  label: string;
  href: string;
  icon: LucideIcon;
  note: string;
};

type DownloadGroup = {
  title: string;
  description: string;
  links: DownloadLink[];
};

const sourceUrl = import.meta.env.VITE_SOURCE_URL || '#source';
const usageCountUrl = import.meta.env.VITE_GAIA_USAGE_COUNT_URL || '/api/usage';

const downloadGroups: DownloadGroup[] = [
  {
    title: 'Gaia Launcher',
    description: 'Desktop entry point for joining hosted and self-hosted Current servers.',
    links: [
      {
        label: 'Windows',
        href: import.meta.env.VITE_GAIA_WINDOWS_URL || '/downloads/gaia-launcher-windows-x64.zip',
        icon: MonitorDown,
        note: 'x64 installer',
      },
      {
        label: 'macOS',
        href: import.meta.env.VITE_GAIA_MAC_URL || '/downloads/gaia-launcher-macos-universal.dmg',
        icon: Laptop,
        note: 'Universal build',
      },
      {
        label: 'Linux',
        href: import.meta.env.VITE_GAIA_LINUX_URL || '/downloads/gaia-launcher-linux-x64.AppImage',
        icon: HardDriveDownload,
        note: 'AppImage',
      },
    ],
  },
  {
    title: 'Current Server',
    description: 'Run a personal or community server with chat, voice, moderation, and Bluesky sign-in.',
    links: [
      {
        label: 'Windows',
        href: import.meta.env.VITE_CURRENT_SERVER_WINDOWS_URL || '/downloads/current-server-windows-x64.zip',
        icon: MonitorDown,
        note: 'Server bundle',
      },
      {
        label: 'macOS',
        href: import.meta.env.VITE_CURRENT_SERVER_MAC_URL || '/downloads/current-server-macos-universal.zip',
        icon: Laptop,
        note: 'Server bundle',
      },
      {
        label: 'Linux',
        href: import.meta.env.VITE_CURRENT_SERVER_LINUX_URL || '/downloads/current-server-linux-x64.tar.gz',
        icon: TerminalSquare,
        note: 'tar.gz bundle',
      },
    ],
  },
];

const featureItems = [
  {
    icon: Blocks,
    title: 'Launcher-first flow',
    body: 'Keep servers, accounts, and the browser handoff in a focused desktop shell.',
  },
  {
    icon: Server,
    title: 'Self-host ready',
    body: 'Current Server is built for people who want a private community without rented chat infrastructure.',
  },
  {
    icon: Shield,
    title: 'Private by default',
    body: 'The public website stays separate from login redirects, auth tickets, and message surfaces.',
  },
];

const featureDetails = [
  {
    icon: PanelsTopLeft,
    title: 'One launcher for every server',
    body: 'Gaia keeps hosted and self-hosted Current servers in one focused desktop entry point.',
  },
  {
    icon: MessageSquareText,
    title: 'Chat and voice included',
    body: 'Current Server packages the community basics without sending people to a rented chat platform.',
  },
  {
    icon: Network,
    title: 'LAN or public hosting',
    body: 'Run a private local server, publish a community server, or keep both modes available.',
  },
  {
    icon: ShieldCheck,
    title: 'Auth stays separate',
    body: 'Bluesky sign-in and browser handoff stay outside the public download site and app surfaces.',
  },
  {
    icon: UsersRound,
    title: 'Community-ready foundation',
    body: 'Bring together moderation, membership, voice, and messaging in a server you control.',
  },
  {
    icon: Github,
    title: 'Open source by default',
    body: 'Review the launcher and server code, fork the site, or wire your own release downloads.',
  },
];

function App() {
  return (
    <div className="site-shell">
      <header className="site-nav">
        <a className="brand-lockup" href="#top" aria-label="Gaia Launcher home">
          <span className="brand-mark">
            <img className="tinted-logo" src={brandLogo} alt="" />
          </span>
          <span>
            <strong>Gaia Launcher</strong>
            <small>for Current Server</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#downloads">Downloads</a>
          <a href="#features">Features</a>
          <a href={sourceUrl}>Source</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <img className="hero-globe" src={globeImage} alt="" aria-hidden="true" />
          <div className="hero-veil" />
          <div className="hero-content">
            <div className="product-lockup" aria-hidden="true">
              <span className="hero-brand-mark">
                <img className="tinted-logo" src={brandLogo} alt="" />
              </span>
            </div>
            <h1 id="hero-title">Gaia Launcher</h1>
            <p>
              Download the desktop launcher and host your own Current Server for local-first chat,
              voice, and communities that do not need to live inside somebody else&apos;s platform.
            </p>
            <div className="hero-actions">
              <a className="primary-action" href="#downloads">
                <Download aria-hidden="true" />
                <span>Download</span>
              </a>
              <a className="secondary-action" href="#features">
                <Server aria-hidden="true" />
                <span>Host a Server</span>
              </a>
            </div>
            <UsagePulse />
          </div>
          <div className="launcher-preview" aria-hidden="true">
            <div className="preview-window">
              <div className="preview-topbar">
                <span />
                <span />
                <span />
              </div>
              <div className="preview-body">
                <aside>
                  <img className="tinted-logo" src={brandLogo} alt="" />
                  <span />
                  <span />
                  <span />
                </aside>
                <section>
                  <div>
                    <strong>Current Home</strong>
                    <small>online</small>
                  </div>
                  <p />
                  <p />
                  <p />
                </section>
              </div>
            </div>
          </div>
        </section>

        <section className="download-section" id="downloads" aria-labelledby="downloads-title">
          <div className="section-heading">
            <BadgeCheck aria-hidden="true" />
            <div>
              <h2 id="downloads-title">Download Builds</h2>
              <p>Launcher and server packages can point at your hosted release files through Vite env vars.</p>
            </div>
          </div>
          <div className="download-grid">
            {downloadGroups.map((group) => (
              <article className="download-card" key={group.title}>
                <div className="download-card-head">
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                </div>
                <div className="download-links">
                  {group.links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a className="download-link" href={link.href} key={`${group.title}-${link.label}`}>
                        <Icon aria-hidden="true" />
                        <span>
                          <strong>{link.label}</strong>
                          <small>{link.note}</small>
                        </span>
                        <ArrowRight aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
          <AdSenseDownloadPlacement />
        </section>

        <section className="feature-band" aria-label="Gaia and Current highlights">
          {featureItems.map((item) => {
            const Icon = item.icon;
            return (
              <article className="feature-item" key={item.title}>
                <Icon aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            );
          })}
        </section>

        <section className="features-section" id="features" aria-labelledby="features-title">
          <div className="features-copy">
            <Sparkles aria-hidden="true" />
            <span className="feature-kicker">Features</span>
            <h2 id="features-title">Built For People Running Their Own Place</h2>
            <p>
              Gaia Launcher and Current Server are designed around ownership: your server, your
              release channel, and a desktop flow that keeps setup clear.
            </p>
          </div>
          <div className="feature-detail-grid">
            {featureDetails.map((feature) => {
              const Icon = feature.icon;
              return (
                <article className="feature-detail-card" key={feature.title}>
                  <Icon aria-hidden="true" />
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="source-section" id="source">
          <div>
            <Sparkles aria-hidden="true" />
            <h2>Open Source, Self-host Friendly</h2>
            <p>
              Gaia is built in public so server owners can inspect, fork, and adapt the pieces they
              need for their own communities.
            </p>
          </div>
          <a className="source-link" href={sourceUrl}>
            <Github aria-hidden="true" />
            <span>View Source</span>
          </a>
        </section>
      </main>

      <footer>
        <span>Gaia Launcher</span>
        <span>Current Server</span>
        <span>Built for public downloads, not private chat monetization.</span>
      </footer>
    </div>
  );
}

function UsagePulse() {
  const [activeUsers, setActiveUsers] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;

    const refresh = async () => {
      try {
        const response = await fetch(usageCountUrl, { cache: 'no-store' });
        if (!response.ok) {
          throw new Error('Usage count unavailable.');
        }
        const payload = (await response.json()) as { activeUsers?: unknown };
        const count =
          typeof payload.activeUsers === 'number' && Number.isFinite(payload.activeUsers)
            ? Math.max(0, Math.round(payload.activeUsers))
            : null;
        if (!cancelled) {
          setActiveUsers(count);
        }
      } catch {
        if (!cancelled) {
          setActiveUsers(null);
        }
      }
    };

    void refresh();
    timer = window.setInterval(() => void refresh(), 45_000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  if (activeUsers === null) {
    return null;
  }

  return (
    <div className="usage-pulse" aria-live="polite">
      <span aria-hidden="true" />
      <strong>{activeUsers.toLocaleString()}</strong>
      <small>{activeUsers === 1 ? 'person using Gaia now' : 'people using Gaia now'}</small>
    </div>
  );
}

function AdSenseDownloadPlacement() {
  const client = (import.meta.env.VITE_ADSENSE_CLIENT || 'ca-pub-1998367148417325').trim();
  const slot = import.meta.env.VITE_ADSENSE_DOWNLOAD_SLOT?.trim();
  const enabled = Boolean(client && slot);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!client) {
      return;
    }
    if (initializedRef.current) {
      return;
    }
    initializedRef.current = true;

    const existingScript = document.getElementById('gaia-adsense-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'gaia-adsense-script';
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
      document.head.appendChild(script);
    }

    if (!slot) {
      return;
    }

    window.requestAnimationFrame(() => {
      const adsWindow = window as WindowWithAds;
      adsWindow.adsbygoogle = adsWindow.adsbygoogle || [];
      adsWindow.adsbygoogle.push({});
    });
  }, [client, slot]);

  if (!enabled) {
    return (
      <div className="ad-placement-wrap">
        <div className="ad-placement-note">
          <span>Sponsored Slot</span>
          <small>
            {client
              ? 'AdSense site script is installed. Add a numeric display ad slot to fill this fixed placement.'
              : 'AdSense client is missing. Set VITE_ADSENSE_CLIENT.'}
          </small>
        </div>
        <aside className="ad-download-placement ad-download-placement-preview" aria-label="Advertisement">
          <span>Advertisement</span>
          <div>Download-page display slot waiting for ad unit ID</div>
        </aside>
      </div>
    );
  }

  return (
    <div className="ad-placement-wrap">
      <aside className="ad-download-placement" aria-label="Advertisement">
        <span>Advertisement</span>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="horizontal"
          data-full-width-responsive="true"
        />
      </aside>
    </div>
  );
}

export default App;
