import { MetadataRoute } from 'next';

const BASE_URL = 'https://devdeck.online';

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = [
    { path: '/image/free-online-image-compressor' },
    { path: '/dev/secure-jwt-decoder' },
    { path: '/image/vector-qr-code-generator' },
    { path: '/dev/secure-code-snippet-bin' },
    { path: '/text/text-toolkit' },
    { path: '/dev/json-formatter-validator' },
    { path: '/dev/md5-sha256-hash-generator' },
    { path: '/dev/json-to-typescript-interface-converter' },
    { path: '/dev/curl-to-code-converter' },
    { path: '/image/svg-to-react-jsx-converter' },
    { path: '/dev/client-side-sqlite-viewer' },
    { path: '/dev/jsonpath-expression-tester' },
    { path: '/dev/regular-expression-tester' },
    { path: '/dev/local-log-file-analyzer' },
    { path: '/dev/rest-api-client-tester' },
    { path: '/dev/beautiful-code-snippet-image-generator' },
    { path: '/dev/lorem-ipsum-placeholder-generator' },
    { path: '/pdf/merge-pdf-files-free' },
    { path: '/pdf/split-extract-pdf-pages' },
    { path: '/pdf/convert-image-to-pdf' },
    { path: '/pdf/password-protect-pdf-file' },
    { path: '/image/png-jpg-webp-image-converter' },
    { path: '/image/free-image-resizer-tool' },
    { path: '/image/base64-image-encoder' }
  ];

  const toolRoutes = tools.map((tool) => ({
    url: `${BASE_URL}${tool.path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryRoutes = [
    '/dev',
    '/image',
    '/pdf',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
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

  return [...standardRoutes, ...categoryRoutes, ...toolRoutes];
}
