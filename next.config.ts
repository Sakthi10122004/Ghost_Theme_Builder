import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@prisma/client', '@libsql/client', 'gscan', 'handlebars'],
};

export default nextConfig;
