# Celebrio

Celebrio is a thoughtful card-making experience for the moments that deserve more than a quick message. Choose an occasion, shape the wording, style the card, preview it live, and share it directly with someone special.

## What You Can Create

- Birthday, appreciation, farewell, graduation, anniversary, and custom cards
- Personalised recipient, relationship, heading, message, closing, quote, and sender details
- Optional photo upload with an in-card preview
- Six colour palettes, envelope seals, decorative details, and handwritten-style quote notes
- A live card preview while you edit
- Supabase-backed card saving with a shareable link
- Native link sharing where supported, with clipboard fallback in other browsers

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Install and run locally

```bash
git clone https://github.com/OriginLab-dev/celebrio.git
cd celebrio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The card studio is available at [http://localhost:3000/create](http://localhost:3000/create).

### Supabase configuration

Create a `.env.local` file with the public Supabase project values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

The app expects a `cards` table containing the fields used by the card studio, including `slug`, `occasion`, `recipient_name`, `salutation`, `relationship`, `heading`, `message`, `photo_data_url`, `closing`, `quote`, `sender_name`, `sender_tag`, `theme`, `seal`, `deco`, `sticky`, and `hide_sender`.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project Structure

```text
app/
  components/       Shared navigation, hero, service, and footer components
  card/[slug]/       Public shared-card route
  create/           Interactive card studio route
  lib/supabase.js   Supabase client configuration
  globals.css       Global styles and responsive layout rules
  layout.js         Root layout and metadata
  page.js           Home page composition
```

The card studio keeps its editable card state in the client and renders the preview from that state. Sharing saves the card to Supabase, creates a short URL under `/card/[slug]`, and uses the browser Web Share API when available. Other browsers copy the URL to the clipboard.

## Tech Stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 19
- [Supabase](https://supabase.com/) for shared card storage
- Tailwind CSS 4 through PostCSS
- ESLint with the Next.js configuration

## Production Build

Run the production checks locally with:

```bash
npm run lint
npm run build
npm start
```

Celebrio can be deployed to any platform that supports Next.js. [Vercel](https://vercel.com/) provides a straightforward deployment path for Next.js applications.
