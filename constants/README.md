# Color Constants

This directory contains centralized color constants for the portfolio.

## Usage

### In React Components

```tsx
import { colors, colorClasses, gradients } from '@/constants/colors';

// For Tailwind classes (most common)
<div className={colorClasses.background.card}>
  <h1 className={colorClasses.text.primary}>Title</h1>
  <button className={colorClasses.primary.main}>Click me</button>
</div>

// For inline styles
<div style={{ backgroundColor: colors.background.primary }}>
  <p style={{ color: colors.text.secondary }}>Text</p>
</div>

// For gradients
<div className={`bg-gradient-to-br ${gradients.primary}`}>
  Content
</div>
```

### Color Palette

- **Background**: `#fcfcf9` (Soft Bone/Paper)
- **Primary**: `#1a1a1a` (Jet Black)
- **Secondary**: `#525252` (Neutral Grey)
- **Text**: `#111827` (Dark)

**Recruiter Perception**: "This is a senior-level professional who doesn't need flashy effects to prove their value."

### Updating Colors

To change the color scheme, edit `constants/colors.ts`. All components will automatically use the new colors.
