"use client";
/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabase";

const occasions = [
  { key: "teacher", icon: "✉", name: "Thank You (Teacher)", desc: "For teachers & mentors", tag: "Thank You", theme: "sand", salutation: "Dear Sir", relationship: "Teacher", heading: "Our guide and constant inspiration", message: "Thank you for making every lesson simple, interesting and fun. Your patience, support and passion for teaching inspire us to keep growing.", closing: "Happy Teachers' Day!", quote: "A teacher who keeps learning keeps inspiring." },
  { key: "birthday", icon: "🎂", name: "Birthday", desc: "Personalised birthday wishes", tag: "Happy Birthday", theme: "rose", salutation: "Dear", relationship: "Friend", heading: "Wishing you a wonderful year ahead", message: "Another year of you being wonderfully, exactly yourself. I hope today is filled with the people and small moments that make you happiest.", closing: "Keep shining always!", quote: "May your day be as amazing as you are." },
  { key: "appreciation", icon: "♥", name: "Appreciation", desc: "Say something meaningful", tag: "Thank You For Everything", theme: "sage", salutation: "Dear", relationship: "Colleague", heading: "Thank you for everything", message: "Your support means more than you know. You make a difference in more ways than you probably realise.", closing: "With gratitude,", quote: "Your support means more than you know." },
  { key: "graduation", icon: "🎓", name: "Farewell & Graduation", desc: "A memorable goodbye", tag: "A New Chapter Begins", theme: "lavender", salutation: "Dear", relationship: "Friend", heading: "Congrats on your graduation", message: "You worked for this, and it shows. This is the close of one chapter and the opening of a much bigger one.", closing: "Proud of you today and always.", quote: "The best is yet to come - go shine." },
  { key: "anniversary", icon: "💞", name: "Anniversary & Love", desc: "For the one who means everything", tag: "To The One Who Means Everything", theme: "peach", salutation: "My love", relationship: "Partner", heading: "Happy anniversary, my love", message: "Every year with you feels like a gift. Thank you for the ordinary Tuesdays and the big adventures alike.", closing: "Thank you for being my always.", quote: "Here's to more memories and a lifetime of us." },
  { key: "custom", icon: "✎", name: "Custom Card", desc: "Tell me your idea", tag: "A Card Made Just For You", theme: "sky", salutation: "Dear", relationship: "", heading: "Your idea, my design", message: "Share what this moment is about, and write it in your own words here.", closing: "With care,", quote: "Let's create something meaningful together." },
];

const themes = [
  ["sand", "Classic"], ["rose", "Rose"], ["sage", "Sage"], ["lavender", "Lavender"], ["peach", "Peach"], ["sky", "Sky"],
];
const seals = ["✉", "♥", "✦", "🌿"];
const steps = [["Occasion", "Select card type"], ["Details", "Add your message"], ["Design", "Choose style"], ["Preview", "Finalise & share"]];

function initialState() {
  const occasion = occasions[0];
  return { step: 1, occasion: occasion.key, recipientName: "", salutation: occasion.salutation, relationship: occasion.relationship, heading: occasion.heading, message: occasion.message, photoDataUrl: "", genPrompt: "teacher writing on a blackboard", closing: occasion.closing, quote: occasion.quote, senderName: "", senderTag: "", theme: occasion.theme, seal: "✉", deco: true, sticky: true, autoHighlight: true, hideSender: false };
}

