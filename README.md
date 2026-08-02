# Meet & Belong

Responsive landing page for Meet & Belong, a friendship-circle community launching in Kuwait.

## Run locally

1. Install Node.js 22 or later.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open the local address shown in the terminal.

## Deploy to Vercel

1. Create a new GitHub repository and upload this project.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Keep the detected framework as **Next.js**.
4. Deploy. No environment variables are required.
5. Add `meetandbelong.com` under **Project Settings → Domains**, then follow Vercel’s DNS instructions.

The WhatsApp application flow sends visitors to `+965 4110 3254`. Update that number in `app/page.tsx` if it changes.

## Main content

- `app/page.tsx` — landing page and WhatsApp application flow
- `app/globals.css` — responsive visual system
- `app/privacy/page.tsx` — privacy notice
- `app/code-of-conduct/page.tsx` — community conduct rules
- `app/cancellation/page.tsx` — cancellation terms
- `public/` — image and favicon assets
