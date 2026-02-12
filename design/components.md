# TokStudio — Component Library v1.0

> Every reusable component, fully specified with props, states, and variants.
> All components follow the design system tokens from `design-system.md`.

---

## 1. VideoCard

Full-screen video player used in the Feed and embedded contexts.

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `source` | `{ uri: string, hlsUri?: string }` | required | Video source |
| `poster` | `string` | — | Thumbnail URL (shown before load) |
| `isActive` | `boolean` | `false` | Whether this video is the currently visible one (controls autoplay) |
| `isMuted` | `boolean` | `false` | Mute state |
| `onDoubleTap` | `(position: {x, y}) => void` | — | Double-tap handler (like) |
| `onSingleTap` | `() => void` | — | Single tap handler (pause/play) |
| `onSwipeLeft` | `() => void` | — | Swipe-to-profile |
| `showOverlays` | `boolean` | `true` | Show action bar, caption, etc. |
| `creator` | `Creator` | required | Creator info for overlay |
| `caption` | `string` | — | Video caption |
| `sound` | `Sound` | — | Sound info |
| `stats` | `{ likes, comments, shares, bookmarks }` | required | Engagement counts |

### States
- `loading` — Poster visible, shimmer overlay
- `playing` — Video active, overlays visible
- `paused` — Freeze frame, play icon center
- `buffering` — Thin progress bar pulses
- `error` — Retry button centered

### Sub-components
- `VideoOverlayGradient` — top and bottom gradients for text legibility
- `VideoProgressBar` — thin scrubber at bottom edge
- `VideoPauseIcon` — centered play triangle on pause

---

## 2. UserAvatar

Circular avatar image with optional status indicators.

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `uri` | `string` | — | Image URL |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | 24 / 32 / 44 / 56 / 88 px |
| `ring` | `'none' \| 'brand' \| 'live' \| 'story'` | `'none'` | Decorative ring |
| `badge` | `'none' \| 'follow' \| 'verified' \| 'live' \| 'online'` | `'none'` | Badge overlay |
| `fallback` | `string` | — | Initials if no image |
| `onPress` | `() => void` | — | Tap handler |

### Sizes
| Variant | Diameter | Ring Width | Badge Size |
|---|---|---|---|
| `xs` | 24px | 1.5px | — |
| `sm` | 32px | 2px | 12px |
| `md` | 44px | 2px | 16px |
| `lg` | 56px | 2.5px | 18px |
| `xl` | 88px | 3px | 22px |

### Ring Variants
- `brand` — `brand-gradient` animated (slow rotation, 4s)
- `live` — Red pulsing ring (`interactive-live`, pulse animation)
- `story` — `brand-gradient` static (unwatched) or `text-tertiary` (watched)

### Badge Variants
- `follow` — Small "+" circle, `brand-primary` bg, positioned bottom-center
- `verified` — Blue checkmark circle, bottom-right
- `live` — Red "LIVE" pill, bottom-center
- `online` — Green dot, bottom-right

---

## 3. ActionButton

The side-action buttons on the video feed (like, comment, share, bookmark).

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `IconName` | required | Icon identifier |
| `count` | `number` | — | Count displayed below icon |
| `isActive` | `boolean` | `false` | Active/toggled state |
| `activeColor` | `string` | `interactive-like` | Color when active |
| `onPress` | `() => void` | required | Tap handler |
| `onLongPress` | `() => void` | — | Long press handler |
| `size` | `'sm' \| 'md'` | `'md'` | 36px / 44px |

### States
- `default` — Outline icon, `text-primary`
- `active` — Filled icon, `activeColor`, scale bounce (`spring-bouncy`)
- `pressed` — Scale down to 0.9 during press
- `disabled` — `text-tertiary`, no interaction

### Animation
- Press: scale `1 → 0.9`, 100ms
- Release/Activate: scale `0.9 → 1.15 → 1.0`, `spring-bouncy`
- Like special: particle burst (6-8 small hearts emanating outward, 500ms, fade out)

