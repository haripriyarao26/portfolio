/**
 * Color Palette Constants
 * 
 * Professional color scheme for systems-level engineering portfolio
 * Recruiter Perception: "This is a systems-level thinker. They focus on reliability and core architecture."
 * 
 * Usage:
 * - For Tailwind classes: Use colorClasses.* (e.g., colorClasses.primary.main)
 * - For inline styles: Use colors.* (e.g., colors.primary.main)
 * - For gradients: Use gradients.* (e.g., gradients.primary)
 */

export const colors = {
  // Background Colors
  background: {
    primary: '#0f172a',      // Slate Navy - Main background
    card: '#1e293b',         // Card background
    secondary: '#334155',    // Secondary card/button background
    hover: '#475569',        // Hover state background
  },

  // Primary Colors (Buttons/Links)
  primary: {
    main: '#f59e0b',        // Amber/Safety Orange - Primary actions
    dark: '#d97706',        // Darker amber for hover states
    light: '#fbbf24',       // Lighter amber for subtle accents
  },

  // Secondary Colors (Accents)
  secondary: {
    main: '#94a3b8',        // Muted Steel - Secondary text and accents
    light: '#cbd5e1',       // Lighter steel for subtle text
    dark: '#64748b',        // Darker steel for borders
  },

  // Text Colors
  text: {
    primary: '#f8fafc',     // Main text color
    secondary: '#94a3b8',   // Secondary text (same as secondary.main)
    muted: '#64748b',       // Muted text
  },

  // Border Colors
  border: {
    default: '#334155',     // Default border
    hover: '#475569',       // Hover border
    active: '#f59e0b',      // Active/focused border (primary)
  },
} as const;

// Tailwind-compatible color classes for use in className
export const colorClasses = {
  background: {
    primary: 'bg-[#0f172a]',
    card: 'bg-[#1e293b]',
    secondary: 'bg-[#334155]',
    hover: 'bg-[#475569]',
  },
  primary: {
    main: 'bg-[#f59e0b]',
    dark: 'bg-[#d97706]',
    light: 'bg-[#fbbf24]',
    text: 'text-[#f59e0b]',
    textDark: 'text-[#d97706]',
    border: 'border-[#f59e0b]',
  },
  secondary: {
    main: 'bg-[#94a3b8]',
    text: 'text-[#94a3b8]',
    border: 'border-[#94a3b8]',
  },
  text: {
    primary: 'text-[#f8fafc]',
    secondary: 'text-[#94a3b8]',
    muted: 'text-[#64748b]',
  },
  border: {
    default: 'border-[#334155]',
    hover: 'border-[#475569]',
    active: 'border-[#f59e0b]',
  },
} as const;

// Gradient combinations for Tailwind
export const gradients = {
  primary: 'from-[#f59e0b] to-[#d97706]',
  primarySubtle: 'from-[#f59e0b]/20 to-[#d97706]/20',
  primaryLight: 'from-[#f59e0b]/10 to-[#d97706]/10',
  background: 'from-[#0f172a] to-[#1e293b]',
  overlay: 'from-[#0f172a]/90 to-transparent',
  overlayLight: 'from-[#0f172a]/80 to-transparent',
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
