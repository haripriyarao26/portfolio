/**
 * Color Palette Constants
 * 
 * Professional color scheme for systems-level engineering portfolio
 * Recruiter Perception: "This is a senior-level professional who doesn't need flashy effects to prove their value."
 * 
 * Usage:
 * - For Tailwind classes: Use colorClasses.* (e.g., colorClasses.primary.main)
 * - For inline styles: Use colors.* (e.g., colors.primary.main)
 * - For gradients: Use gradients.* (e.g., gradients.primary)
 */

export const colors = {
  // Background Colors
  background: {
    primary: '#fcfcf9',      // Soft Bone/Paper - Main background
    card: '#ffffff',          // Card background (white)
    secondary: '#f5f5f3',    // Secondary card/button background
    hover: '#e8e8e6',        // Hover state background
  },

  // Primary Colors (Buttons/Links)
  primary: {
    main: '#1a1a1a',        // Jet Black - Primary actions
    dark: '#000000',        // Darker black for hover states
    light: '#2d2d2d',       // Lighter black for subtle accents
  },

  // Secondary Colors (Accents)
  secondary: {
    main: '#525252',        // Neutral Grey - Secondary text and accents
    light: '#737373',       // Lighter grey for subtle text
    dark: '#404040',        // Darker grey for borders
  },

  // Text Colors
  text: {
    primary: '#111827',     // Main text color (dark)
    secondary: '#525252',   // Secondary text (same as secondary.main)
    muted: '#737373',       // Muted text
  },

  // Border Colors
  border: {
    default: '#e5e5e5',     // Default border (light grey)
    hover: '#d4d4d4',       // Hover border
    active: '#1a1a1a',      // Active/focused border (primary)
  },
} as const;

// Tailwind-compatible color classes for use in className
export const colorClasses = {
  background: {
    primary: 'bg-[#fcfcf9]',
    card: 'bg-white',
    secondary: 'bg-[#f5f5f3]',
    hover: 'bg-[#e8e8e6]',
  },
  primary: {
    main: 'bg-[#1a1a1a]',
    dark: 'bg-black',
    light: 'bg-[#2d2d2d]',
    text: 'text-[#1a1a1a]',
    textDark: 'text-black',
    border: 'border-[#1a1a1a]',
  },
  secondary: {
    main: 'bg-[#525252]',
    text: 'text-[#525252]',
    border: 'border-[#525252]',
  },
  text: {
    primary: 'text-[#111827]',
    secondary: 'text-[#525252]',
    muted: 'text-[#737373]',
  },
  border: {
    default: 'border-[#e5e5e5]',
    hover: 'border-[#d4d4d4]',
    active: 'border-[#1a1a1a]',
  },
} as const;

// Gradient combinations for Tailwind
export const gradients = {
  primary: 'from-[#1a1a1a] to-black',
  primarySubtle: 'from-[#1a1a1a]/20 to-black/20',
  primaryLight: 'from-[#1a1a1a]/10 to-black/10',
  background: 'from-[#fcfcf9] to-white',
  overlay: 'from-white/90 to-transparent',
  overlayLight: 'from-white/80 to-transparent',
} as const;

// Helper function to create rgba colors with opacity
export const withOpacity = (color: string, opacity: number): string => {
  // Convert hex to rgb
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
