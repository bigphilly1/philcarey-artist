# Phil Carey Artist Website

Built with Next.js, deployed on Vercel, payments via Stripe.

---

## Getting started locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_SITE_URL=https://www.philcareyartist.com
```

In Vercel, add these same variables under Project Settings > Environment Variables.

---

## Adding or updating paintings

Edit `data/paintings.json`. Each painting has:

```json
{
  "slug": "unique-url-friendly-name",
  "title": "Painting Title",
  "medium": "Acrylic on canvas",
  "dimensions": "50 x 40 cm / 20 x 16 in",
  "price": 500,
  "printPrice": 100,
  "status": "available",
  "hero": false,
  "image": "/images/filename.jpg",
  "description": "One or two sentences about this painting.",
  "category": "Sydney"
}
```

Set `"hero": true` on whichever painting you want as the homepage hero. Only one should be true at a time.

---

## Adding images

1. Take a photo with your iPhone in good indirect daylight
2. Name the file to match the slug (e.g. `balmoral-beach.jpg`)
3. Upload it to the `public/images/` folder in GitHub
4. Vercel rebuilds automatically

Image naming convention: use the painting slug with `.jpg` extension.

---

## Updating prices

Open `data/paintings.json`, find the painting, change the `price` or `printPrice` value, save and commit. Done.

---

## Activating print sales via Stripe

Currently, the "Buy Print" button sends an email enquiry. When you have a print supplier sorted:

1. Open `pages/paintings/[slug].js`
2. Find the `handlePurchase` function
3. Delete the block that starts with `if (selectedType === 'print')` and its `return` statement
4. Stripe checkout will then handle both originals and prints automatically

---

## Deployment

This site is connected to Vercel via GitHub. Every commit to the `main` branch triggers an automatic deployment. No manual steps needed.

---

## File structure

```
/data/paintings.json     — All painting content and pricing
/public/images/          — All painting images (upload here)
/pages/index.js          — Homepage
/pages/about.js          — About page
/pages/contact.js        — Contact page
/pages/paintings/[slug]  — Individual painting pages
/pages/api/checkout.js   — Stripe checkout endpoint
/pages/success.js        — Post-purchase confirmation
/components/             — Nav, Footer, PaintingCard
/styles/globals.css      — All styling variables and base styles
```
