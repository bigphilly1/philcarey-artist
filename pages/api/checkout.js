import Stripe from 'stripe'
import paintings from '../../data/paintings.json'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { paintingSlug, type } = req.body

  if (!paintingSlug || !type) {
    return res.status(400).json({ error: 'Missing paintingSlug or type' })
  }

  const painting = paintings.find(p => p.slug === paintingSlug)

  if (!painting) {
    return res.status(404).json({ error: 'Painting not found' })
  }

  const price = type === 'original' ? painting.price : painting.printPrice
  const productName = type === 'original'
    ? `${painting.title} (Original, ${painting.dimensions})`
    : `${painting.title} (Print)`

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'aud',
            product_data: {
              name: productName,
              description: `${painting.medium}. Unframed. Plus shipping and GST.`,
              images: [],
            },
            unit_amount: price * 100, // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${siteUrl}/success?painting=${paintingSlug}&type=${type}`,
      cancel_url: `${siteUrl}/paintings/${paintingSlug}`,
      metadata: {
        paintingSlug,
        paintingTitle: painting.title,
        type,
        dimensions: painting.dimensions,
        medium: painting.medium,
      },
      // Collect shipping address
      shipping_address_collection: {
        allowed_countries: ['AU', 'NZ', 'US', 'GB', 'CA', 'DE', 'FR', 'IT', 'NL', 'SG', 'HK', 'JP'],
      },
      // Add tax if needed
      // automatic_tax: { enabled: true },
    })

    return res.status(200).json({ sessionId: session.id })
  } catch (error) {
    console.error('Stripe error:', error)
    return res.status(500).json({ error: error.message })
  }
}
