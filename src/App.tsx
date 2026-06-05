import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Blocks,
  Download,
  Github,
  HardDriveDownload,
  Laptop,
  MessageSquareText,
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

type DownloadLink = {
  label: string;
  href: string;
  icon: LucideIcon;
  note: string;
  platform?: PlatformId;
};

type DownloadGroup = {
  title: string;
  description: string;
  links: DownloadLink[];
};

type PlatformId = 'windows' | 'macos' | 'linux';

type PlatformOption = {
  id: PlatformId;
  label: string;
};

const sourceUrl = import.meta.env.VITE_SOURCE_URL || 'https://github.com/GaiaChat/gaiachat.github.io';
const gaiaReleaseTag = import.meta.env.VITE_GAIA_RELEASE_TAG || 'v0.5.0-beta.7';
const gaiaReleaseVersion = import.meta.env.VITE_GAIA_RELEASE_VERSION || '0.5.0-beta.7';
const gaiaReleaseLabel = import.meta.env.VITE_GAIA_RELEASE_LABEL || 'v0.5.0 beta 7';
const currentServerTag = 'current-server-v0.5.0';
const currentServerVersion = '0.5.0';
const gaiaReleaseUrl =
  import.meta.env.VITE_GAIA_RELEASE_URL ||
  `https://github.com/GaiaChat/Gaia-Launcher/releases/tag/${gaiaReleaseTag}`;
const currentReleaseUrl =
  import.meta.env.VITE_CURRENT_RELEASE_URL ||
  `https://github.com/GaiaChat/current/releases/tag/${currentServerTag}`;
const currentSourceUrl = import.meta.env.VITE_CURRENT_SOURCE_URL || 'https://github.com/GaiaChat/current';
const usageCountUrl = import.meta.env.VITE_GAIA_USAGE_COUNT_URL?.trim() || '';
const gaiaDownloadBaseUrl =
  import.meta.env.VITE_GAIA_DOWNLOAD_BASE_URL ||
  `https://github.com/GaiaChat/Gaia-Launcher/releases/download/${gaiaReleaseTag}`;
const currentServerDownloadBaseUrl =
  import.meta.env.VITE_CURRENT_SERVER_DOWNLOAD_BASE_URL ||
  `https://github.com/GaiaChat/current/releases/download/${currentServerTag}`;
const currentServerManifestUrl =
  import.meta.env.VITE_CURRENT_SERVER_MANIFEST_URL ||
  'https://github.com/GaiaChat/current/releases/latest/download/current-server-latest.json';

function gaiaAssetUrl(assetName: string) {
  return `${gaiaDownloadBaseUrl.replace(/\/+$/, '')}/${assetName}`;
}

function currentServerAssetUrl(assetName: string) {
  return `${currentServerDownloadBaseUrl.replace(/\/+$/, '')}/${assetName}`;
}

function detectPreferredPlatform(): PlatformId {
  if (typeof navigator === 'undefined') {
    return 'linux';
  }
  const platformText = `${navigator.platform || ''} ${navigator.userAgent || ''}`.toLowerCase();
  if (platformText.includes('mac')) {
    return 'macos';
  }
  if (platformText.includes('win')) {
    return 'windows';
  }
  return 'linux';
}

const platformOptions: PlatformOption[] = [
  { id: 'windows', label: 'Windows' },
  { id: 'macos', label: 'Mac' },
  { id: 'linux', label: 'Linux' },
];

