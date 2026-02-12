use leptos::prelude::*;
use crate::components::video_feed::VideoFeed;

#[component]
pub fn HomePage() -> impl IntoView {
    view! {
        <div class="page home-page">
            <VideoFeed />
        </div>
    }
}
