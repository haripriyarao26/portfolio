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

- **Background**: `#0f172a` (Slate Navy)
- **Primary**: `#f59e0b` (Amber/Safety Orange)
- **Secondary**: `#94a3b8` (Muted Steel)
- **Text**: `#f8fafc` (Light)

### Updating Colors

To change the color scheme, edit `constants/colors.ts`. All components will automatically use the new colors.
