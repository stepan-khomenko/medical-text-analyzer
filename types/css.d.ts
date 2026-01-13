// Ambient declaration so TypeScript accepts side-effect CSS imports
// (e.g. `import "./globals.css"`). Next.js's bundler handles these at
// build time, but the editor's type checker needs the module declared.
declare module "*.css";
