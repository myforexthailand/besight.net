// Tailwind only generates output for stylesheets that contain @tailwind /
// @apply — today that's site/index.css (the public landing). The CRM,
// dashboard and auth stylesheets pass through untouched.
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
