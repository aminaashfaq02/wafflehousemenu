// Generated from the inline Tailwind Play-CDN config that used to live in these pages.
// Build with: npm run build:css
module.exports = {
  content: ["./menu.html"],
  ...{
      theme: {
        extend: {
          colors: {
            brand: {
              yellow: '#F59E0B',         // Iconic Waffle Yellow
              'yellow-hover': '#D97706',
              'yellow-light': '#FFF9D2',
              dark: '#1C1410',            // Ultra Deep Black Background
              surface: '#141417',         // Card Background
              card: '#18181D',            // Elevated Surface
              border: '#27272E',          // Subtle Card Border
              'border-hover': '#F59E0B',
              text: '#E4E4E7',            // Readable Light Gray Body Text
              muted: '#9CA3AF',
            }
          },
          fontFamily: {
            heading: ['"Poppins"', 'sans-serif'],
            body: ['"Inter"', 'system-ui', 'sans-serif'],
            sans: ['"Inter"', 'system-ui', 'sans-serif'],
          },
          boxShadow: {
            'glow-yellow': '0 0 30px -5px rgba(245, 158, 11, 0.25)',
            'btn-yellow': '0 4px 18px rgba(245, 158, 11, 0.35)',
            'card-lift': '0 10px 30px -10px rgba(0, 0, 0, 0.7)',
          }
        }
      }
    }
};
