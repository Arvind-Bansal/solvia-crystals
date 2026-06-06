# Solvia Crystals — Brand System

Internal documentation for maintaining visual, editorial, and tonal consistency as the brand grows.

---

## 1. Typography

| Role | Font | Weight | Tracking | Usage |
|------|------|--------|----------|-------|
| Headings | Outfit (serif var) | 400–500 | tight to normal | Page titles, section headers, product names |
| Body | Inter (sans var) | 300–400 | normal to wide | Descriptions, UI text, navigation |
| Labels | Inter | 500–700 | 0.15em–0.3em | Badges, filter pills, CTAs, uppercase labels |
| Accent | Outfit italic | 300 | normal | Hero emphasis ("Wearing."), editorial interludes |

### Size Scale
- **Hero**: `text-5xl` → `text-7xl` (mobile → desktop)
- **Section titles**: `text-3xl` → `text-4xl`
- **Product names (cards)**: `text-base`
- **Body**: `text-sm` to `text-base`
- **Labels/badges**: `text-[10px]` to `text-xs`

---

## 2. Colour System

| Token | Value | Usage |
|-------|-------|-------|
| `brand-black` | `#0a0a0a` | Primary background |
| `brand-dark` | `#121212` | Card surfaces, elevated elements |
| `surface-subtle` | `#050505` | Alternate section backgrounds |
| `brand-gold` | `#c5a059` | CTAs, accents, active states, badges |
| `brand-silver` | `#e0e0e0` | Body text, secondary content |
| White | `#ffffff` | Headings, emphasized text |

### Opacity Conventions
- **Borders**: `white/5` (default), `white/10` (active/hover), `white/15` (strong)
- **Body text**: `brand-silver/80` (primary), `brand-silver/60` (secondary)
- **Muted text**: `brand-silver/40` to `brand-silver/50`

---

## 3. Spacing Rhythm

Consistent vertical rhythm across all pages:

| Spacing | Class | Usage |
|---------|-------|-------|
| Section padding | `py-24` (96px) | Standard section |
| Large section | `py-28` to `py-32` | Editorial interludes, hero sections |
| Element spacing | `mb-4` to `mb-8` | Within sections |
| Card padding | `p-4` to `p-6` | Card content areas |
| Container | `container mx-auto px-6` | All page-level containers |
| Max widths | `max-w-3xl` (text), `max-w-5xl` (split layouts) | Content constraint |

---

## 4. Image Treatment

### Photography Direction
- **Tone**: Dark, editorial, macro-focused
- **Background**: Always dark (#0a0a0a or #121212), never white
- **Lighting**: Moody, directional, with controlled highlights on stone surfaces
- **Composition**: Close-up on beads and textures, not lifestyle with faces
- **Aspect ratios**: `4/5` for product cards, `3/4` for editorial, `1/1` for thumbnails

### Technical Requirements
- Format: `.webp` preferred, `.jpg` acceptable
- Resolution: 1200px minimum width for primary images
- Gallery images: 4 per product (primary, hover, detail, lifestyle/packaging)
- Naming: `/public/products/{product-slug}/{variant}.webp`

---

## 5. Copywriting Tone

### Voice Characteristics
- **Restrained**: Say less, mean more. No exclamation marks in product copy.
- **Specific**: Name the stone, the bead size, the technique. Avoid vague claims.
- **Confident**: State facts about materials and history without hedging.
- **Personal**: Write as though recommending to a friend, not selling to a customer.

### Avoid
- "Fine jewelry" / "luxury" / "premium" (let the product speak)
- Mystical overload ("harness cosmic vibrations", "unlock your chakras")
- Aggressive urgency ("limited time!", "selling fast!")
- Generic spiritual language ("manifest your destiny")

### Product Naming
- Two-word names that evoke character, not category
- Examples: Violet Hour, Rose Veil, Midnight Shield, Terra Nova
- Avoid: names that sound AI-generated, overly literal, or clinical

---

## 6. Component Patterns

### Section Borders
All sections separated by `border-t border-white/5` — never by empty space alone.

### Editorial Blocks
- **Quote**: Single-column centred, `max-w-3xl`, Quote icon, subtitle below
- **Split**: Two-column (`max-w-5xl`), image + text, reversible
- **Full-width**: Background image with overlay, centred text

### Product Cards
- Always `aspect-[4/5]` image ratio
- Always show: intention label, name, price, star rating
- Quick-add overlay visible on mobile, hover-reveal on desktop
- Badge system: "Bestseller" (gold), "Sold Out" (glass)

### Interactive Elements
- Hover effects: subtle (`scale-[1.01]`, `scale-[1.02]`), never aggressive
- Transitions: 300ms–700ms, ease-out (`cubic-bezier(0.16, 1, 0.3, 1)`)
- Border transitions on cards: `border-white/5` → `border-white/15`

---

## 7. Mobile-First Principles

- Touch targets: minimum 44px height for interactive elements
- Sticky CTA on product pages with slide-up animation
- Horizontal scroll for gallery thumbnails and recently viewed
- Filter drawer: full-width slide-up, touch-friendly pill buttons
- Cart drawer: full-screen on mobile with spring animation
- Safe area insets: `safe-area-pb` class on all bottom-fixed elements
