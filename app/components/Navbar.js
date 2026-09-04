"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { label: "Home", href: "/" },
  { label: "Service", href: "/#service" },
];

function LeafMark() {
  return (
    <svg
      aria-hidden="true"
      className="navbar-mark"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M20.8 3.2C13.1 3.5 7.5 5.1 5.3 9.4c-1.4 2.7-.5 5.6 1.9 6.7 2.4 1.1 5.4-.1 7.2-2.4 2.6-3.3 3.3-7.2 6.4-10.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.3"
      />
      <path
        d="M3.5 21c.6-4.2 3-7.4 8.1-10.1"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.3"
      />
    </svg>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link className="navbar-brand" href="/" aria-label="Celebrio home">
          <span className="navbar-brand-name">Celebrio<LeafMark /></span>
          <span className="navbar-tagline">Thoughtfully made moments</span>
        </Link>

        <nav className="navbar-links" aria-label="Main navigation">
          {links.map((link, index) => (
            <a
              className={index === 0 ? "navbar-link navbar-link-active" : "navbar-link"}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a className="navbar-action" href="/create">
          Start creating
          <span aria-hidden="true">↗</span>
        </a>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="navbar-toggle"
          onClick={() => setIsMenuOpen((open) => !open)}
          type="button"
        >
          <span />
          <span />
        </button>
      </div>

      <nav
        className={isMenuOpen ? "navbar-mobile navbar-mobile-open" : "navbar-mobile"}
        id="mobile-navigation"
        aria-label="Mobile navigation"
      >
        {links.map((link) => (
          <a href={link.href} key={link.href} onClick={() => setIsMenuOpen(false)}>
            {link.label}
          </a>
        ))}
        <a className="navbar-mobile-action" href="/create" onClick={() => setIsMenuOpen(false)}>
          Start creating <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
