// Generated from the inline Tailwind Play-CDN config that used to live in these pages.
// Build with: npm run build:css
module.exports = {
  content: ["./blog/index.html","./waffle-house-calories-allergies/index.html","./waffle-house-dietary-guide/index.html"],
  ...{
      theme: {
        extend: {
          colors: {
            brand: {
              yellow: '#FFC72C',
              yellowHover: '#E5B020',
              black: '#0B0B0E',
              darkGray: '#1C1C24',
              cream: '#FAF7F0',
            }
          },
          fontFamily: {
            sans: ['Plus Jakarta Sans', 'Work Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
            heading: ['Plus Jakarta Sans', 'Poppins', 'system-ui', 'sans-serif'],
          },
          boxShadow: {
            'card': '0 4px 20px -2px rgba(11, 11, 14, 0.05)',
            'card-hover': '0 12px 30px -4px rgba(11, 11, 14, 0.12)',
            'btn-yellow': '0 4px 14px 0 rgba(255, 199, 44, 0.39)',
          }
        }
      }
    }
};
