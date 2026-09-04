function HeartMark() {
  return (
    <svg aria-hidden="true" className="hero-heart" fill="none" viewBox="0 0 24 24">
      <path
        d="M19.5 12.6 12 20l-7.5-7.4C1.7 9.8 3.3 4.5 7.5 4.5c2 0 3.5 1.1 4.5 2.6 1-1.5 2.5-2.6 4.5-2.6 4.2 0 5.8 5.3 3 8.1Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function SparkleMark() {
  return (
    <svg aria-hidden="true" className="hero-sparkle" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function EnvelopePreview() {
  return (
    <div className="hero-artwork">
      <div className="hero-note">A little something for you</div>
      <div className="hero-envelope" aria-label="A sealed personalized card" role="img">
        <div className="hero-letter">
          <span />
          <span />
          <span />
        </div>
        <div className="hero-flap" />
        <div className="hero-pocket" />
        <div className="hero-seal">
          <HeartMark />
        </div>
      </div>
      <span className="hero-artwork-caption">Made for the moment</span>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-eyebrow">Thoughtful words, beautifully delivered</p>
          <h1>
            Turn your feelings
            <br />
            into <em>a card.</em>
          </h1>
          <div className="hero-rule" />
          <p className="hero-description">
            Create a personal digital card for the people and moments that deserve a little more than a text.
          </p>
          <div className="hero-actions">
            <a className="hero-primary-action" href="/create">
              Create my card
              <SparkleMark />
            </a>
          </div>
        </div>
        <EnvelopePreview />
      </div>
    </section>
  );
}
