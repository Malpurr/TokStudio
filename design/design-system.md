# TokStudio — Design System v1.0

> A premium, OLED-first dark design system for a short-video social platform.
> Inspired by TikTok's UX density, reimagined with glassmorphism, spring physics, and zero visual clutter.

---

## 1. Color Palette

### Core Brand
| Token | Hex | Usage |
|---|---|---|
| `brand-primary` | `#E84FFF` | Primary accent — buttons, active states, brand moments |
| `brand-secondary` | `#5B5FFF` | Secondary accent — links, secondary actions |
| `brand-gradient` | `linear-gradient(135deg, #E84FFF 0%, #5B5FFF 100%)` | Brand gradient — CTAs, highlights |

### Surfaces
| Token | Hex | Usage |
|---|---|---|
| `surface-base` | `#000000` | App background — pure black, OLED-friendly |
| `surface-raised` | `#0A0A0A` | Cards, slightly elevated containers |
| `surface-overlay` | `#111111` | Bottom sheets, modals (before blur) |
| `surface-glass` | `rgba(255, 255, 255, 0.06)` | Glassmorphism fill |
| `surface-glass-border` | `rgba(255, 255, 255, 0.10)` | Glassmorphism border |
| `surface-input` | `#1A1A1A` | Text fields, search bars |

### Text
| Token | Hex | Usage |
|---|---|---|
| `text-primary` | `#FFFFFF` | Headlines, body text |
| `text-secondary` | `#A0A0A0` | Captions, timestamps, placeholders |
| `text-tertiary` | `#5C5C5C` | Disabled text, hints |
| `text-inverse` | `#000000` | Text on light/accent backgrounds |

### Semantic
| Token | Hex | Usage |
|---|---|---|
| `semantic-success` | `#00E676` | Success states, verified badges |
| `semantic-warning` | `#FFB300` | Warnings, caution states |
| `semantic-error` | `#FF3B5C` | Errors, destructive actions |
| `semantic-info` | `#5B5FFF` | Informational banners |

### Interactive
| Token | Hex | Usage |
|---|---|---|
| `interactive-like` | `#FF3B5C` | Heart/like animation |
| `interactive-follow` | `#E84FFF` | Follow button |
| `interactive-live` | `#FF3B5C` | Live badge, pulsing |

### Overlay
| Token | Value | Usage |
|---|---|---|
| `overlay-scrim` | `rgba(0, 0, 0, 0.60)` | Behind modals |
| `overlay-video-gradient` | `linear-gradient(transparent 50%, rgba(0,0,0,0.8) 100%)` | Bottom of video for text legibility |
| `overlay-top-gradient` | `linear-gradient(rgba(0,0,0,0.6) 0%, transparent 100%)` | Top of video for status bar legibility |

---

## 2. Typography

**Font Family:** `Inter` (primary), `SF Pro Display` (iOS fallback), `Roboto` (Android fallback)

**Monospace:** `JetBrains Mono` (code, counters)

### Scale (Mobile — base 16px)
| Token | Size | Weight | Line Height | Letter Spacing | Usage |
|---|---|---|---|---|---|
| `display-lg` | 32px | 800 | 38px | -0.5px | Hero numbers, splash |
| `display-md` | 28px | 700 | 34px | -0.3px | Profile name, section headers |
| `heading-lg` | 22px | 700 | 28px | -0.2px | Screen titles |
| `heading-md` | 18px | 600 | 24px | 0 | Card titles, sheet headers |
| `heading-sm` | 16px | 600 | 22px | 0 | Section labels |
| `body-lg` | 16px | 400 | 24px | 0 | Body text |
| `body-md` | 14px | 400 | 20px | 0.1px | Descriptions, comments |
| `body-sm` | 12px | 400 | 16px | 0.2px | Captions, timestamps |
| `label-lg` | 14px | 600 | 18px | 0.5px | Button labels, tabs |
| `label-md` | 12px | 600 | 16px | 0.5px | Badges, small buttons |
| `label-sm` | 10px | 600 | 14px | 0.8px | Micro labels, counters on icons |

### Rules
- **Never** use more than 2 weights per screen
- Use `text-secondary` for anything that isn't the primary focus
- Truncate with ellipsis after 2 lines for descriptions; 1 line for usernames
- Numbers use tabular (monospaced) figures: `font-variant-numeric: tabular-nums`

---

## 3. Spacing System (4px Grid)

| Token | Value | Usage |
|---|---|---|
| `space-0` | 0px | — |
| `space-1` | 4px | Tight inline gaps (icon-to-text) |
| `space-2` | 8px | Small padding, list item gaps |
| `space-3` | 12px | Medium padding, between related elements |
| `space-4` | 16px | Standard content padding, card padding |
| `space-5` | 20px | Section spacing |
| `space-6` | 24px | Large spacing between sections |
| `space-8` | 32px | Screen edge padding (horizontal) |
| `space-10` | 40px | Major section breaks |
| `space-12` | 48px | Tab bar height |
| `space-16` | 64px | Header heights |
| `space-20` | 80px | Large component heights |

