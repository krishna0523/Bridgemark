# KeywordBelts Integration Example

## Quick Setup

1. **Copy Files** to your Next.js project:
   - `components/KeywordBelts.tsx`
   - `components/KeywordBelts.module.css`

2. **Basic Integration** in your testimonials section:

```tsx
import KeywordBelts from './components/KeywordBelts'

export default function HomePage() {
  return (
    <section style={{
      padding: '10rem 2rem',
      background: '#000000',
      color: '#ffffff',
      overflow: 'hidden',
      position: 'relative' // REQUIRED for belts positioning
    }}>
      {/* Add KeywordBelts at the top of your section */}
      <KeywordBelts 
        topKeywords={["BRAND STRATEGY", "SEO", "WEB DESIGN", "REACT", "GSAP", "THREE.JS"]}
        bottomKeywords={["PERFORMANCE", "ACCESSIBILITY", "ANALYTICS", "UI/UX", "CONTENT", "OPTIMIZATION"]}
        speedTop={70}
        speedBottom={55}
        pauseOnHover={true}
      />
      
      {/* Your existing testimonials content */}
      <div style={{ 
        maxWidth: '1000px', 
        margin: '0 auto', 
        textAlign: 'center',
        position: 'relative',
        zIndex: 1 // Ensures content appears above belts
      }}>
        <h2>Client Testimonials</h2>
        {/* ... rest of your testimonials ... */}
      </div>
    </section>
  )
}
```

## Already Integrated ✅

The component has been added to your existing testimonials section in `/pages/index.js`:

```javascript
// Added at top of testimonials section
<KeywordBelts 
  topKeywords={["BRAND STRATEGY", "SEO", "WEB DESIGN", "REACT", "GSAP", "THREE.JS"]}
  bottomKeywords={["PERFORMANCE", "ACCESSIBILITY", "ANALYTICS", "UI/UX", "CONTENT", "OPTIMIZATION"]}
  speedTop={70}
  speedBottom={55}
  pauseOnHover={true}
/>
```

## Customization Options

### Speed Control
```tsx
<KeywordBelts 
  speedTop={100}    // Faster top belt
  speedBottom={30}  // Slower bottom belt
  pauseOnHover={false} // Disable pause on hover
/>
```

### Custom Styling
```tsx
<KeywordBelts 
  className="my-custom-belts"
  // ... other props
/>
```

```css
.my-custom-belts {
  --belt-height: 50px;
  --belt-font-size: 16px;
  --belt-letter-spacing: 0.2em;
  --belt-gap: 3rem;
}
```

## Features

- ✅ **Dual Direction Scrolling**: Top (L→R), Bottom (R→L)
- ✅ **Responsive**: Automatic sizing for mobile to desktop  
- ✅ **Performance**: CSS transforms, no SVG overhead
- ✅ **Accessibility**: Respects reduced motion preferences
- ✅ **Seamless Loops**: Infinite scrolling effect
- ✅ **Hover Pause**: Optional interaction feedback
- ✅ **Theme Aware**: Inherits your site's colors

## Browser Support

- ✅ Modern browsers (Chrome 88+, Firefox 84+, Safari 14+)
- ✅ Mobile responsive (iOS Safari, Android Chrome)
- ✅ Dark mode support
- ✅ Reduced motion accessibility