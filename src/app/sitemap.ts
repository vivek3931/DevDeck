import { MetadataRoute } from 'next';

const BASE_URL = 'https://devdeck.online';

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = [
    { path: '/image/image-compressor' },
    { path: '/dev/jwt-decoder' },
    { path: '/image/qr-generator' },
    { path: '/dev/quick-dump' },
    { path: '/text/text-toolkit' },
    { path: '/dev/json-validator' },
    { path: '/dev/hash-generator' },
    { path: '/dev/json-to-ts' },
    { path: '/dev/curl-converter' },
    { path: '/image/svg-to-react' },
    { path: '/dev/sqlite-explorer' },
    { path: '/dev/json-path' },
    { path: '/dev/regex-tester' },
    { path: '/dev/log-analyzer' },
    { path: '/dev/api-tester' },
    { path: '/dev/code-snap' }
  ];

  const toolRoutes = tools.map((tool) => ({
    url: `${BASE_URL}${tool.path}`,
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