---

## 4. BottomSheet

Glassmorphism bottom sheet with drag-to-dismiss.

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `isOpen` | `boolean` | `false` | Visibility |
| `snapPoints` | `number[]` | `[0.5, 0.85]` | Height snap points (% of screen) |
| `initialSnap` | `number` | `0` | Initial snap point index |
| `onClose` | `() => void` | required | Close handler |
| `showHandle` | `boolean` | `true` | Drag handle visibility |
| `showScrim` | `boolean` | `true` | Background dim |
| `children` | `ReactNode` | required | Sheet content |
| `enableContentScrolling` | `boolean` | `true` | Allow inner scrollview |

### Anatomy
```
┌─ Scrim (tappable to dismiss) ───────┐
│                                      │
├─ Sheet Container (glass) ────────────┤
│  ┌─ Handle (36×4px, centered) ─────┐│
│  ├─ Header slot ───────────────────┤│
│  ├─ Content (scrollable) ──────────┤│
│  └─ Footer slot (optional) ────────┘│
└──────────────────────────────────────┘
```

### Behavior
- Opens with `spring-smooth`, closes with velocity-based `spring-stiff`
- Drag past lowest snap + 80px or fling velocity > 500px/s → dismiss
- Between snaps: spring to nearest
- Content scroll locked until sheet is at max snap; then inner scroll takes over
- Keyboard avoidance: sheet adjusts height when keyboard opens

---

## 5. TabBar

Bottom navigation tab bar.

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `activeTab` | `TabId` | required | Currently active tab |
| `onTabPress` | `(tab: TabId) => void` | required | Tab press handler |
| `badges` | `Record<TabId, number \| boolean>` | `{}` | Badge indicators |
| `isTransparent` | `boolean` | `false` | Transparent mode (Feed) |
| `isHidden` | `boolean` | `false` | Hide tab bar (Create screen) |

### Tab Items
Each tab:
- Icon (24px): outline (inactive) → filled (active)
- Label (`label-sm`): `text-tertiary` (inactive) → `brand-primary` (active)
- Create tab: special — gradient-filled icon, no label, 40×40 `radius-lg`, raised 4px

### Animation
- Tab switch: icon morphs outline→filled (200ms), color transition
- Hide/show: translateY 0↔100%, `spring-smooth`
- Badge: scale-in `spring-bouncy` when appearing

---

## 6. TopBar

Screen header bar.

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Center title |
| `leftAction` | `'back' \| 'close' \| ReactNode` | — | Left button |
| `rightActions` | `ReactNode[]` | `[]` | Right-side buttons |
| `isTransparent` | `boolean` | `false` | Transparent background (overlays content) |
| `segmentedTabs` | `SegmentedTab[]` | — | Inline tab switcher (e.g., Following/For You) |
| `onBack` | `() => void` | — | Back handler |

### Variants
- `solid` — `surface-base` bg, 1px bottom border
- `transparent` — No bg, gradient scrim behind (for Feed)
- `collapsible` — Collapses on scroll (Profile header)

### Layout
```
[ Left Action ]  [ Title / Tabs ]  [ Right Actions ]
     48px            flexible           auto
```

---

## 7. Badge

Small count or status indicator.

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `count` | `number` | — | Number to display |
| `max` | `number` | `99` | Max before "99+" |
| `variant` | `'count' \| 'dot' \| 'text'` | `'count'` | Visual variant |
| `color` | `string` | `semantic-error` | Badge color |
| `text` | `string` | — | Custom text (for `text` variant) |

### Variants
- `dot` — 8px circle, no text. Used for unread indicators.
- `count` — Pill shape, min-width 18px, `label-sm` white text. "99+" when exceeding max.
- `text` — Pill with custom text (e.g., "NEW", "LIVE"). `label-sm`.

