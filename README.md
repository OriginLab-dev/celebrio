# Celebrio

Celebrio is a thoughtful card-making experience for the moments that deserve more than a quick message. Choose an occasion, shape the wording, style the card, preview it live, and share it directly with someone special.

## What You Can Create

- Birthday, appreciation, farewell, graduation, anniversary, and custom cards
- Personalised recipient, relationship, heading, message, closing, quote, and sender details
- Optional photo upload with an in-card preview
- Six colour palettes, envelope seals, decorative details, and handwritten-style quote notes
- A live card preview while you edit
- Native sharing where supported, with clipboard fallback in other browsers

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
  create/           Interactive card studio route
  globals.css       Global styles and responsive layout rules
  layout.js         Root layout and metadata
  page.js           Home page composition
public/             Static assets
```

The card studio keeps its editable card state in the client and renders the preview from that state. Sharing uses the browser Web Share API when available and copies the card text to the clipboard as a fallback.

## Tech Stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 19
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
