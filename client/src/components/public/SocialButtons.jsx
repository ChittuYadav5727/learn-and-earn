const shareTargets = {
  linkedin: (url, text) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  x: (url, text) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  facebook: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
};

function SocialIcon({ id }) {
  const icons = {
    linkedin: (
      <path d="M6.94 8.5V18H3.78V8.5h3.16Zm.22-2.93c0 .93-.69 1.68-1.8 1.68-1.05 0-1.74-.75-1.74-1.68 0-.95.71-1.68 1.78-1.68s1.74.73 1.76 1.68Zm11.06 6.54V18h-3.16v-5.51c0-1.38-.49-2.32-1.72-2.32-.94 0-1.5.63-1.75 1.24-.09.22-.11.53-.11.84V18H8.32s.04-8.67 0-9.5h3.16v1.35c.42-.65 1.18-1.57 2.87-1.57 2.09 0 3.87 1.36 3.87 4.28Z" />
    ),
    x: <path d="M4 4h4.15l3.12 4.3L15.11 4H20l-6.57 7.4L20 20h-4.15l-3.39-4.66L8.3 20H4l6.78-7.64L4 4Z" />,
    facebook: <path d="M13.2 20v-7.06h2.37l.35-2.75H13.2V8.44c0-.79.22-1.34 1.36-1.34H16V4.64c-.25-.03-1.08-.1-2.05-.1-2.03 0-3.43 1.24-3.43 3.53v2.12H8.2v2.75h2.32V20h2.68Z" />,
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {icons[id]}
    </svg>
  );
}

export default function SocialButtons({ title }) {
  const shareUrl = window.location.href;
  const shareText = `${title} | Learn & Earn`;

  async function handleNativeShare() {
    if (!navigator.share) {
      return;
    }

    await navigator.share({
      title: 'Learn & Earn',
      text: shareText,
      url: shareUrl,
    });
  }

  return (
    <div className="social-share-row">
      <button className="share-chip" type="button" onClick={handleNativeShare} disabled={!navigator.share}>
        Quick Share
      </button>
      {Object.keys(shareTargets).map((target) => (
        <a
          key={target}
          className="social-icon-button"
          href={shareTargets[target](shareUrl, shareText)}
          target="_blank"
          rel="noreferrer"
          aria-label={`Share on ${target}`}
        >
          <SocialIcon id={target} />
        </a>
      ))}
    </div>
  );
}
