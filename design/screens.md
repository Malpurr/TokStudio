# TokStudio — Screen Specifications v1.0

> Every screen in the app, fully specified. Layout, elements, interactions, transitions.

---

## 1. Splash Screen

### Layout
- Full screen, `surface-base` (#000)
- Centered: TokStudio logo (animated)
- No status bar, no navigation

### Elements
- **Logo mark** — Custom animated icon, 80×80px
- **Wordmark** — "TokStudio" in `display-lg`, `text-primary`, appears 400ms after logo

### Animation Sequence (1200ms total)
1. **0–400ms:** Logo mark draws in (stroke animation, `brand-gradient`)
2. **400–700ms:** Logo fills with gradient, slight scale bounce (`spring-bouncy`)
3. **700–1000ms:** Wordmark fades in from below (20px translate-y, `ease-out-expo`)
4. **1000–1200ms:** Entire screen fades to Feed

### Transition Out
- Crossfade to Feed (300ms, `ease-in-out-quart`)
- If first launch → crossfade to Onboarding instead

---

## 2. Feed (Home)

### Layout
```
┌─────────────────────────┐
│ [safe-area-top]         │
│ Following | For You     │  ← TopBar (transparent, over video)
│                         │
│                         │
│    [FULL SCREEN VIDEO]  │
│                         │
│                         │
│                    [♥]  │  ← Action bar (right side)
│ @user               💬  │
│ Caption text...     ↗   │
│ 🎵 Sound name      🔖  │
│ [safe-area-bottom]      │
│ [  Tab Bar  ]           │
└─────────────────────────┘
```

### Elements

**Top Bar** (overlaid on video, gradient scrim behind)
- **Segmented tabs:** "Following" | "For You" — `label-lg`, underline indicator (2px, `brand-primary`)
- **Live indicator** (optional): Red dot + "LIVE" pill, left of tabs
- Tapping "Following" filters to followed creators only

**Video Layer** (full screen, edge-to-edge)
- `<Video>` fills viewport, `object-fit: cover`
- Auto-plays on appear, pauses on scroll-away
- Single tap: pause/play (play icon fades in center, 200ms)
- Long press: playback speed options (0.5×, 1×, 1.5×, 2×)

**Action Bar** (right side, vertically stacked, bottom-aligned)
- **Avatar** (36px, `radius-full`, border: 2px `brand-primary` if not following) + small "+" badge to follow
- **Like** heart icon + count (`label-sm`)
- **Comment** bubble icon + count
- **Bookmark** icon + count
- **Share** arrow icon
- **Rotating disc** (40px) — album art or avatar, spins slowly while audio plays

**Bottom Overlay** (left-aligned, over gradient scrim)
- **@username** — `heading-sm`, bold, tappable → Profile
- **Caption** — `body-md`, max 2 lines, "...more" to expand. Tapping expands inline (spring animation)
- **Sound row** — 🎵 icon + sound name (marquee scroll if long), tappable → Sound Page

**Tab Bar** — see Components doc

### Interactions & Gestures
| Gesture | Action |
|---|---|
| Swipe up | Next video (`spring-smooth`, velocity-based) |
| Swipe down | Previous video |
| Swipe left | Go to creator's Profile |
| Swipe right (from edge) | Back (if navigated into Feed) |
| Single tap | Pause / Resume |
| Double tap | Like (heart burst animation at tap point) |
| Long press | Speed menu / "Not interested" / Report |
| Pinch | No action (intentional — avoids accidental zoom) |

### Transitions
- **To:** Swipe left → Profile (slide from right)
- **To:** Tap comment → Comments Sheet (sheet slides up)
- **To:** Tap share → Share Sheet (sheet slides up)
- **To:** Tap sound → Sound Page (push navigation)
- **To:** Tap avatar "+" → Follow (animation on avatar, no navigation)
- **From:** Other tabs → crossfade with 4px vertical shift

---

## 3. Video Player (Overlaid Controls)

The Video Player is not a separate screen — it IS the Feed. This section documents the overlay control system.

### Pause State
- Center screen: Play icon (▶), 64px, `text-primary` at 80% opacity, `spring-bouncy` scale-in
- Video frame frozen, slight dim overlay (10% black)
- Auto-hides after 3s if resumed

### Progress Bar
- **Default:** Thin line (2px) at very bottom of video, `text-tertiary` track, `brand-primary` fill
- **On touch:** Expands to 4px, shows timestamp tooltip above thumb
- Scrubbable — video shows preview frames while scrubbing
- Appears above tab bar

### Volume/Brightness Gestures (optional, settings-enabled)
- Slide up/down on left half → Brightness
- Slide up/down on right half → Volume
- Visual: Vertical bar indicator appears on respective side

---

## 4. Comments Sheet

### Layout
```
┌─────────────────────────┐
│ ████ (dim scrim)        │
│                         │
├─────────────────────────┤  ← Glass sheet, slides up to 75% height
│     ─── (handle)        │
│ 1,234 Comments    [✕]   │
│─────────────────────────│
│ [avatar] @user  · 2h    │
│  Comment text here      │
│  ♥ 42   Reply           │
│─────────────────────────│
│ [avatar] @user  · 5h    │
│  Comment text here      │
│  ♥ 12   Reply           │
│  └─ View 3 replies      │
│         ...             │
├─────────────────────────┤
│ [avatar] [  Type...  ] →│  ← Input bar, pinned to bottom
└─────────────────────────┘
```

### Elements

**Sheet Container**
- Glassmorphism: `surface-glass` + `backdrop-filter: blur(40px)`
- `radius-xl` top corners
- Drag handle: 36×4px, `text-tertiary`, centered

**Header**
- Comment count — `heading-md`
- Close (✕) — top-right, 44×44 touch target

**Comment List** (virtualized for performance)
- **Avatar** — 32px, `radius-full`
- **Username** — `label-lg`, `text-primary` + timestamp `body-sm`, `text-secondary`
- **Comment body** — `body-md`, `text-primary`
- **Actions row** — ♥ like + count, "Reply" text button
- **Nested replies** — indented 40px, "View N replies" expandable
- **Creator badge** — "Creator" pill next to username if OP

**Input Bar** (pinned to keyboard)
- User avatar (24px)
- Text input — `surface-input`, `radius-full`, placeholder "Add a comment..."
- Send button — `brand-primary` icon, disabled until text entered
- @mention autocomplete — appears above input as a glass overlay

### Interactions
| Gesture | Action |
|---|---|
| Drag handle down | Dismiss sheet (`spring-stiff` snap) |
| Swipe comment left | Like shortcut |
| Long press comment | Copy / Report / Pin (if creator) |
| Tap "Reply" | Focus input, prepend @username |
| Tap avatar/username | Push to Profile |
| Scroll to bottom | Load more (infinite scroll) |

### Transitions
- **Open:** From bottom, `spring-smooth`, 75% screen height
- **Close:** Velocity-based dismiss or tap scrim/✕
- Video continues playing (muted or reduced volume) behind scrim

---

## 5. Share Sheet

### Layout
```
┌─────────────────────────┐
│ ████ (dim scrim)        │
│                         │
├─────────────────────────┤  ← Glass sheet, ~40% height
│     ─── (handle)        │
│ Send to                 │
│ [🔍 Search friends   ]  │
│ [av][av][av][av][av]→   │  ← Horizontal scroll of recent chats
│─────────────────────────│
│ Share to                │
│ [Copy] [SMS] [IG] [WA]  │
│ [TW]  [FB] [Snap][Mail] │
│─────────────────────────│
│ [More options]          │
│ 🔗 Copy link            │
│ ↓ Save video            │
│ 🚫 Not interested       │
│ ⚑ Report                │
└─────────────────────────┘
```

### Elements

**"Send to" Section**
- Search bar — `surface-input`, `radius-full`
- Recent contacts — horizontal scroll, 56px avatars + name below (`label-sm`)
- Multi-select: tapping adds checkmark, "Send" button appears bottom

**"Share to" Section**
- Grid of platform icons (48px) with labels
- Apps detected dynamically via OS share API
- First row: most-used apps

**More Options**
- List of actions: Copy Link, Save Video, Not Interested, Report, Duet, Stitch
- Each row: icon (24px) + label (`body-lg`)

### Transitions
- Same as Comments Sheet — glass bottom sheet, `spring-smooth`
- Dismiss: drag down or tap scrim

---

## 6. Profile Page

### Layout
```
┌─────────────────────────┐
│ [safe-area-top]         │
│ ← @username      [≡]   │  ← TopBar
│                         │
│       [AVATAR 88px]     │
│      Display Name       │
│       @username         │
│                         │
│  142        12.5K   890 │
│ Following  Followers Likes│
│                         │
│ [ Edit Profile ] [🔗]   │  ← or [Follow][Message]
│                         │
│ Bio text goes here      │
│ 🔗 linktr.ee/user       │
│─────────────────────────│
│ [📹 Videos][♥ Liked][🔖]│  ← Tab bar (segmented)
│ ┌────┬────┬────┐        │
│ │ vid│ vid│ vid│        │  ← 3-column grid
│ ├────┼────┼────┤        │
│ │ vid│ vid│ vid│        │
│ └────┴────┴────┘        │
│ [  Tab Bar  ]           │
└─────────────────────────┘
```

### Elements

**Top Bar**
- Back arrow (if pushed), username (`heading-md`), hamburger/settings icon (right)

**Profile Header**
- Avatar — 88px, `radius-full`, optional gradient ring (for stories/live)
- Display name — `heading-lg`
- Username — `body-md`, `text-secondary`
- Stats row — Three columns: Following / Followers / Likes — numbers in `heading-sm`, labels in `body-sm`
- **Own profile:** "Edit Profile" button (outline, `radius-md`) + share icon button
- **Other's profile:** "Follow" button (`brand-gradient` fill, `radius-md`) + "Message" button (outline) + dropdown (▾) for mute/block/report

**Bio Section**
- Bio text — `body-md`, max 3 lines
- Link — `brand-secondary` color, tappable

**Content Tabs** (SegmentedControl, pinned on scroll)
- Videos (grid icon) | Liked (heart icon) | Saved (bookmark icon)
- Liked/Saved only visible on own profile
- Underline indicator, animated slide

**Video Grid**
- 3 columns, 1px gap
- Aspect ratio: 9:16 thumbnails
- Overlay on each: play count (▶ 12.3K) bottom-left, small
- Pinned videos: 📌 icon top-left

### Interactions
| Gesture | Action |
|---|---|
| Pull down on header | Refresh profile |
| Tap video | Full-screen video player (shared element transition) |
| Tap followers/following | Push to Following/Followers list |
| Scroll up | Header collapses, tabs pin to top (animated) |
| Swipe right (from edge) | Pop back |

### Transitions
- **From Feed:** Slide from right (or shared avatar transition)
- **To video:** Shared element — thumbnail expands to full screen
- **To followers:** Push from right

---

## 7. Discover / Search

### Layout
```
┌─────────────────────────┐
│ [safe-area-top]         │
│ [🔍 Search             ]│  ← Search bar
│                         │
│ Trending                │
│ #hashtag1  #hashtag2    │  ← Horizontal pills
│ #hashtag3  #hashtag4    │
│─────────────────────────│
│ ┌──────────┬──────────┐ │
│ │  BANNER  │  small   │ │  ← Mosaic grid layout
│ │  VIDEO   ├──────────┤ │
│ │          │  small   │ │
│ ├────┬─────┴──────────┤ │
│ │ sm │    BANNER      │ │
│ └────┴────────────────┘ │
│        ...              │
│ [  Tab Bar  ]           │
└─────────────────────────┘
```

### Elements

**Search Bar**
- `surface-input`, `radius-full`, magnifying glass icon left
- Tap → push to Search Results screen with keyboard open
- "Cancel" text button appears right when focused

**Trending Section**
- Horizontal scrollable pills — `surface-glass`, `radius-full`, `label-md`
- Each pill: hashtag name + fire/trending emoji

**Content Grid (Mosaic)**
- Mixed-size tiles: large (2×2), medium (2×1), small (1×1)
- Algorithm-driven layout for visual interest
- Each tile: video thumbnail + category label overlay (bottom-left)
- Auto-play on visible (muted, first 3 seconds)

**Categories Row** (below trending)
- Horizontal scroll: "Music" "Comedy" "Sports" "Food" "Fashion" etc.
- Each: icon + label in a rounded card

### Search Results (Sub-screen)
- Tabs: Top | Users | Videos | Sounds | Hashtags
- Results rendered per type
- Recent searches shown initially (with clear all option)

### Transitions
- **From tab:** Crossfade
- **To search results:** Push from bottom (keyboard drives)
- **To video:** Shared element (thumbnail → full screen)
- **To hashtag/sound:** Push from right

---

## 8. Create / Record

### Layout
```
┌─────────────────────────┐
│ [safe-area-top]         │
│ ✕   🎵Sounds  [Settings]│  ← Top controls
│                         │
│                         │
│    [CAMERA VIEWFINDER]  │
│                         │
│    [Beauty][Filters]    │  ← Right side tools
│    [Timer] [Flash]      │
│    [Flip]               │
│                         │
│ Effects                 │  ← Bottom: scrollable effect row
│ [e1][e2][e3][e4][e5]→  │
│                         │
│ ────── 🔴 60s ──────    │  ← Record button + duration tabs
│     15s  60s  3m  10m   │
│ [Upload]  [⏺]  [✓]    │  ← Bottom bar
└─────────────────────────┘
```

### Elements

**Camera Viewfinder**
- Full screen behind all controls
- Live preview with selected filter/effect applied

**Top Controls**
- Close (✕) — returns to Feed
- "Sounds" — tap to select music (push to Sound Picker)
- Settings gear — recording settings (quality, grid overlay)

**Side Tools** (vertical stack, right side)
- Flip camera — `camera-flip` icon
- Flash — cycle: off → on → auto
- Timer — 3s / 10s countdown
- Beauty mode — toggle
- Filters — opens filter carousel

**Effects Row** (horizontal scroll, bottom)
- Circular thumbnails (48px) of AR effects
- Selected effect: `brand-primary` ring

**Record Button**
- Center: 72px red circle, white outer ring
- Tap: photo mode | Hold: record (fills progress ring around button)
- Duration tabs above: 15s | 60s | 3m | 10m

**Bottom Bar**
- Upload (gallery icon) — pick from camera roll
- Record button (center)
- Checkmark — proceed to edit (appears after recording)

### Post-Record Edit Screen
- Video preview + trim timeline
- Text overlay tool
- Sticker/emoji tool
- Voice effects
- Volume control (original vs. music)
- "Next" → Post screen (caption, hashtags, settings)

### Transitions
- **Open:** Slide up from tab bar (Create tab), `spring-smooth`
- **Close:** Slide down (✕) or swipe down gesture
- **To Post:** Push from right

---

## 9. Notifications

### Layout
```
┌─────────────────────────┐
│ [safe-area-top]         │
│ Notifications           │  ← TopBar
│─────────────────────────│
│ Today                   │
│ [av] user liked your    │
│      video         [▶]  │  ← Thumbnail right-aligned
│ [av] user started       │
│      following you [Fol]│  ← Follow-back button
│ [av] user commented:    │
│      "nice!" 😂    [▶]  │
│─────────────────────────│
│ This Week               │
│ [av][av]+3 liked your   │
│          video     [▶]  │  ← Grouped notifications
│         ...             │
│ [  Tab Bar  ]           │
└─────────────────────────┘
```

### Elements

**Section Headers**
- "Today", "This Week", "This Month" — `label-lg`, `text-secondary`

**Notification Row**
- Avatar(s) — 36px, stacked if grouped (max 3 + "+N")
- Text — `body-md`: **username** (bold) + action + timestamp
- Right accessory: video thumbnail (40×56px, rounded) OR "Follow" button
- Unread: subtle `surface-raised` background tint
- Swipe left: mark as read / mute

**Types**
- Like, Comment, Follow, Mention, Duet/Stitch, Live, System

### Interactions
- Tap notification → navigate to relevant screen (video, profile, comment)
- Pull down → refresh
- Swipe left → contextual actions

### Transitions
- **From tab:** Crossfade
- **To video/profile:** Push from right

---

## 10. Settings

### Layout
```
┌─────────────────────────┐
│ [safe-area-top]         │
│ ← Settings              │  ← TopBar
│─────────────────────────│
│ Account                 │
│ ├ Manage account        │
│ ├ Privacy               │
│ ├ Security              │
│ └ Sharing               │
│─────────────────────────│
│ Content & Activity      │
│ ├ Push notifications    │
│ ├ Language              │
│ ├ Content preferences   │
│ └ Digital wellbeing     │
│─────────────────────────│
│ Cache & Storage         │
│ ├ Free up space         │
│ └ Data saver            │
│─────────────────────────│
│ About                   │
│ ├ Terms of Service      │
│ ├ Privacy Policy        │
│ └ App version 1.0.0     │
│─────────────────────────│
│ [  Log out  ]           │  ← Destructive, red text
│ [  Tab Bar  ]           │
└─────────────────────────┘
```

### Elements
- Grouped list sections with section headers (`label-lg`, `text-secondary`)
- Each row: label (`body-lg`) + chevron right or toggle switch
- Toggle switches use `brand-primary` for active state
- "Log out" — `semantic-error` color, centered, confirmation dialog

### Transitions
- **From Profile:** Push from right
- **Sub-settings:** Push from right (standard navigation)

---

## 11. Direct Messages

### Chat List Layout
```
┌─────────────────────────┐
│ [safe-area-top]         │
│ Messages          [✏️]  │  ← TopBar + compose
│ [🔍 Search            ] │
│─────────────────────────│
│ [av] Display Name   2m  │
│      Last message...    │  ← Blue dot if unread
│─────────────────────────│
│ [av] Display Name   1h  │
│      Sent a video       │
│─────────────────────────│
│ [av] Display Name   3d  │
│      You: ok sounds g..│
│         ...             │
│ [  Tab Bar  ]           │
└─────────────────────────┘
```

### Conversation Layout
```
┌─────────────────────────┐
│ [safe-area-top]         │
│ ← [av] Username    [📞]│  ← TopBar
│─────────────────────────│
│        Today 2:30 PM    │
│                         │
│         [Message bubble]│  ← Sent (brand-gradient bg)
│ [Message bubble]        │  ← Received (surface-raised bg)
│                         │
│         [Video preview] │  ← Shared video
│ [Message bubble]        │
│─────────────────────────│
│ [➕] [  Type...  ] [🎤] │  ← Input bar
└─────────────────────────┘
```

### Elements

**Chat List**
- Avatar (48px), name (`heading-sm`), timestamp (`body-sm`, `text-secondary`)
- Last message preview (`body-md`, `text-secondary`), 1 line truncated
- Unread indicator: blue dot (8px, `brand-secondary`)
- Swipe left: mute / delete

**Conversation**
- Sent bubbles: `brand-gradient` background, `text-primary`, `radius-lg` (tail bottom-right)
- Received bubbles: `surface-raised` background, `text-primary`, `radius-lg` (tail bottom-left)
- Shared content: video thumbnail card (tappable), link previews
- Timestamps between message groups (>5 min gap)
- Typing indicator: three pulsing dots in a bubble
- Read receipts: small avatar under last read message

**Input Bar**
- Plus (➕) — media picker: Gallery, Camera, GIF
- Text input — `surface-input`, `radius-full`
- Mic icon (when empty) → Send icon (when text entered)
- Emoji keyboard toggle

### Transitions
- **Chat list → Conversation:** Push from right, shared avatar element
- **Tap shared video:** Full-screen video player

---

## 12. Following / Followers

### Layout
```
┌─────────────────────────┐
│ [safe-area-top]         │
│ ← username              │
│ [Following] [Followers] │  ← SegmentedControl
│─────────────────────────│
│ [🔍 Search            ] │
│ [av] Display Name       │
│      @username   [Foll] │  ← Follow/Following button
│ [av] Display Name       │
│      @username   [Foll] │
│         ...             │
└─────────────────────────┘
```

### Elements
- Segmented control: "Following" | "Followers" (counts in labels)
- Search bar to filter
- User rows: avatar (44px) + name/username + follow button
- Follow states: "Follow" (`brand-gradient` fill) | "Following" (outline) | "Friends" (mutual, outline with ✓)
- Suggested section at bottom: "People you may know"

### Transitions
- **From Profile:** Push from right

---

## 13. Sound Page

### Layout
```
┌─────────────────────────┐
│ [safe-area-top]         │
│ ←                       │
│                         │
│ 🎵 [Album art / wave]   │
│ Sound Name              │
│ Artist Name             │
│ 1.2M videos             │
│                         │
│ [▶ Use this sound ]     │  ← brand-gradient button
│ [🔖 Save]               │
│─────────────────────────│
│ ┌────┬────┬────┐        │
│ │ vid│ vid│ vid│        │  ← Videos using this sound
│ ├────┼────┼────┤        │
│ │ vid│ vid│ vid│        │
│ └────┴────┴────┘        │
└─────────────────────────┘
```

### Elements
- Album art or waveform visualization (animated while preview plays)
- Sound name — `heading-lg`
- Artist — `body-md`, `text-secondary`
- Video count — `body-sm`, `text-secondary`
- "Use this sound" CTA — full-width, `brand-gradient`, `radius-md`
- Save/bookmark button
- Video grid — same as Profile (3-column, 9:16 thumbnails)

### Interactions
- Audio preview auto-plays on enter
- Tap video → full-screen player (all videos on this sound become the feed)
- "Use this sound" → Create screen with sound pre-selected

---

## 14. Hashtag Page

### Layout
```
┌─────────────────────────┐
│ [safe-area-top]         │
│ ←                       │
│                         │
│ # hashtagname           │  ← display-md
│ 45.2M views             │
│ Trending 🔥              │
│                         │
│ [Description text if    │
│  curated by platform]   │
│─────────────────────────│
│ [Top] [Latest]          │  ← SegmentedControl
│ ┌────┬────┬────┐        │
│ │ vid│ vid│ vid│        │
│ ├────┼────┼────┤        │
│ │ vid│ vid│ vid│        │
│ └────┴────┴────┘        │
└─────────────────────────┘
```

### Elements
- Hashtag name — `display-md`, `text-primary`
- View count — `body-md`, `text-secondary`
- Trending badge — `semantic-warning` color pill if trending
- Description — `body-md`, optional, for curated challenges
- Tabs: "Top" (most popular) | "Latest" (chronological)
- Video grid — 3-column

### Interactions
- Tap video → full-screen player (all videos under this hashtag become feed)
- Scroll up → header collapses, tabs pin

### Transitions
- **From Feed/Discover:** Push from right
