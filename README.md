# Emon Singha

Personal portfolio of Emon Singha, a software engineer based in Maulvibazar, Sylhet, Bangladesh. The live site is [emonsingha.vercel.app](https://emonsingha.vercel.app).

The page introduces the work, then pairs experience with MockTaker and technical expertise with StoryGroove. A chat on the page answers only from the written profile. The contact form sends mail through EmailJS, and the resume is available at `/resume`.

## Stack

- [Next.js](https://nextjs.org/) 14 (App Router) and React 18
- Tailwind CSS
- Framer Motion
- next-themes for light and dark mode
- Google Gemini for the profile chat
- EmailJS for the contact form

## Requirements

- Node.js 18.17 or newer
- npm

## Run locally

```bash
git clone https://github.com/emonsingha209/NextJs-Tailwind-Portfolio.git
cd NextJs-Tailwind-Portfolio
npm install
```

Create `.env.local` in the project root:

```bash
GEMINI_API_KEY=
NEXT_PUBLIC_SERVICE_ID=
NEXT_PUBLIC_TEMPLATE_ID=
NEXT_PUBLIC_Email_PUBLIC_KEY=
```

| Variable | Used for |
| --- | --- |
| `GEMINI_API_KEY` | Server-only key for the chat at `app/api/chat`. Create one in [Google AI Studio](https://aistudio.google.com/apikey). |
| `NEXT_PUBLIC_SERVICE_ID` | EmailJS service ID for the contact form. |
| `NEXT_PUBLIC_TEMPLATE_ID` | EmailJS template ID. The form sends `name`, `email`, and `message`. |
| `NEXT_PUBLIC_Email_PUBLIC_KEY` | EmailJS public key. |

The chat and the contact form need these values. The rest of the page runs without them.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Where the content lives

Replace these files if you use the project as a starting point for your own site.

| Path | What to edit |
| --- | --- |
| `public/data/portfolio-data.jsx` | Name, title, location, introduction, experience, and education |
| `public/data/projects.jsx` | Project copy, stack, images, and live links |
| `public/data/expertise.jsx` | Technical expertise |
| `public/data/contact-details.jsx` | Email, phone, and other contact rows |
| `public/data/navData.json` | Navigation labels. Each `text` value must match a section id |
| `components/icon/Social.jsx` | Social links around the portrait and in the footer |
| `lib/site.js` | Canonical site URL |
| `public/img/` | Portrait, project images, and the Open Graph image |
| `public/resume/` | Resume PDF served at `/resume` |

The homepage order is set in `app/page.js`: introduction, experience, expertise, chat, then contact.

## Deploy

The live site is deployed on [Vercel](https://vercel.com/). Set the same environment variables in the project settings, and set the public URL in `lib/site.js` before deploying your own copy.

## License

This repository is public so the source can be read and run. It does not include a `LICENSE` file yet. Until one is added, do not copy the code, writing, photographs, or resume for another project.