### Layout Constants
| Token | Value | Usage |
|---|---|---|
| `tab-bar-height` | 52px | Bottom tab bar |
| `top-bar-height` | 48px | Top navigation bar |
| `safe-area-top` | dynamic | iOS notch / Android status bar |
| `safe-area-bottom` | dynamic | iOS home indicator / Android nav |
| `action-bar-width` | 52px | Right-side video action buttons |
| `sheet-handle-area` | 32px | Bottom sheet drag handle zone |

---

## 4. Border Radius

| Token | Value | Usage |
|---|---|---|
| `radius-none` | 0px | Full-screen elements |
| `radius-sm` | 4px | Tags, micro badges |
| `radius-md` | 8px | Buttons, inputs, small cards |
| `radius-lg` | 12px | Cards, list items |
| `radius-xl` | 16px | Bottom sheets, modals |
| `radius-2xl` | 24px | Large cards, profile header |
| `radius-full` | 9999px | Avatars, pills, circular buttons |

---

## 5. Shadows & Elevation

We minimize traditional shadows in favor of **luminous borders** and **glassmorphism blur** for a cleaner dark-mode aesthetic.

| Token | Value | Usage |
|---|---|---|
| `elevation-0` | none | Flat elements |
| `elevation-1` | `0 1px 2px rgba(0,0,0,0.5)` | Subtle lift (cards on `surface-base`) |
| `elevation-2` | `0 4px 12px rgba(0,0,0,0.6)` | Floating elements (FABs) |
| `elevation-3` | `0 8px 24px rgba(0,0,0,0.7)` | Modals, sheets |
| `elevation-glow` | `0 0 20px rgba(232, 79, 255, 0.3)` | Brand glow on primary CTAs |

### Glassmorphism Recipe
```css
.glass {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(40px) saturate(180%);
  -webkit-backdrop-filter: blur(40px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 16px;
}
```

---

## 6. Animation System

### Physics-Based Springs (Primary)

All interactive animations use **spring physics**, not bezier curves. This creates the liquid, alive feel.

| Token | Damping | Stiffness | Mass | Usage |
|---|---|---|---|---|
| `spring-snappy` | 20 | 300 | 0.8 | Micro interactions — button press, toggle |
| `spring-smooth` | 26 | 170 | 1.0 | Sheet open/close, page transitions |
| `spring-bouncy` | 15 | 200 | 0.8 | Like animation, follow button, heart pop |
| `spring-gentle` | 30 | 120 | 1.0 | Background parallax, slow reveals |
| `spring-stiff` | 30 | 400 | 1.0 | Snap-back gestures (overscroll return) |

