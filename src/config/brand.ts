// ============================================================
// BRAND CONFIGURATION
// Change company name/info here — one file controls everything
// ============================================================

export const brand = {
  brandName: 'Ignite',
  brandShortName: 'IGN',
  brandSuffix: '°',           // e.g. "Ignite°" — remove if not wanted
  tagline: 'We engineer exceptional digital products.',
  description:
    'Ignite is a technology and product engineering studio. We understand problems, design the right experience, engineer the product — and help ship it.',
  email: 'hello@[yourdomain].com',
  phone: '+1 (000) 000-0000',
  location: 'Remote — Worldwide',
  socialLinks: {
    twitter: 'https://twitter.com/',
    linkedin: 'https://linkedin.com/company/',
    github: 'https://github.com/',
    instagram: 'https://instagram.com/',
    dribbble: 'https://dribbble.com/',
  },
} as const

export type Brand = typeof brand
