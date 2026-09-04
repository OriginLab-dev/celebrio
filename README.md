# 💌 Celebrio

> **Create. Personalize. Share. Make Someone Smile.**

Celebrio is a personalized digital card platform that lets users create beautiful, customizable cards for special people and moments. Users can add a recipient, message, photo, quote, theme, decorations, and sender information, preview the card in real time, save it to Supabase, and generate a unique shareable link.

The recipient can open the shared link and experience the card through an interactive envelope-opening animation before reading the personalized message.

---

## ✨ Features

### 🎨 Personalized Card Creation
- Add recipient name
- Choose an occasion
- Select a salutation
- Add a custom heading
- Write a personalized message
- Add a closing line
- Add an optional quote
- Upload a personal photo
- Choose a visual theme
- Enable or disable decorations
- Add an envelope seal or emoji
- Add a sticky-note quote
- Add sender name and sender tag
- Option to hide sender information

### 👀 Live Preview
The card preview updates while the creator fills in the form, allowing users to see the final design before sharing it.

### 💌 Interactive Envelope
Shared cards are presented as an envelope first. The recipient can click the envelope to reveal the personalized card through an opening animation.

### 🔗 Unique Shareable Links
Every saved card receives a unique slug, for example:

```text
/card/e7c4eb89
```

The generated link can be copied or shared directly using the browser's native sharing functionality when available.

### ☁️ Supabase Database
Card information is stored in a Supabase `cards` table, including recipient details, message content, photo data, theme, seal, decorations, sender information, unique slug, and creation timestamp.

### 📱 Responsive Design
Designed for desktop, laptop, tablet, and mobile devices.

### ♿ Reduced Motion Support
The envelope animation respects the user's `prefers-reduced-motion` accessibility preference.

---

## 🧭 How Celebrio Works

```text
                    ┌──────────────────┐
                    │   Visit Celebrio  │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   Create a Card  │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Fill Card Details│
                    │ Text • Photo     │
                    │ Theme • Quote    │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   Live Preview   │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  Click "Share"   │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Save to Supabase │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Generate Unique  │
                    │       Slug       │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Shareable Card   │
                    │      Link        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Recipient Opens  │
                    │      Link        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  Closed Envelope │
                    └────────┬─────────┘
                             │
                         Click ✉
                             │
                             ▼
                    ┌──────────────────┐
                    │ Envelope Opens   │
                    │   Animation      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Personalized     │
                    │   Card Revealed  │
                    └──────────────────┘
```

---

## 🏗️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | React framework and application routing |
| **React 19** | User interface and interactive components |
| **JavaScript** | Application logic |
| **CSS** | Styling, themes, responsive layouts, and animations |
| **Supabase** | Database and card persistence |
| **Next.js App Router** | Page and dynamic route management |
| **Web Share API** | Native sharing where supported |
| **Clipboard API** | Copying share links when native sharing is unavailable |

---

## 📁 Project Structure

```text
celebrio/
│
├── app/
│   ├── card/
│   │   └── [slug]/
│   │       └── page.js          # Shared public card
│   │
│   ├── components/
│   │   ├── Footer.js
│   │   ├── Hero.js
│   │   ├── Navbar.js
│   │   └── Service.js
│   │
│   ├── create/
│   │   └── page.js              # Card creation flow
│   │
│   ├── lib/
│   │   └── supabase.js          # Supabase client
│   │
│   ├── globals.css              # Global styles and animations
│   ├── layout.js                # Root layout
│   └── page.js                  # Homepage
│
├── public/                      # Static assets
├── package.json
├── package-lock.json
└── README.md
```

---

## 🔄 Application Flow

### 1. Create
The user visits Celebrio and starts creating a card.

### 2. Customize
The user personalizes the recipient, occasion, heading, message, photo, quote, theme, decorations, seal, and sender details.

### 3. Preview
The card is rendered in the preview area so the creator can see the design before sharing.

### 4. Save
When the user clicks **Share**, Celebrio generates a unique slug and inserts the card information into Supabase.

