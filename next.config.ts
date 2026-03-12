import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {

    config.experiments = {
      asyncWebAssembly: true,
      layers: true
    };

    config.module.rules.push({
      test: /\.wasm$/,
      type: "webassembly/async",
    });

    return config;
  },

  async headers() {
    return [
      {
        source: "/:path*.wasm",
        headers: [
          {
            key: "Content-Type",
            value: "application/wasm",
          },
        ],
      },
    ];
  }
};

export default nextConfig;