### Bezier Curves (Fallback / CSS-only)
| Token | Value | Duration | Usage |
|---|---|---|---|
| `ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | 400ms | Sheet open, page slide-in |
| `ease-in-out-quart` | `cubic-bezier(0.76, 0, 0.24, 1)` | 300ms | Tab switches, fade transitions |
| `ease-out-back` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | 350ms | Pop-in animations (toasts, badges) |
| `ease-linear` | `linear` | varies | Progress bars, loading spinners |

### Duration Scale
| Token | Value | Usage |
|---|---|---|
| `duration-instant` | 100ms | Opacity changes, color transitions |
| `duration-fast` | 200ms | Button state changes, icon swaps |
| `duration-normal` | 300ms | Sheet open/close, page transitions |
| `duration-slow` | 500ms | Complex multi-element sequences |
| `duration-splash` | 1200ms | Splash screen logo animation |

### Animation Principles
1. **No animation > bad animation.** Remove if it doesn't serve UX.
2. **User-initiated = fast.** System-initiated = slightly slower.
3. **Interruptible always.** Every animation can be cancelled by user gesture.
4. **Stagger children** at 30ms intervals (max 5 items, then batch).
5. **Reduce motion:** Respect `prefers-reduced-motion`. Replace springs with instant opacity fades.
6. **60fps minimum.** Animate only `transform` and `opacity`. Never animate `width`, `height`, `top`, `left`.

### Key Animations Defined
| Animation | Description | Curve |
|---|---|---|
| `video-swipe` | Vertical page transition between videos | `spring-smooth`, gesture-driven velocity |
| `like-burst` | Heart icon scales 1→1.3→1 with particle burst | `spring-bouncy` |
| `double-tap-heart` | Large heart appears center-screen, scales up, fades | 600ms, `ease-out-expo` |
| `sheet-open` | Bottom sheet slides up from 0% to target height | `spring-smooth` |
| `sheet-close` | Sheet slides down with velocity-based dismiss | `spring-stiff` |
| `tab-switch` | Cross-fade + subtle 4px vertical shift | 200ms, `ease-in-out-quart` |
| `page-push` | New screen slides in from right, current shifts left 30% | `spring-smooth` |
| `page-pop` | Reverse of push, gesture-driven with velocity | `spring-smooth` |
| `avatar-follow` | Border animates from 0 to brand-gradient ring | 400ms, `spring-bouncy` |
| `toast-in` | Slide down from top + fade in | `ease-out-back`, 350ms |
| `toast-out` | Fade out + slide up | `ease-out-expo`, 200ms |

---

## 7. Icon System

### Style
- **Outline** (inactive/default) → **Filled** (active/selected)
- Stroke width: 1.5px
- Grid: 24×24px (touch target: 44×44px minimum)
- Corner radius on strokes: 1px (slightly rounded, not sharp)
- No color in icons — use `text-primary` or `text-secondary`; only active tab gets `brand-primary`

### Icon Set (Custom — "TokIcons")
| Icon | Outline | Filled | Usage |
|---|---|---|---|
| `home` | House outline | House filled | Tab — Home/Feed |
| `discover` | Compass outline | Compass filled | Tab — Discover |
| `create` | Plus in circle | Plus in circle (gradient fill) | Tab — Create (always gradient) |
| `inbox` | Bell outline | Bell filled | Tab — Notifications |
| `profile` | Person outline | Person filled | Tab — Profile |
| `heart` | Heart outline | Heart filled (red) | Like action |
| `comment` | Speech bubble | Speech bubble filled | Comment action |
| `share` | Arrow-up-from-square | — | Share action |
| `bookmark` | Bookmark outline | Bookmark filled | Save action |
| `music` | Music note | Music note filled | Sound/music |
| `search` | Magnifying glass | — | Search |
| `close` | X mark | — | Dismiss |
| `back` | Chevron left | — | Navigation back |
| `more` | Three dots horizontal | — | Overflow menu |
| `send` | Paper plane | Paper plane filled | Send message |
| `camera-flip` | Camera with arrows | — | Switch camera |
| `flash` | Lightning bolt | Lightning filled | Flash toggle |
| `timer` | Clock | — | Recording timer |
| `check` | Checkmark | Checkmark in circle | Verification, success |
| `follow-plus` | Person with plus | — | Follow action |
| `link` | Chain link | — | Copy link |
| `flag` | Flag outline | Flag filled | Report |
| `settings` | Gear | Gear filled | Settings |
| `lock` | Lock outline | Lock filled | Private account |

### Animated Icons
- `heart`: Outline → filled with scale bounce on tap
- `bookmark`: Outline → filled with subtle drop animation
- `home` active: Slight scale pulse on tab selection
- `create`: Continuous subtle gradient rotation when idle on tab bar
- `inbox` new notification: Bell wiggle (2 oscillations, 400ms)

---

## 8. Haptics (iOS / Android)

| Event | iOS | Android | When |
|---|---|---|---|
| Tab switch | `selectionChanged` | `TICK` | Switching bottom tabs |
| Like | `impactMedium` | `CLICK` | Tapping heart |
| Double-tap like | `impactHeavy` | `HEAVY_CLICK` | Double-tap heart on video |
| Sheet snap | `impactLight` | `TICK` | Sheet reaches snap point |
| Pull-to-refresh | `impactLight` | `TICK` | Pull threshold crossed |
| Error | `notificationError` | `DOUBLE_CLICK` | Form error |
| Success | `notificationSuccess` | `CLICK` | Post published |
| Long press menu | `impactMedium` | `LONG_PRESS` | Context menu appears |

---

## 9. Accessibility

- Minimum contrast ratio: **4.5:1** (text), **3:1** (large text/icons)
- All interactive elements: 44×44px minimum touch target
- `prefers-reduced-motion`: Disable springs, use instant opacity
- `prefers-contrast`: Increase border opacity to 0.2, text to pure white
- Screen reader: All icons have `aria-label`, all images have `alt`
- Focus indicators: 2px `brand-primary` ring, 2px offset
- Dynamic type: Scale up to 200% without layout breakage

---

## 10. Dark Mode Variants

TokStudio is **dark-first**. Light mode is a future consideration.

For potential light mode adaptation:
| Dark Token | Light Equivalent |
|---|---|
| `surface-base` #000000 | `#FAFAFA` |
| `surface-raised` #0A0A0A | `#FFFFFF` |
| `text-primary` #FFFFFF | `#111111` |
| `text-secondary` #A0A0A0 | `#666666` |
| `surface-glass` rgba(255,255,255,0.06) | `rgba(0,0,0,0.04)` |