export default function CreatePage() {
  const [state, setState] = useState(initialState);
  const occasion = useMemo(() => occasions.find((item) => item.key === state.occasion) || occasions[0], [state.occasion]);
  const update = (key, value) => setState((current) => ({ ...current, [key]: value }));
  const selectOccasion = (item) => setState((current) => ({ ...current, occasion: item.key, salutation: item.salutation, relationship: item.relationship, heading: item.heading, message: item.message, closing: item.closing, quote: item.quote, theme: item.theme }));

  async function shareCard() {
    try {
      const slug = crypto.randomUUID().replaceAll("-", "").slice(0, 8);

      const { error } = await supabase
        .from("cards")
        .insert({
          slug,
          occasion: state.occasion,
          recipient_name: state.recipientName,
          salutation: state.salutation,
          relationship: state.relationship,
          heading: state.heading,
          message: state.message,
          photo_data_url: state.photoDataUrl,
          closing: state.closing,
          quote: state.quote,
          sender_name: state.senderName,
          sender_tag: state.senderTag,
          theme: state.theme,
          seal: state.seal,
          deco: state.deco,
          sticky: state.sticky,
          hide_sender: state.hideSender,
        });

      if (error) {
        console.error("Supabase error:", error);
        alert("Could not save your card. Please try again.");
        return;
      }

      const cardUrl = `${window.location.origin}/card/${slug}`;

      if (navigator.share) {
        await navigator.share({
          title: "A card for you 💌",
          text: "Someone created a special card for you.",
          url: cardUrl,
        });
      } else {
        await navigator.clipboard.writeText(cardUrl);
        alert("Card saved! Share link copied.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }


  return (
    <>
      <main className="create-page">
        <Link className="create-back-link" href="/">
          <span aria-hidden="true">←</span> Back to Celebrio
        </Link>
        <header className="create-hero">
          <p className="create-eyebrow">What You Can Create <span aria-hidden="true">♥</span></p>
          <h1>Cards made for your moment</h1>
          <p>Every occasion deserves a card that feels handwritten, not templated. Pick a moment below, and shape it into something worth opening.</p>
        </header>

        <section className="create-showcase" id="showcase">
          <div className="create-showcase-grid">
            {occasions.map((item) => (
              <button className="create-swatch" key={item.key} type="button" onClick={() => { selectOccasion(item); update("step", 1); document.getElementById("studio")?.scrollIntoView({ behavior: "smooth" }); }}>
                <span className={`create-mini-envelope create-theme-${item.theme}`}><span>{item.icon}</span></span>
                <span className="create-mini-card"><b>{item.tag}</b><small>{item.heading}</small></span>
                <strong>{item.name}</strong><small>{item.desc}</small>
              </button>
            ))}
          </div>
        </section>

        <section className="create-studio" id="studio">
          <div className="create-studio-head">
            <h2>Create your card</h2>
            <div className="create-steps-nav">
              {steps.map(([title, subtitle], index) => (
                <button className={state.step === index + 1 ? "create-step active" : state.step > index + 1 ? "create-step done" : "create-step"} key={title} type="button" onClick={() => update("step", index + 1)}>
                  <span>{index + 1}</span><b>{title}<small>{subtitle}</small></b>
                </button>
              ))}
            </div>
          </div>

          <div className="create-studio-body">
            <div className="create-form-panel">
              {state.step === 1 && <StepOne state={state} update={update} occasion={occasion} selectOccasion={selectOccasion} />}
              {state.step === 2 && <StepTwo state={state} update={update} />}
              {state.step === 3 && <StepThree state={state} update={update} />}
              {state.step === 4 && <StepFour shareCard={shareCard} restart={() => setState(initialState())} />}
              <div className="create-nav-buttons">
                <button className="create-btn ghost" disabled={state.step === 1} type="button" onClick={() => update("step", Math.max(1, state.step - 1))}>Back</button>
                <button className="create-btn" type="button" onClick={() => update("step", Math.min(4, state.step + 1))}>{state.step === 3 ? "Preview card" : "Next"}</button>
              </div>
            </div>
            <Preview state={state} occasion={occasion} onShare={shareCard} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Field({ label, value, onChange, placeholder, multiline = false }) {
  const Tag = multiline ? "textarea" : "input";
  return <label className="create-field">{label}<Tag value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} /></label>;
}

function Group({ title, children }) { return <div className="create-field-group"><h3><span />{title}</h3>{children}</div>; }

function StepOne({ state, update, occasion, selectOccasion }) {
  return <>
    <Group title="Who is this moment for?"><div className="create-occasion-grid">{occasions.map((item) => <button className={item.key === state.occasion ? "create-occ-card selected" : "create-occ-card"} type="button" key={item.key} onClick={() => selectOccasion(item)}><span>{item.icon}</span><b>{item.name}</b><small>{item.desc}</small></button>)}</div></Group>
    <Group title="A little about them"><div className="create-row2"><Field label="Recipient name" value={state.recipientName} onChange={(value) => update("recipientName", value)} placeholder="e.g. Indranil Das" /><Field label="How should we address them?" value={state.salutation} onChange={(value) => update("salutation", value)} placeholder="e.g. Dear Sir" /></div><Field label="Your relationship to them" value={state.relationship} onChange={(value) => update("relationship", value)} placeholder="e.g. Teacher, Friend, Partner" /></Group>
  </>;
}

function StepTwo({ state, update }) {
  return <>
    <Group title="Main heading"><Field label="Heading (appears on the card)" value={state.heading} onChange={(value) => update("heading", value)} placeholder="e.g. Our guide and constant inspiration" /></Group>
    <Group title="Your message"><Field label="" multiline value={state.message} onChange={(value) => update("message", value)} placeholder="Write your message from the heart..." /></Group>
    <Group title="Add a photo"><div className="create-photo-area">{state.photoDataUrl ? <div className="create-photo-preview"><img src={state.photoDataUrl} alt="Uploaded card artwork" /><button type="button" onClick={() => update("photoDataUrl", "")}>✕</button></div> : <label className="create-photo-drop">Click to upload a photo<input className="visually-hidden" type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => update("photoDataUrl", reader.result); reader.readAsDataURL(file); }} /></label>}<small className="create-hint">Upload your own photo to personalize the card.</small></div></Group>
    <Group title="Closing message"><Field label="Closing line" value={state.closing} onChange={(value) => update("closing", value)} placeholder="e.g. Happy Teachers' Day!" /></Group>
    <Group title="Quote"><Field label="Optional quote" value={state.quote} onChange={(value) => update("quote", value)} placeholder="Add an inspiring line" /></Group>
    <Group title="From"><div className="create-row2"><Field label="Your name" value={state.senderName} onChange={(value) => update("senderName", value)} placeholder="e.g. Pritam" /><Field label="Signed as (optional)" value={state.senderTag} onChange={(value) => update("senderTag", value)} placeholder="e.g. Your student" /></div><label className="create-toggle"><input type="checkbox" checked={state.hideSender} onChange={(event) => update("hideSender", event.target.checked)} />Don&apos;t show my name on the card</label></Group>
  </>;
}

function StepThree({ state, update }) {
  return <><Group title="Choose a palette"><div className="create-theme-grid">{themes.map(([key, label]) => <button className={state.theme === key ? "create-theme-dot selected" : "create-theme-dot"} style={{ background: `var(--create-${key})` }} key={key} type="button" aria-label={label} onClick={() => update("theme", key)}><small>{label}</small></button>)}</div></Group><Group title="Other touches"><label className="create-toggle"><input type="checkbox" checked={state.deco} onChange={(event) => update("deco", event.target.checked)} />Add decorative corner details</label><label className="create-toggle"><input type="checkbox" checked={state.sticky} onChange={(event) => update("sticky", event.target.checked)} />Show quote as a handwritten sticky note</label></Group><Group title="Envelope seal"><div className="create-seal-grid">{seals.map((seal) => <button className={state.seal === seal ? "create-occ-card selected" : "create-occ-card"} type="button" key={seal} onClick={() => update("seal", seal)}><span>{seal}</span></button>)}</div></Group></>;
}

function occasionQuote(key) { return occasions.find((item) => item.key === key)?.quote || occasions[5].quote; }

function StepFour({ shareCard, restart }) { return <div className="create-ready"><h3><span />Your card is ready</h3><p>Take a look at the preview and share it directly.</p><div><button className="create-btn" type="button" onClick={shareCard}>Share</button><button className="create-btn ghost" type="button" onClick={restart}>Start a new card</button></div></div>; }

function Preview({ state, occasion, onShare, onDownload }) {
  const name = state.recipientName ? ` ${state.recipientName}` : "";
  return <aside className="create-preview"><p>Live preview - this is how your card will look</p><div className="create-envelope-stage"><div className="create-envelope"><div className={`create-env-shape create-theme-${state.theme}`}><span>{state.seal}</span></div><article className="create-card-preview">{state.deco && <i>✦</i>}<small>{occasion.tag}</small><h3>{state.salutation || "Dear"} {name},</h3>{state.heading && <h4>{state.heading}</h4>}{state.photoDataUrl && <div className="create-photo-frame"><img className="create-card-photo" src={state.photoDataUrl} alt="Card artwork" />{state.sticky && state.quote && <span className={`create-sticky-note create-sticky-${state.theme}`}>“{state.quote}”</span>}</div>}<p>{state.message}</p><strong>{state.closing}</strong>{state.quote && !(state.sticky && state.photoDataUrl) && <blockquote>“{state.quote}”</blockquote>}{!state.hideSender && state.senderName && <footer>- {state.senderTag ? `${state.senderTag}, ` : ""}{state.senderName}</footer>}</article></div></div><div className="create-preview-actions"><button className="create-btn ghost" type="button" onClick={onShare}>Share</button></div></aside>;
}