```javascript
const slug = crypto
  .randomUUID()
  .replaceAll("-", "")
  .slice(0, 8);
```

### 5. Share
A URL is generated using the slug:

```text
/card/{slug}
```

For example:

```text
https://your-domain.com/card/e7c4eb89
```

If the browser supports the Web Share API, Celebrio opens the native share interface. Otherwise, the URL is copied to the clipboard.

### 6. Receive
The recipient opens the shared URL. The dynamic route:

```text
app/card/[slug]/page.js
```

retrieves the corresponding card from Supabase using the slug.

### 7. Reveal
The recipient initially sees the envelope. Clicking it triggers the opening interaction and reveals the personalized card.

### 8. Invalid Link
If a slug does not exist, Celebrio displays a friendly **Data does not exist** message instead of exposing a raw database error.

---

## 🗄️ Database

Celebrio uses a Supabase table named:

```text
cards
```

### Main Fields

| Field | Type | Description |
|---|---|---|
| `id` | UUID | Unique database record ID |
| `slug` | text | Unique public card identifier |
| `occasion` | text | Card occasion |
| `recipient_name` | text | Recipient name |
| `salutation` | text | Greeting |
| `relationship` | text | Relationship/context |
| `heading` | text | Card heading |
| `message` | text | Main card message |
| `photo_data_url` | text | Card photo data |
| `closing` | text | Closing message |
| `quote` | text | Optional quote |
| `sender_name` | text | Sender name |
| `sender_tag` | text | Sender label |
| `theme` | text | Selected visual theme |
| `seal` | text | Envelope seal |
| `deco` | boolean | Decorations enabled/disabled |
| `sticky` | boolean | Sticky-note enabled/disabled |
| `hide_sender` | boolean | Sender visibility |
| `created_at` | timestamp | Creation time |

---

## 🔐 Supabase Security

Row Level Security (RLS) is enabled on the `cards` table.

The application uses public Supabase configuration through environment variables.

> **Never expose a Supabase service-role or secret key in client-side code or commit it to Git.**

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- A Supabase project

### 1. Clone the project

```bash
git clone YOUR_REPOSITORY_URL
cd celebrio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create:

```text
.env.local
```

Add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🧪 Available Commands

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Start the production server |
| `npm run lint` | Run linting if configured |

---

## 🌐 Routes

| Route | Purpose |
|---|---|
| `/` | Celebrio homepage |
| `/create` | Create and customize a card |
| `/card/[slug]` | View a shared personalized card |

Example:

```text
/card/e7c4eb89
```

---

## 🎨 Design Philosophy

Celebrio is designed to make digital cards feel more personal than an ordinary text message.

The visual direction combines:

- Soft paper-like surfaces
- Warm typography
- Pastel envelope colors
- Handwritten-style elements
- Photo memories
- Sticky-note details
- Minimal interface elements
- Gentle animations

The goal is to make opening a digital card feel closer to opening a physical envelope.

---

## 💡 Why Celebrio?

Traditional digital messages are instant and often forgettable.

Celebrio adds a small moment of anticipation:

```text
Create
   ↓
Personalize
   ↓
Preview
   ↓
Share
   ↓
Open Envelope
   ↓
Reveal
   ↓
Remember
```

Instead of simply sending a message, Celebrio turns a message into an experience.

---

## 🔮 Future Improvements

Potential future additions:

- User accounts and personal card history
- Card editing after creation
- Private or expiring card links
- QR-code sharing
- More envelope and card animations
- More themes and occasions
- Background music
- Animated confetti and reactions
- Supabase Storage for images
- Open Graph social previews
- Card analytics
- Custom domains
- Downloadable cards
- Additional sharing integrations

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

Create a feature branch:

```bash
git checkout -b feature/your-feature
```

Make your changes, test them locally, and create a pull request.

---

## 📄 License

This project is currently intended as a personal/project implementation.

If Celebrio is distributed publicly, add a license that matches the intended usage.

---

## 👨‍💻 Celebrio

**A little card. A big feeling. 💌**

> **Create. Personalize. Share. Make Someone Smile.**