### Animation
- Appear: `spring-bouncy` scale 0→1
- Count change: scale `1→1.2→1` (200ms)
- Disappear: scale 1→0 (150ms)

---

## 8. Toast

In-app notification banner.

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `message` | `string` | required | Toast text |
| `type` | `'success' \| 'error' \| 'info' \| 'warning'` | `'info'` | Semantic type |
| `icon` | `IconName` | auto | Leading icon (auto from type) |
| `duration` | `number` | `3000` | Auto-dismiss ms |
| `action` | `{ label: string, onPress: () => void }` | — | Action button |
| `position` | `'top' \| 'bottom'` | `'top'` | Screen position |

### Anatomy
```
┌─────────────────────────────────┐
│  [icon]  Message text  [Action] │  ← glass background
└─────────────────────────────────┘
```

### Styling
- Background: `surface-glass` with blur
- Border-left: 3px colored bar (semantic color)
- `radius-lg`
- Horizontal margin: `space-4`

### Animation
- Enter: slide from top + fade in, `ease-out-back`, 350ms
- Exit: fade out + slide up, 200ms
- Stacking: max 2 visible, older ones shift up

---

## 9. SegmentedControl

Tab switcher within a screen.

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `segments` | `{ id: string, label: string, icon?: IconName }[]` | required | Segment definitions |
| `activeSegment` | `string` | required | Active segment id |
| `onChange` | `(id: string) => void` | required | Change handler |
| `variant` | `'underline' \| 'pill'` | `'underline'` | Visual style |
| `size` | `'sm' \| 'md'` | `'md'` | Text size |

### Variants
- `underline` — Text tabs with animated underline indicator (`brand-primary`, 2px, slides with spring)
- `pill` — Background pill slides behind active segment (`surface-glass`)

### Animation
- Indicator slides to active segment: `spring-snappy`
- Label color transition: 200ms

---

## 10. Button

General purpose button.

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | required | Button text |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'destructive'` | `'primary'` | Visual variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `icon` | `IconName` | — | Leading icon |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon placement |
| `isLoading` | `boolean` | `false` | Loading spinner state |
| `isDisabled` | `boolean` | `false` | Disabled state |
| `isFullWidth` | `boolean` | `false` | Full container width |
| `onPress` | `() => void` | required | Press handler |

### Variants
| Variant | Background | Text | Border |
|---|---|---|---|
| `primary` | `brand-gradient` | `text-inverse` (#000) | none |
| `secondary` | `surface-glass` | `text-primary` | `surface-glass-border` |
| `outline` | transparent | `text-primary` | 1px `text-tertiary` |
| `ghost` | transparent | `text-primary` | none |
| `destructive` | `semantic-error` | `#FFFFFF` | none |

### Sizes
| Size | Height | Padding H | Font | Radius |
|---|---|---|---|---|
| `sm` | 32px | 12px | `label-md` | `radius-md` |
| `md` | 44px | 20px | `label-lg` | `radius-md` |
| `lg` | 52px | 24px | `label-lg` | `radius-md` |

### States
- `default` — Normal appearance
- `pressed` — Opacity 0.8, scale 0.98 (100ms)
- `disabled` — Opacity 0.4, no interaction
- `loading` — Label replaced with spinner, width maintained

---

## 11. TextInput

Form text input field.

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `''` | Input value |
| `placeholder` | `string` | — | Placeholder text |
| `onChange` | `(value: string) => void` | required | Change handler |
| `leftIcon` | `IconName` | — | Leading icon |
| `rightIcon` | `IconName` | — | Trailing icon/action |
| `variant` | `'default' \| 'search' \| 'chat'` | `'default'` | Visual variant |
| `isError` | `boolean` | `false` | Error state |
| `errorMessage` | `string` | — | Error text below |
| `maxLength` | `number` | — | Character limit |
| `multiline` | `boolean` | `false` | Multi-line mode |

