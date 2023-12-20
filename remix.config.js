/** @type {import('@remix-run/dev').AppConfig} */
export default {
  postcss: true,
  serverModuleFormat: 'cjs',
  ignoredRouteFiles: ["**/.*"],
  browserNodeBuiltinsPolyfill: {
    modules: {
      crypto: true,
      events: true,
      net: true,
      tls: true,
      url: true,
      buffer: true,
      util: true,
      timers: true,
      fs: true,
      stream: true,
      string_decoder: true,
      process: true,
      zlib: true,
    },
  },
};
