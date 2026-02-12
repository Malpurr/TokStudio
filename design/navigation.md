# TokStudio — Navigation Architecture v1.0

---

## 1. Tab Bar Structure

Five tabs, always visible except during Create/Record and full-screen video from non-Feed contexts.

| Position | Icon | Label | Screen | Badge |
|---|---|---|---|---|
| 1 | `home` | Home | Feed | — |
| 2 | `discover` | Discover | Discover/Search | — |
| 3 | `create` | — | Create/Record | Always gradient-filled, slightly raised (4px above bar) |
| 4 | `inbox` | Inbox | Notifications | Red dot / count |
| 5 | `profile` | Me | Profile | Red dot (settings attention) |

### Tab Bar Behavior
- Height: 52px + safe-area-bottom
- Background: `surface-base` with 1px top border `rgba(255,255,255,0.06)`
- Active icon: filled variant + `brand-primary` tint
- Inactive icon: outline variant + `text-tertiary`
- Create button: 40×40px, `brand-gradient` fill, `radius-lg`, no label — visually distinct
- On Feed screen: tab bar is semi-transparent with blur (`backdrop-filter: blur(20px)`)
- Hides on: Create/Record screen, immersive video playback from non-Feed contexts
- Tab switch animation: crossfade content (200ms) + icon state change (`spring-snappy`)

### Tab Memory
Each tab maintains its own navigation stack. Switching tabs does NOT reset the stack. Tapping an already-active tab pops to root and scrolls to top.

---

## 2. Gesture Map

### Global Gestures
| Gesture | Context | Action |
|---|---|---|
| Swipe right from left edge | Any pushed screen | Pop / Go back |
| Swipe down | Modals, sheets | Dismiss |
| Pinch-to-zoom | Photo viewer | Zoom |
| Three-finger tap | Debug builds only | Dev menu |

### Feed-Specific Gestures
| Gesture | Action |
|---|---|
| Swipe up | Next video |
| Swipe down | Previous video (or refresh if at top) |
| Swipe left | Navigate to creator profile |
| Single tap | Pause / Resume video |
| Double tap | Like (with heart animation at tap location) |
| Long press | Context menu (Not Interested, Report, Save, Duet, Stitch) |
| Swipe right from left edge | Back (if deep-linked into feed) |

### Create Screen Gestures
| Gesture | Action |
|---|---|
| Swipe down | Dismiss create screen |
| Pinch on viewfinder | Zoom camera |
| Tap & hold record button | Record video |
| Swipe record button up | Lock recording (hands-free) |

### Bottom Sheet Gestures
| Gesture | Action |
|---|---|
| Drag handle down | Dismiss sheet |
| Drag handle up | Expand to full height |
| Fling down (velocity > threshold) | Dismiss regardless of position |
| Tap scrim | Dismiss |

### Swipe-to-Action (Lists)
| Context | Swipe Left | Swipe Right |
|---|---|---|
| Notification row | Mark read / Mute | — |
| Chat row | Mute / Delete | Pin |
| Comment | Like | — |

---

## 3. Screen Transition Animations

### Push Navigation (Stack)
```
New screen slides in from right (100% → 0% translateX)
Current screen shifts left to -30% translateX + slight dim
Curve: spring-smooth (damping: 26, stiffness: 170)
Duration: ~350ms (spring-determined)
Interruptible: YES — gesture-driven, follows finger position
```

### Pop Navigation (Back)
```
Current screen slides right (0% → 100% translateX)
Previous screen shifts from -30% → 0% translateX
Curve: spring-smooth, velocity inherited from gesture
Interruptible: YES
Threshold: 40% of screen width OR velocity > 500px/s
```

### Tab Switch
```
Outgoing content: fade out (opacity 1→0) + translateY 0→4px
Incoming content: fade in (opacity 0→1) + translateY -4px→0
Duration: 200ms, ease-in-out-quart
Tab bar: icons cross-transition (outline↔filled), 200ms
```

### Bottom Sheet Open
```
Sheet: translateY 100% → 0%, spring-smooth
Scrim: opacity 0 → 0.6, 300ms linear
Content behind: scale 1.0 → 0.95 (subtle), border-radius 0 → 12px
```

