# Alex and Ben Design System

**Adapted from:** igreat.cloud + loudfair.com  
**Philosophy:** Black/gray/white only, SF Pro typography, glass morphism, premium minimalism

---

## Color Palette

### Dark Theme (Primary)

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0a0a0a` | Main background |
| `--bg-secondary` | `#111111` | Secondary surfaces |
| `--bg-elevated` | `#1a1a1a` | Elevated cards |
| `--bg-card` | `#242424` | Card backgrounds |
| `--glass-bg` | `#1A1A1A` | Glass button fill |

### Text Hierarchy (NEVER 100% WHITE)

| Level | Opacity | Usage |
|-------|---------|-------|
| `--text-hero` | `rgba(255,255,255,0.92)` | Hero text, presence |
| `--text-primary` | `rgba(255,255,255,0.75)` | Primary content |
| `--text-secondary` | `rgba(255,255,255,0.60)` | Secondary info |
| `--text-tertiary` | `rgba(255,255,255,0.45)` | Muted, metadata |

### Accent

| Token | Hex | Usage |
|-------|-----|-------|
| `--accent-blue` | `#0071E3` | Buttons ONLY |
| `--border-subtle` | `rgba(255,255,255,0.08)` | Borders, dividers |

---

## Typography

**Font Stack:** SF Pro Display, SF Pro Text, -apple-system, BlinkMacSystemFont

| Role | Size | Weight | Usage |
|------|------|--------|-------|
| Display | 64-96px | 100 (Thin) | Hero titles |
| Headline | 27-36px | 100 (Thin) | Section headers |
| Subhead | 18-21px | 300 (Light) | Supporting text |
| Body | 17px | 300 (Light) | Primary content |
| Caption | 12px | 300 (Light) | Labels, metadata |

**Rules:**
- Weights 100-400 ONLY (thin aesthetic)
- 25% larger than standard
- NEVER bold text

---

## Button System

### 1. Glass Button (Hero/Primary)
```css
background: #1A1A1A;
backdrop-filter: blur(20px);
border-radius: 100px;
padding: 6px 11.5px;
font-size: 16px;
/* Inner shadows for edge glow */
```
**Use:** Dark backgrounds, hero sections ONLY

### 2. Marketing Pill
```css
background: #0071E3; /* Blue ONLY for actions */
border-radius: 980px;
padding: 11px 21px;
font-size: 17px;
```
**Use:** Primary CTAs, sign up, get started

### 3. Rounded Rectangle
```css
background: #0071E3;
border-radius: 8px;
height: 44px;
padding: 8px 15px;
font-size: 14px;
```
**Use:** Store buttons, form submissions

### 4. Text Link
```css
color: rgba(255,255,255,0.75);
background: transparent;
border-radius: 0;
/* Hover: underline, opacity increase */
```

### 5. Text Link with Chevron
```css
color: rgba(255,255,255,0.75);
/* Chevron: → */
/* Hover: chevron animation */
```

### 6. Info Card Button
```css
background: #F5F5F7;
color: #1D1D1F;
border-radius: 18px;
padding: 12px 16px;
font-size: 12px;
```
**Use:** Card CTAs on light backgrounds

---

## Border Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| `sm` | 4px | Small elements |
| `base` | 8px | Buttons, inputs |
| `lg` | 12px | Cards |
| `xl` | 18px | Info card buttons |
| `pill` | 980px | Marketing CTAs |
| `glass` | 100px | Glass buttons |

---

## Spacing Scale

| Token | Value |
|-------|-------|
| `1` | 4px |
| `2` | 8px |
| `3` | 12px |
| `4` | 16px |
| `5` | 20px |
| `6` | 24px |
| `8` | 32px |
| `10` | 40px |
| `12` | 48px |
| `16` | 64px |
| `20` | 80px |

---

## Cards

### Content Card
```css
background: #1a1a1a;
border-radius: 12px;
padding: 24px;
/* No border, subtle elevation through bg color */
```

