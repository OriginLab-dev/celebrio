import Link from "next/link";

function LeafMark() {
  return (
    <svg aria-hidden="true" className="footer-mark" fill="none" viewBox="0 0 24 24">
      <path
        d="M20.8 3.2C13.1 3.5 7.5 5.1 5.3 9.4c-1.4 2.7-.5 5.6 1.9 6.7 2.4 1.1 5.4-.1 7.2-2.4 2.6-3.3 3.3-7.2 6.4-10.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.3"
      />
      <path d="M3.5 21c.6-4.2 3-7.4 8.1-10.1" stroke="currentColor" strokeLinecap="round" strokeWidth="1.3" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <path d="M4 20.2 5.5 16.8A8.5 8.5 0 1 1 8 19.1L4 20.2Z" />
      <path d="M9.2 8.5c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.8 1.8c.1.2.1.4-.1.6l-.6.7c.5 1 1.3 1.8 2.4 2.3l.7-.6c.2-.2.4-.2.6-.1l1.8.8c.2.1.4.3.4.5v.5c0 .3-.1.5-.4.7-.4.3-1 .4-1.5.2-2.1-.6-3.7-2.3-4.8-4.1-1.7-2.8-1.7-2.8-1.2-3.3Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <rect height="14" rx="2" width="18" x="3" y="5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-inner">
        <Link className="footer-brand" href="/" aria-label="Celebrio home">
          <span className="footer-brand-name">Celebrio<LeafMark /></span>
          <span className="footer-tagline">Thoughtfully made moments</span>
        </Link>

        <div className="footer-right">
          <nav className="footer-icons" aria-label="Contact and social links">
            <a aria-label="WhatsApp: +94 741 331 90" href="https://wa.me/9474133190" target="_blank" rel="noreferrer">
              <WhatsAppIcon />
            </a>
            <a aria-label="Email: pritam743701@gmail.com" href="mailto:pritam743701@gmail.com">
              <MailIcon />
            </a>
          </nav>

          <p className="footer-copyright">© 2026 Celebrio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
