use leptos::prelude::*;
use crate::components::video_overlay::VideoOverlay;

#[derive(Clone)]
struct MockVideo {
    username: &'static str,
    description: &'static str,
    music: &'static str,
    likes: &'static str,
    comments: &'static str,
    shares: &'static str,
}

const MOCK_VIDEOS: &[MockVideo] = &[
    MockVideo {
        username: "@creator1",
        description: "Check out this amazing sunset 🌅 #nature #vibes",
        music: "Sunset Vibes - Lofi Beats",
        likes: "245.3K",
        comments: "1,432",
        shares: "5,678",
    },
    MockVideo {
        username: "@dancer_pro",
        description: "New choreography drop 💃🔥 #dance #trending",
        music: "Original Sound - dancer_pro",
        likes: "1.2M",
        comments: "45.2K",
        shares: "89.1K",
    },
    MockVideo {
        username: "@foodie",
        description: "Wait for it... 🍕 #cooking #recipe",
        music: "Cooking Time - Chef Beats",
        likes: "567K",
        comments: "8,901",
        shares: "12.3K",
    },
];

#[component]
pub fn VideoFeed() -> impl IntoView {
    let (current_index, set_current_index) = signal(0usize);
    let (touch_start_y, set_touch_start_y) = signal(0.0f64);

    let on_touch_start = move |ev: web_sys::TouchEvent| {
        if let Some(touch) = ev.touches().get(0) {
            set_touch_start_y.set(touch.client_y() as f64);
        }
    };

    let on_touch_end = move |ev: web_sys::TouchEvent| {
        if let Some(touch) = ev.changed_touches().get(0) {
            let dy = touch_start_y.get() - touch.client_y() as f64;
            let threshold = 50.0;
            if dy > threshold {
                // Swipe up → next
                set_current_index.update(|i| {
                    if *i < MOCK_VIDEOS.len() - 1 { *i += 1; }
                });
            } else if dy < -threshold {
                // Swipe down → prev
                set_current_index.update(|i| {
                    if *i > 0 { *i -= 1; }
                });
            }
        }
    };

    view! {
        <div class="video-feed"
            on:touchstart=on_touch_start
            on:touchend=on_touch_end
        >
            <div class="video-feed-track"
                style:transform=move || format!("translateY(-{}vh)", current_index.get() * 100)
            >
                {MOCK_VIDEOS.iter().enumerate().map(|(i, v)| {
                    let v = v.clone();
                    view! {
                        <div class="video-item" class:active=move || current_index.get() == i>
                            <div class="video-placeholder">
                                <div class="video-gradient-top"></div>
                                <div class="video-gradient-bottom"></div>
                            </div>
                            <VideoOverlay
                                username=v.username
                                description=v.description
                                music=v.music
                                likes=v.likes
                                comments=v.comments
                                shares=v.shares
                            />
                        </div>
                    }
                }).collect::<Vec<_>>()}
            </div>
        </div>
    }
}
