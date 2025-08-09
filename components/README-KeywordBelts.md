# KeywordBelts Component

A reusable React/Next.js component that renders scrolling keyword belts (marquee strips) with text-on-path styling for testimonials sections.

## Features

- **Dual Direction Scrolling**: Top belt scrolls left→right, bottom belt scrolls right→left
- **Performance Optimized**: Uses CSS transforms and keyframes (no SVG paths)
- **Responsive Design**: Clamp-based sizing for mobile to desktop
- **Accessibility**: Respects `prefers-reduced-motion`, includes ARIA labels
- **Seamless Loops**: Duplicated content creates infinite scrolling effect
- **Hover Interactions**: Optional pause-on-hover functionality
- **Customizable Theming**: CSS variables for easy styling

## Installation

Copy these files to your Next.js project:
- `components/KeywordBelts.tsx`
- `components/KeywordBelts.module.css`

## Basic Usage

```tsx
import KeywordBelts from './components/KeywordBelts'

export default function TestimonialsPage() {
  return (
    <section style={{ 
      position: 'relative',
      padding: '10rem 2rem',
      background: '#000000',
      color: '#ffffff'
    }}>
      <KeywordBelts 
        topKeywords={["BRAND STRATEGY", "SEO", "WEB DESIGN", "REACT"]}
        bottomKeywords={["PERFORMANCE", "ACCESSIBILITY", "UI/UX", "CONTENT"]}
        speedTop={70}
        speedBottom={55}
        pauseOnHover={true}
      />
      
      {/* Your testimonials content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2>Client Testimonials</h2>
        {/* ... */}
      </div>
    </section>
  )
}
```

## Props

```typescript
type KeywordBeltsProps = {
  topKeywords: string[]        // Keywords for top belt
  bottomKeywords: string[]     // Keywords for bottom belt
  className?: string           // Additional CSS classes
  speedTop?: number           // Top belt speed (pixels/second, default: 60)
  speedBottom?: number        // Bottom belt speed (pixels/second, default: 60)
  pauseOnHover?: boolean      // Pause animation on hover (default: true)
}
```

## CSS Customization

Override CSS variables for theming:

```css
.my-custom-belts {
  --belt-height: 50px;
  --belt-font-size: 16px;
  --belt-letter-spacing: 0.2em;
  --belt-gap: 3rem;
  --belt-border: 2px;
}
```

## Integration Example

For testimonials sections, ensure the parent container has:

1. `position: relative` (required for absolute positioning)
2. `overflow: hidden` (prevents belt content from extending outside)
3. Adequate padding/margins for belt visibility

```tsx
<section className="testimonials-section">
  <KeywordBelts 
    topKeywords={topKeywords}
    bottomKeywords={bottomKeywords}
    className="testimonials-belts"
  />
  
  <div className="testimonials-content">
    {/* Content with z-index: 1 to appear above belts */}
  </div>
</section>
```

## Accessibility

- Belts are marked with `aria-hidden="true"` as they're decorative
- Respects `prefers-reduced-motion` by stopping animations
- Uses semantic HTML structure with proper roles
- Maintains color contrast inheritance from parent

## Browser Support

- Modern browsers with CSS Grid, Flexbox, and CSS Custom Properties
- Graceful degradation for older browsers
- Mobile-first responsive design
- Dark mode support via CSS media queries

## Performance Notes

- Uses hardware-accelerated CSS transforms
- ResizeObserver for efficient responsive updates
- Minimal DOM manipulation
- Optimized animation duration calculation
- No external dependencies beyond React/Next.js