### Variants
- `default` — Rectangular, `surface-input` bg, `radius-md`
- `search` — Pill-shaped, `radius-full`, magnifying glass icon
- `chat` — Pill-shaped, `radius-full`, optimized for message input bar

### States
- `default` — `surface-input` bg, `text-tertiary` placeholder
- `focused` — 1px `brand-primary` border, placeholder shifts up (if labeled)
- `error` — 1px `semantic-error` border, error message below in `semantic-error`
- `disabled` — Opacity 0.4

---

## 12. VideoGrid

3-column video thumbnail grid (Profile, Hashtag, Sound pages).

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `videos` | `Video[]` | required | Video data array |
| `columns` | `2 \| 3` | `3` | Column count |
| `gap` | `number` | `1` | Gap in pixels |
| `onVideoPress` | `(video: Video) => void` | required | Video tap handler |
| `showStats` | `boolean` | `true` | Show play count overlay |
| `pinnedIds` | `string[]` | `[]` | IDs of pinned videos |
| `isLoading` | `boolean` | `false` | Show skeleton placeholders |

### Cell Anatomy
```
┌──────────────┐
│              │  Aspect ratio: 9:16
│  [thumbnail] │
│              │
│ 📌      ▶ 12K│  ← Pin icon (if pinned) + play count
└──────────────┘
```

### Loading State
- Skeleton: shimmer rectangles matching cell aspect ratio
- Load 12 skeletons initially

---

## 13. UserRow

User list item (Following/Followers, search results, mentions).

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `user` | `User` | required | User data |
| `actionButton` | `'follow' \| 'remove' \| 'none'` | `'follow'` | Right-side action |
| `subtitle` | `string` | — | Custom subtitle (default: @username) |
| `onPress` | `() => void` | required | Row tap handler |
| `onAction` | `() => void` | — | Action button handler |

### Anatomy
```
[Avatar 44px]  Display Name ✓     [Follow]
               @username · 1.2M
```

---

## 14. CommentRow

Single comment in the Comments Sheet.

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `comment` | `Comment` | required | Comment data |
| `isCreator` | `boolean` | `false` | Show "Creator" badge |
| `isPinned` | `boolean` | `false` | Show pinned indicator |
| `onLike` | `() => void` | — | Like handler |
| `onReply` | `() => void` | — | Reply handler |
| `onAvatarPress` | `() => void` | — | Navigate to profile |
| `depth` | `number` | `0` | Reply nesting depth (max 1) |

### Anatomy
```
[Avatar 32px]  @username · 2h  [Creator]
               Comment text body that can
               wrap to multiple lines
               ♥ 42  Reply
```

---

## 15. NotificationRow

Single notification item.

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `notification` | `Notification` | required | Notification data |
| `isUnread` | `boolean` | `false` | Unread state (highlight bg) |
| `onPress` | `() => void` | required | Tap handler |

### Anatomy
```
[Avatar(s)]  username action text  · 2h    [thumbnail/button]
```

- Unread: `surface-raised` background
- Grouped: stacked avatars (max 3) + "+N" text

---

## 16. MessageBubble

Chat message bubble.

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `message` | `Message` | required | Message data |
| `isMine` | `boolean` | required | Sent vs received |
| `showAvatar` | `boolean` | `false` | Show sender avatar |
| `showTimestamp` | `boolean` | `false` | Show timestamp above |

### Variants
- **Sent:** `brand-gradient` bg, right-aligned, `radius-lg` with bottom-right tail
- **Received:** `surface-raised` bg, left-aligned, `radius-lg` with bottom-left tail
- **Media:** Contains video/image preview card (tappable)
- **Emoji-only:** Large emoji (48px), no bubble background

---

## 17. RecordButton

Camera record button.

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `mode` | `'photo' \| 'video'` | `'video'` | Capture mode |
| `isRecording` | `boolean` | `false` | Recording state |
| `maxDuration` | `number` | `60` | Max recording seconds |
| `progress` | `number` | `0` | Current recording progress (0-1) |
| `onTap` | `() => void` | — | Tap (photo capture) |
| `onLongPressStart` | `() => void` | — | Start recording |
| `onLongPressEnd` | `() => void` | — | Stop recording |

