import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/image/qr-generator',
        destination: '/image/vector-qr-code-generator',
        permanent: true,
      },
      {
        source: '/image/base64',
        destination: '/image/base64-image-encoder',
        permanent: true,
      },
      {
        source: '/dev/jwt-decoder',
        destination: '/dev/secure-jwt-decoder',
        permanent: true,
      },
      {
        source: '/dev/json-validator',
        destination: '/dev/json-formatter-validator',
        permanent: true,
      },
      {
        source: '/image/svg-to-react',
        destination: '/image/svg-to-react-jsx-converter',
        permanent: true,
      },
      {
        source: '/dev/quick-dump',
        destination: '/dev/secure-code-snippet-bin',
        permanent: true,
      },
      {
        source: '/dev/hash-generator',
        destination: '/dev/md5-sha256-hash-generator',
        permanent: true,
      },
      {
        source: '/dev/json-to-ts',
        destination: '/dev/json-to-typescript-interface-converter',
        permanent: true,
      },
      {
        source: '/dev/curl-converter',
        destination: '/dev/curl-to-code-converter',
        permanent: true,
      },
      {
        source: '/dev/sqlite-explorer',
        destination: '/dev/client-side-sqlite-viewer',
        permanent: true,
      },
      {
        source: '/dev/json-path',
        destination: '/dev/jsonpath-expression-tester',
        permanent: true,
      },
      {
        source: '/dev/regex-tester',
        destination: '/dev/regular-expression-tester',
        permanent: true,
      },
      {
        source: '/dev/log-analyzer',
        destination: '/dev/local-log-file-analyzer',
        permanent: true,
      },
      {
        source: '/dev/api-tester',
        destination: '/dev/rest-api-client-tester',
        permanent: true,
      },
      {
        source: '/dev/code-snap',
        destination: '/dev/beautiful-code-snippet-image-generator',
        permanent: true,
      },
      {
        source: '/dev/lorem-ipsum',
        destination: '/dev/lorem-ipsum-placeholder-generator',
        permanent: true,
      },
      {
        source: '/image/image-compressor',
        destination: '/image/free-online-image-compressor',
        permanent: true,
      },
      {
        source: '/image/converter',
        destination: '/image/png-jpg-webp-image-converter',
        permanent: true,
      },
      {
        source: '/image/resizer',
        destination: '/image/free-image-resizer-tool',
        permanent: true,
      },
      {
        source: '/pdf/merge',
        destination: '/pdf/merge-pdf-files-free',
        permanent: true,
      },
      {
        source: '/pdf/split',
        destination: '/pdf/split-extract-pdf-pages',
        permanent: true,
      },
      {
        source: '/pdf/image-to-pdf',
        destination: '/pdf/convert-image-to-pdf',
        permanent: true,
      },
      {
        source: '/pdf/protect',
        destination: '/pdf/password-protect-pdf-file',
        permanent: true,
      },

    ]
  },
};

export default nextConfig;
