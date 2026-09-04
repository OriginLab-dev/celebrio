"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "../../lib/supabase";

const occasionTags = {
  teacher: "Thank You",
  birthday: "Happy Birthday",
  appreciation: "Thank You",
  graduation: "A New Chapter Begins",
  anniversary: "To The One Who Means Everything",
  custom: "A Card Made Just For You",
};

export default function CardPage() {
  const params = useParams();

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function loadCard() {
      const { data, error } = await supabase
        .from("cards")
        .select("*")
        .eq("slug", params.slug)
        .maybeSingle();

      if (error) {
        console.error("Could not load card:", error);
        setCard(null);
      } else {
        setCard(data);
      }

      setLoading(false);
    }

    if (params.slug) {
      loadCard();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <main className="public-card-loading">
        <p>Preparing your card...</p>
      </main>
    );
  }

  if (!card) {
    return (
      <main className="public-card-loading">
        <div className="public-card-not-found">
          <div className="public-card-not-found-icon">💌</div>

          <h1>Data does not exist</h1>

          <p>
            This card link is invalid or the card has been removed.
          </p>

          <Link href="/" className="create-btn">
            Go to Celebrio
          </Link>
        </div>
      </main>
    );
  }

  const occasionTag =
    occasionTags[card.occasion] ||
    card.occasion ||
    "A special moment";

  const name = card.recipient_name
    ? ` ${card.recipient_name}`
    : "";

  function handleEnvelopeClick() {
    setIsOpen((current) => !current);
  }

  return (
    <main
      className={`public-card-page ${
        isOpen ? "public-card-is-open" : ""
      } create-theme-${card.theme}`}
    >
      <div className="public-card-intro">
        <p className="create-eyebrow">
          Someone made this for you <span>♥</span>
        </p>

        <h1>
          {isOpen ? "A special message for you" : "You have a card"}
        </h1>

        <p>
          {isOpen
            ? "Click the envelope to close your card."
            : "Click the envelope to open your card."}
        </p>
      </div>

      <section className="public-card-stage">

        {/* CLICKABLE ENVELOPE */}
        <div
          className={`create-envelope-stage public-envelope-stage ${
            isOpen ? "is-open" : ""
          }`}
          onClick={handleEnvelopeClick}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              handleEnvelopeClick();
            }
          }}
        >

          <div className="create-envelope">

            {/* ENVELOPE */}
            <div
              className={`create-env-shape create-theme-${card.theme}`}
            >

              {/* NEW REAL FLAP */}
              <div className="public-envelope-flap" />

              {/* SEAL */}
              <span>{card.seal}</span>

            </div>

            {/* EXACT SAME CARD AS CREATE PAGE */}
            <article className="create-card-preview">

              {card.deco && <i>✦</i>}

              <small>{occasionTag}</small>

              <h3>
                {card.salutation || "Dear"} {name},
              </h3>

              {card.heading && (
                <h4>{card.heading}</h4>
              )}

              {card.photo_data_url && (
                <div className="create-photo-frame">

                  <img
                    className="create-card-photo"
                    src={card.photo_data_url}
                    alt="Card artwork"
                  />

                  {card.sticky && card.quote && (
                    <span
                      className={`create-sticky-note create-sticky-${card.theme}`}
                    >
                      “{card.quote}”
                    </span>
                  )}

                </div>
              )}

              <p>{card.message}</p>

              <strong>{card.closing}</strong>

              {card.quote &&
                !(card.sticky && card.photo_data_url) && (
                  <blockquote>
                    “{card.quote}”
                  </blockquote>
                )}

              {!card.hide_sender && card.sender_name && (
                <footer>
                  -{" "}
                  {card.sender_tag
                    ? `${card.sender_tag}, `
                    : ""}
                  {card.sender_name}
                </footer>
              )}

            </article>
          </div>
        </div>

        <p className="public-card-hint">
          {isOpen
            ? "Click to close"
            : "Click the envelope to open"}
        </p>

      </section>
    </main>
  );
}