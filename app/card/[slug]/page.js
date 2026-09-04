"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function CardPage() {
  const params = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCard() {
      const { data, error } = await supabase
        .from("cards")
        .select("*")
        .eq("slug", params.slug)
        .single();

      if (error) {
        console.error(error);
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
      <main style={{ padding: 40, textAlign: "center" }}>
        Loading your card...
      </main>
    );
  }

  if (!card) {
    return (
      <main style={{ padding: 40, textAlign: "center" }}>
        <h1>Card not found</h1>
        <p>This card may have been deleted or the link is incorrect.</p>
      </main>
    );
  }

  return (
    <main className={`create-page create-theme-${card.theme}`}>
      <div className="create-envelope-stage">
        <div className="create-envelope">
          <div className={`create-env-shape create-theme-${card.theme}`}>
            <span>{card.seal}</span>
          </div>

          <article className="create-card-preview">
            {card.deco && <i>✦</i>}

            <small>{card.occasion}</small>

            <h3>
              {card.salutation || "Dear"}{" "}
              {card.recipient_name || "Friend"},
            </h3>

            {card.heading && <h4>{card.heading}</h4>}

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
                <blockquote>“{card.quote}”</blockquote>
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
    </main>
  );
}