const downloadGroups: DownloadGroup[] = [
  {
    title: 'Gaia Launcher',
    description: 'Desktop entry point for joining hosted and self-hosted Current servers.',
    links: [
      {
        label: 'Latest release',
        href: gaiaReleaseUrl,
        icon: Laptop,
        note: 'All available builds',
      },
      {
        label: 'Windows installer',
        href: gaiaAssetUrl(`GaiaLauncher-${gaiaReleaseVersion}-win-x64.exe`),
        icon: HardDriveDownload,
        note: gaiaReleaseLabel,
        platform: 'windows',
      },
      {
        label: 'Windows zip',
        href: gaiaAssetUrl(`GaiaLauncher-${gaiaReleaseVersion}-win-x64.zip`),
        icon: HardDriveDownload,
        note: gaiaReleaseLabel,
        platform: 'windows',
      },
      {
        label: 'Apple Silicon .dmg',
        href: gaiaAssetUrl(`GaiaLauncher-${gaiaReleaseVersion}-mac-arm64.dmg`),
        icon: HardDriveDownload,
        note: gaiaReleaseLabel,
        platform: 'macos',
      },
      {
        label: 'Intel Mac .dmg',
        href: gaiaAssetUrl(`GaiaLauncher-${gaiaReleaseVersion}-mac-x64.dmg`),
        icon: HardDriveDownload,
        note: gaiaReleaseLabel,
        platform: 'macos',
      },
      {
        label: 'Apple Silicon zip',
        href: gaiaAssetUrl(`GaiaLauncher-${gaiaReleaseVersion}-mac-arm64.zip`),
        icon: HardDriveDownload,
        note: gaiaReleaseLabel,
        platform: 'macos',
      },
      {
        label: 'Intel Mac zip',
        href: gaiaAssetUrl(`GaiaLauncher-${gaiaReleaseVersion}-mac-x64.zip`),
        icon: HardDriveDownload,
        note: gaiaReleaseLabel,
        platform: 'macos',
      },
      {
        label: 'Linux AppImage',
        href: gaiaAssetUrl(`GaiaLauncher-${gaiaReleaseVersion}-x86_64.AppImage`),
        icon: HardDriveDownload,
        note: gaiaReleaseLabel,
        platform: 'linux',
      },
      {
        label: 'Linux .deb',
        href: gaiaAssetUrl(`GaiaLauncher-${gaiaReleaseVersion}-amd64.deb`),
        icon: TerminalSquare,
        note: gaiaReleaseLabel,
        platform: 'linux',
      },
      {
        label: 'Linux .rpm',
        href: gaiaAssetUrl(`GaiaLauncher-${gaiaReleaseVersion}-x86_64.rpm`),
        icon: TerminalSquare,
        note: gaiaReleaseLabel,
        platform: 'linux',
      },
      {
        label: 'Linux pacman',
        href: gaiaAssetUrl(`GaiaLauncher-${gaiaReleaseVersion}-x64.pacman`),
        icon: TerminalSquare,
        note: gaiaReleaseLabel,
        platform: 'linux',
      },
      {
        label: 'Linux tar.gz',
        href: gaiaAssetUrl(`GaiaLauncher-${gaiaReleaseVersion}-x64.tar.gz`),
        icon: HardDriveDownload,
        note: gaiaReleaseLabel,
        platform: 'linux',
      },
      {
        label: 'Release notes',
        href: gaiaReleaseUrl,
        icon: Github,
        note: 'GitHub releases',
      },
    ],
  },
  {
    title: 'Current Server',
    description: 'Run a personal or community server with chat, voice, moderation, and Bluesky sign-in.',
    links: [
      {
        label: 'Latest release',
        href: currentReleaseUrl,
        icon: Laptop,
        note: 'Server packages',
      },
      {
        label: 'Windows server tar.gz',
        href: currentServerAssetUrl(`current-server-v${currentServerVersion}-windows.tar.gz`),
        icon: TerminalSquare,
        note: `v${currentServerVersion}`,
        platform: 'windows',
      },
      {
        label: 'macOS server tar.gz',
        href: currentServerAssetUrl(`current-server-v${currentServerVersion}-macos.tar.gz`),
        icon: TerminalSquare,
        note: `v${currentServerVersion}`,
        platform: 'macos',
      },
      {
        label: 'Linux server tar.gz',
        href: currentServerAssetUrl(`current-server-v${currentServerVersion}-linux.tar.gz`),
        icon: TerminalSquare,
        note: `v${currentServerVersion}`,
        platform: 'linux',
      },
      {
        label: 'Update manifest',
        href: currentServerManifestUrl,
        icon: HardDriveDownload,
        note: 'current-server-latest.json',
      },
      {
        label: 'Source',
        href: currentSourceUrl,
        icon: Github,
        note: 'Server repository',
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

const guideTopics = [
  {
    icon: Server,
    title: 'What runs on your machine',
    body: 'Gaia Launcher is the desktop shell. Current Server is the hostable service that stores server configuration, channels, member roles, messages, voice state, moderation settings, and release metadata for the communities you run.',
  },
  {
    icon: Network,
    title: 'How people connect',
    body: 'A server owner publishes a Current Server, then shares its address with members. Gaia Launcher keeps the server list, account handoff, and update path in one place so members do not need to manually juggle browser tabs and local scripts.',
  },
  {
    icon: ShieldCheck,
    title: 'Why the public site is separate',
    body: 'This website is only for public product information, release downloads, policy pages, and source links. Private chat content, login redirects, invite codes, and message surfaces stay inside the launcher and the server the owner controls.',
  },
];

const previewChatBubbles = [
  'preview-chat-bubble received preview-chat-bubble-wide',
  'preview-chat-bubble sent preview-chat-bubble-medium',
  'preview-chat-bubble received preview-chat-bubble-short',
  'preview-chat-bubble sent preview-chat-bubble-wide',
  'preview-chat-bubble received preview-chat-bubble-medium',
  'preview-chat-bubble sent preview-chat-bubble-short',
];

function App() {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId>(() => detectPreferredPlatform());
  const filteredDownloadGroups = downloadGroups.map((group) => ({
    ...group,
    links: group.links.filter((link) => !link.platform || link.platform === selectedPlatform),
  }));

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
          <a href="#about">About</a>
          <a href="#downloads">Downloads</a>
          <a href="#privacy">Privacy</a>
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
                  <div className="preview-chat-header">
                    <strong>Current Home</strong>
                    <small>online</small>
                  </div>
                  <div className="preview-chat-stream">
                    <div className="preview-chat-track">
                      {previewChatBubbles.map((className, index) => (
                        <span className={className} key={index} />
                      ))}
                    </div>
                  </div>
                  <div className="preview-input-bar">
                    <span />
                    <i />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title">
          <div className="section-heading">
            <Sparkles aria-hidden="true" />
            <div>
              <h2 id="about-title">Independent Chat Infrastructure</h2>
              <p>
                Gaia Launcher and Current Server are built for small communities that want a clear
                desktop entry point and a server they can inspect, host, and move.
              </p>
            </div>
          </div>
          <div className="editorial-grid">
            <article className="editorial-lede">
              <h3>Own the place where your group talks.</h3>
              <p>
                Gaia Launcher is a companion app for Current Server. It keeps the everyday flow
                simple: choose a server, sign in, join channels, use voice, and stay current with
                launcher and server releases.
              </p>
              <p>
                Current Server handles the community side: roles, channels, moderation, invites,
                messages, and voice-room state. The project is open source so server owners can
                review the code and choose the hosting setup that fits their group.
              </p>
            </article>
            <div className="editorial-list">
              {guideTopics.map((topic) => {
                const Icon = topic.icon;
                return (
                  <article className="editorial-card" key={topic.title}>
                    <Icon aria-hidden="true" />
                    <h3>{topic.title}</h3>
                    <p>{topic.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="download-section" id="downloads" aria-labelledby="downloads-title">
          <div className="section-heading">
            <BadgeCheck aria-hidden="true" />
            <div>
              <h2 id="downloads-title">Download Builds</h2>
              <p>
                These links point to current public GitHub releases instead of placeholder files,
                so the download path stays auditable and reachable.
              </p>
            </div>
          </div>
          <div className="platform-filter" role="group" aria-label="Download platform">
            {platformOptions.map((platform) => (
              <button
                aria-pressed={selectedPlatform === platform.id}
                className={selectedPlatform === platform.id ? 'is-active' : undefined}
                key={platform.id}
                onClick={() => setSelectedPlatform(platform.id)}
                type="button"
              >
                {platform.label}
              </button>
            ))}
          </div>
          <div className="download-grid">
            {filteredDownloadGroups.map((group) => (
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

        <section className="policy-section" id="privacy" aria-labelledby="privacy-title">
          <div>
            <ShieldCheck aria-hidden="true" />
            <h2 id="privacy-title">Privacy And Site Notes</h2>
            <p>
              The public website is a static product and release page. It does not host private
              chat content, does not ask for account credentials, and does not receive Current
              Server messages. Downloads and source links leave this site for GitHub.
            </p>
            <p>
              The launcher and server projects have their own runtime behavior once installed.
              Server owners should review the source and configure hosting, access, backups, and
              moderation for their own communities.
            </p>
          </div>
          <div className="policy-links">
            <a className="text-link" href="/privacy.html">Privacy Policy</a>
            <a className="text-link" href="/terms.html">Terms</a>
            <a className="text-link" href={sourceUrl}>Website Source</a>
          </div>
        </section>
      </main>

      <footer>
        <a href="#top">Gaia Launcher</a>
        <a href="/privacy.html">Privacy</a>
        <a href="/terms.html">Terms</a>
        <a href={sourceUrl}>Source</a>
      </footer>
    </div>
  );
}

function UsagePulse() {
  const [activeUsers, setActiveUsers] = useState<number | null>(null);

  useEffect(() => {
    if (!usageCountUrl) {
      return;
    }

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

export default App;