### States
- `idle` — 72px, white outer ring (4px), red inner circle (56px)
- `recording` — Outer ring becomes progress indicator (`brand-gradient`), inner circle shrinks to 32px rounded-square
- `locked` — Same as recording but with stop icon

---

## 18. Pill / Tag

Small label component for hashtags, categories, filters.

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | required | Text content |
| `variant` | `'default' \| 'active' \| 'trending'` | `'default'` | Visual style |
| `icon` | `IconName` | — | Leading icon |
| `onPress` | `() => void` | — | Tap handler |

### Variants
- `default` — `surface-glass` bg, `text-primary`, `radius-full`
- `active` — `brand-primary` bg, `text-inverse`, `radius-full`
- `trending` — `surface-glass` bg + 🔥 icon, `radius-full`

### Size
- Height: 32px
- Padding: 4px 12px
- Font: `label-md`

---

## 19. Skeleton

Loading placeholder with shimmer animation.

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'text' \| 'circle' \| 'rect' \| 'card'` | `'rect'` | Shape |
| `width` | `number \| string` | `'100%'` | Width |
| `height` | `number` | `16` | Height |
| `radius` | `number` | `radius-md` | Border radius |

### Animation
- Shimmer: linear gradient sweep left→right, 1.5s, infinite
- Colors: `#111111` → `#1A1A1A` → `#111111`

---

## 20. ContextMenu

Long-press context menu (haptic feedback on trigger).

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `MenuItem[]` | required | Menu items |
| `onSelect` | `(id: string) => void` | required | Selection handler |
| `triggerRef` | `Ref` | required | Element that triggers menu |
| `isDestructive` | `(id: string) => boolean` | — | Mark destructive items |

### Anatomy
- Glass background, `radius-lg`
- Items: icon (20px) + label (`body-md`), 44px row height
- Destructive items: `semantic-error` color
- Separator line between groups
- Appears with `spring-bouncy` scale from trigger point
- Background: blur + dim scrim

---

## 21. FollowButton

Stateful follow/following button.

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `isFollowing` | `boolean` | `false` | Follow state |
| `isFriend` | `boolean` | `false` | Mutual follow |
| `onPress` | `() => void` | required | Toggle handler |
| `size` | `'sm' \| 'md'` | `'md'` | Button size |

### States
- `not-following` — `brand-gradient` fill, "Follow" label
- `following` — Outline style, "Following" label
- `friends` — Outline style with ✓, "Friends" label
- `loading` — Spinner replacing text

### Animation
- Follow: button fills with gradient (200ms), slight scale bounce
- Unfollow: gradient drains away, becomes outline

---

## 22. MusicDisc

Spinning album art disc on the Feed action bar.

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `imageUri` | `string` | — | Album art or creator avatar |
| `isPlaying` | `boolean` | `false` | Spin animation active |
| `size` | `number` | `40` | Diameter in px |
| `onPress` | `() => void` | — | Navigate to Sound Page |

### Behavior
- Circular with vinyl-record aesthetic: image in center (28px), dark ring border
- Spins continuously (8s per rotation, linear) when `isPlaying`
- Pauses rotation when video paused
- Tap → Sound Page

---

## 23. InAppBanner

Push notification banner shown while app is in foreground.

### Props
| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | required | Notification title |
| `body` | `string` | required | Notification body |
| `avatar` | `string` | — | Sender avatar |
| `onPress` | `() => void` | — | Tap handler |
| `autoDismiss` | `number` | `4000` | Auto-dismiss ms |

### Behavior
- Slides down from top (behind safe area), `ease-out-back`
- Glass background, `radius-xl`
- Swipe up to dismiss
- Tap to navigate to relevant screen
- Does NOT interrupt video playback
