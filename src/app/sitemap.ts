import { MetadataRoute } from 'next';

const BASE_URL = 'https://devdeck.online';

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = [
    'epoch-converter',
    'image-compressor',
    'jwt-decoder',
    'lorem-ipsum',
    'password-generator',
    'pomodoro',
    'qr-generator',
    'quick-dump',
    'scratchpad',
    'text-toolkit',
    'tip-calculator',
    'unit-converter',
  ];

  const toolRoutes = tools.map((tool) => ({
    url: `${BASE_URL}/tools/${tool}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const standardRoutes = [
    '',
    '/privacy',
    '/terms',
    '/promise',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
    priority: route === '' ? 1.0 : 0.5,
  }));

  return [...standardRoutes, ...toolRoutes];
}
