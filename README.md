# Portfolio Admin

Next.js 16, React 19, next-intl, NextAuth and MongoDB based personal portfolio with an admin panel for projects, blog posts, skills, case studies, experience, education, media and settings.

## Requirements

- Node.js 22+
- MongoDB database
- Optional OpenAI API key for admin content generation
- Optional webhook URL for contact form notifications

## Setup

1. Copy `.env.example` to `.env.local`.
2. Fill `MONGODB_URI`, `NEXTAUTH_SECRET` and `NEXTAUTH_URL`.
3. Run the development server:

```bash
npm run dev
```

The site runs at `http://localhost:3000`.

## Environment Variables

Required:

- `MONGODB_URI`: MongoDB connection string.
- `NEXTAUTH_SECRET`: long random secret for JWT/session signing.
- `NEXTAUTH_URL`: canonical app URL.

Optional:

- `OPENAI_API_KEY`: enables AI content generation in admin forms.
- `CONTACT_WEBHOOK_URL`: sends a notification when someone submits the contact form.
- `CONTACT_WEBHOOK_FORMAT`: `generic`, `slack`, or `discord`.
- `ENABLE_SETUP_ROUTES`: must be `true` to enable setup/migration endpoints.
- `SETUP_TOKEN`: required token for setup/migration requests.

## Setup Routes

Setup routes are disabled by default. To run them locally, set:

```env
ENABLE_SETUP_ROUTES="true"
SETUP_TOKEN="your-one-time-token"
```

Then call:

```bash
curl "http://localhost:3000/api/setup?token=your-one-time-token"
curl "http://localhost:3000/api/setup/migrate?token=your-one-time-token"
```

Set `ENABLE_SETUP_ROUTES` back to `false` after use.

## Contact Notifications

The contact form always stores messages in MongoDB. To also receive an external notification, set `CONTACT_WEBHOOK_URL`.

Examples:

- Slack incoming webhook: `CONTACT_WEBHOOK_FORMAT="slack"`
- Discord webhook: `CONTACT_WEBHOOK_FORMAT="discord"`
- Make, Zapier or n8n webhook: `CONTACT_WEBHOOK_FORMAT="generic"`

The webhook receives the sender name, email, subject and message text.

## Commands

```bash
npm run dev
npm run build
npm run lint
```

## Security Notes

- Never commit `.env.local`.
- Rotate leaked database credentials and NextAuth secrets immediately.
- Keep setup routes disabled in production.
- Admin pages are protected by the Next.js proxy and write APIs also verify the NextAuth session.
