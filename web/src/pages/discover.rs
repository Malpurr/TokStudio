use leptos::prelude::*;

#[component]
pub fn DiscoverPage() -> impl IntoView {
    view! {
        <div class="page discover-page">
            <div class="search-bar glass-panel">
                <input type="text" placeholder="Search videos, users, sounds..." />
            </div>
            <div class="trending-section">
                <h2>"Trending"</h2>
                <p class="placeholder-text">"Discover content coming soon"</p>
            </div>
        </div>
    }
}
