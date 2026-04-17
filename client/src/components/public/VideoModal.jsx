export default function VideoModal({ video, onClose }) {
  if (!video) {
    return null;
  }

  return (
    <div className="video-modal-backdrop" role="presentation" onClick={onClose}>
      <div className="video-modal-card" role="dialog" aria-modal="true" aria-label={video.title} onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close video">
          x
        </button>
        <div className="video-frame-wrap">
          <iframe
            src={video.embedUrl}
            title={video.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