### Bottom Sheet Close
```
Sheet: translateY 0% → 100%, velocity-based spring-stiff
Scrim: opacity 0.6 → 0, 200ms linear
Content behind: scale 0.95 → 1.0, border-radius 12px → 0
```

### Modal Present (Full-screen modals like Create)
```
Modal slides up from bottom (100% → 0% translateY)
Curve: spring-smooth
Content behind: dims (no scale transform)
```

### Shared Element Transitions
Used for:
- **Profile avatar** (Feed → Profile): avatar morphs position/size
- **Video thumbnail** (Grid → Player): thumbnail expands to fill screen
- **Sound disc** (Feed → Sound Page): disc morphs to album art

Implementation: Match source/destination frames, animate position + size + border-radius with `spring-smooth`.

---

## 4. Navigation Hierarchy

```
App
├── Splash Screen
├── Auth Flow (if needed)
│   ├── Login
│   ├── Sign Up
│   └── Onboarding
│
├── Main (Tab Bar)
│   ├── Tab 1: Feed
│   │   ├── Video Player (inline)
│   │   ├── → Profile (push)
│   │   ├── → Comments Sheet (sheet)
│   │   ├── → Share Sheet (sheet)
│   │   ├── → Sound Page (push)
│   │   └── → Hashtag Page (push)
│   │
│   ├── Tab 2: Discover
│   │   ├── Search Results (push)
│   │   ├── → Hashtag Page (push)
│   │   ├── → Sound Page (push)
│   │   ├── → Profile (push)
│   │   └── → Video Player (push/modal)
│   │
│   ├── Tab 3: Create (modal overlay)
│   │   ├── Camera / Record
│   │   ├── → Sound Picker (push)
│   │   ├── → Effects Browser (push)
│   │   ├── Edit Video (push)
│   │   └── Post / Publish (push)
│   │
│   ├── Tab 4: Inbox
│   │   ├── Notifications List
│   │   ├── → Messages (push or tab)
│   │   ├── → Profile (push)
│   │   └── → Video Player (push)
│   │
│   └── Tab 5: Profile
│       ├── Own Profile
│       ├── → Edit Profile (push)
│       ├── → Settings (push)
│       ├── → Following/Followers (push)
│       ├── → Video Player (push)
│       └── → Messages (push)
│
├── Sheets (overlay any screen)
│   ├── Comments
│   ├── Share
│   ├── Report
│   └── Long-press Context Menu
│
└── System Overlays
    ├── Toast Notifications
    ├── In-app Notifications (banner)
    └── Network Error Banner
```

---

## 5. Deep Link Structure

### URL Scheme
`tokstudio://`

### Routes
| Pattern | Screen | Example |
|---|---|---|
| `/video/:id` | Feed → specific video | `tokstudio://video/abc123` |
| `/@:username` | Profile | `tokstudio://@johndoe` |
| `/sound/:id` | Sound Page | `tokstudio://sound/xyz789` |
| `/tag/:name` | Hashtag Page | `tokstudio://tag/dancechallenge` |
| `/discover` | Discover tab | `tokstudio://discover` |
| `/inbox` | Inbox tab | `tokstudio://inbox` |
| `/messages/:userId` | DM conversation | `tokstudio://messages/user456` |
| `/create` | Create screen | `tokstudio://create` |
| `/create?sound=:id` | Create with sound | `tokstudio://create?sound=xyz` |
| `/settings` | Settings | `tokstudio://settings` |

### Universal Links (Web)
| Pattern | Behavior |
|---|---|
| `tokstudio.app/v/:id` | Open video (or app store if not installed) |
| `tokstudio.app/@:username` | Open profile |
| `tokstudio.app/t/:hashtag` | Open hashtag |
| `tokstudio.app/s/:soundId` | Open sound |

### Deep Link Handling
1. If app installed → open directly to screen
2. If not installed → web preview page with "Open in App" / App Store links
3. Deferred deep link: remember destination through install flow, navigate after onboarding
