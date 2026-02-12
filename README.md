# TokStudio

> The next-generation short-video platform. Built with Rust.

**By TokStudio** — A new kind of social media experience.

## Vision
An elegant, modern alternative to TikTok and Instagram Reels. Dark-themed, liquid-smooth animations, minimal UI that puts content first.

## Tech Stack
- **Frontend:** Rust (Leptos/Dioxus) + WASM for web, Tauri for Android
- **Backend:** Rust (Axum) — coming later
- **Design:** Dark mode first, MD3-inspired, glassmorphism, spring animations
- **Platforms:** Web (PWA) + Android (native via Tauri)

## Architecture
```
tokstudio/
├── web/          # Leptos/WASM web app
├── mobile/       # Tauri Android app
├── shared/       # Shared Rust logic
├── assets/       # Icons, fonts, media
├── design/       # UI mockups, design system
└── docs/         # Documentation
```

## Design Philosophy
- Content-first: video fills the screen
- Gesture-driven: swipe up/down for feed, left/right for actions
- Minimal chrome: UI appears on interaction, fades when watching
- Liquid animations: spring-based physics, 60fps always
- Dark mode: deep blacks (#000000), accent colors, OLED-friendly