### Info Card
```css
background: #242424;
border-radius: 12px;
padding: 16px;
```

---

## Layout

### Page Margins
- **Minimum:** 10-15mm all sides
- **Container:** max-width 1200px, centered
- **Mobile:** 16px padding

### Grid
- 12-column grid
- 24px gutters
- Responsive breakpoints: 640px, 768px, 1024px, 1280px

---

## Shadows

**Glass Button Only:**
```css
box-shadow: 
  0 4px 24px rgba(0, 0, 0, 0.4),
  inset 0 1px 0 rgba(255, 255, 255, 0.05);
```

**No shadows on standard buttons** — clean, flat aesthetic

---

## Animation

### Transitions
- Duration: 150-200ms
- Easing: ease or cubic-bezier(0.4, 0, 0.2, 1)
- Properties: opacity, transform, background-color

### Page Load
```css
animation: fadeIn 2s ease-in-out;
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### Background Fade
```css
animation: bgFadeZoom 3s ease-out forwards;
@keyframes bgFadeZoom {
  from { opacity: 0; transform: scale(1.2); }
  to { opacity: 0.3; transform: scale(1); }
}
```

---

## Components

### Content Item Card
```
┌─────────────────────────────────────┐
│  🌟 Score 93                        │
│                                     │
│  Steve Jobs Stanford Commencement   │
│  Steve Jobs • 15m • SPEECH          │
│                                     │
│  The gold standard. Every word...   │
│                                     │
│  [ Watch Now ]                      │
└─────────────────────────────────────┘
```

### Score Badge
- 90-100: 🌟 Gold
- 80-89: ✨ Silver
- 70-79: 👍 Bronze
- <70: • Gray

### Tags
```css
background: rgba(255,255,255,0.08);
color: rgba(255,255,255,0.60);
border-radius: 4px;
padding: 4px 8px;
font-size: 12px;
```

---

## Design Principles

1. **NEVER 100% opacity** — Hero text at 92%, primary at 75%
2. **Colors are relationships** — Text knocked toward backgrounds
3. **No shadows except glass** — Clean, intentional
4. **Thin typography** — Weights 100-400 only
5. **Full bleed backgrounds** — No white edges
6. **3 colors max** — Black, gray, white (blue for buttons only)

---

## Implementation

### CSS Variables
```css
:root {
  --bg-primary: #0a0a0a;
  --bg-secondary: #111111;
  --bg-elevated: #1a1a1a;
  --bg-card: #242424;
  --text-hero: rgba(255,255,255,0.92);
  --text-primary: rgba(255,255,255,0.75);
  --text-secondary: rgba(255,255,255,0.60);
  --text-tertiary: rgba(255,255,255,0.45);
  --accent-blue: #0071E3;
  --border-subtle: rgba(255,255,255,0.08);
}
```

### Tailwind Classes (Reference)
```
bg-[#0a0a0a]           /* Primary background */
bg-[#1a1a1a]           /* Elevated surface */
bg-[#242424]           /* Card background */
text-white/92          /* Hero text */
text-white/75          /* Primary text */
text-white/60          /* Secondary text */
text-white/45          /* Tertiary text */
bg-[#0071E3]           /* Button accent */
rounded-[100px]        /* Glass buttons */
rounded-[980px]        /* Marketing pills */
rounded-lg             /* Cards (12px) */
```

---

## File Structure

```
design-system/
├── tokens.css          # CSS custom properties
├── components/         # React/Vue components
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── ContentItem.jsx
│   └── ScoreBadge.jsx
├── styles/             # Global styles
│   ├── typography.css
│   ├── layout.css
│   └── animations.css
└── examples/           # Usage examples
    ├── hero.html
    ├── content-list.html
    └── modal.html
```

---

*Adapted from igreat.cloud + loudfair.com design philosophies.  
Maintained by: Alex and Ben*
