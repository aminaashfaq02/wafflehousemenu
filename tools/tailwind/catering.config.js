// Generated from the inline Tailwind Play-CDN config that used to live in these pages.
// Build with: npm run build:css
module.exports = {
  content: ["./waffle-house-catering/index.html"],
  ...{
      theme: {
        extend: {
          colors: {
            brand: {
              yellow: '#FFC72C',
              dark: '#0B0B0E',
              gray: '#F9FAFB',
              accent: '#E5B020',
            }
          },
          fontFamily: {
            sans: ['"Work Sans"', 'sans-serif'],
            heading: ['"Poppins"', 'sans-serif']
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
