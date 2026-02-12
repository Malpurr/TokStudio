use leptos::prelude::*;

#[component]
pub fn BottomNav() -> impl IntoView {
    view! {
        <nav class="bottom-nav glass-panel">
            <a href="/" class="nav-item active">
                <span class="nav-icon">"🏠"</span>
                <span class="nav-label">"Home"</span>
            </a>
            <a href="/discover" class="nav-item">
                <span class="nav-icon">"🔍"</span>
                <span class="nav-label">"Discover"</span>
            </a>
            <a href="/create" class="nav-item create-btn">
                <span class="nav-create-icon">"+"</span>
            </a>
            <a href="/notifications" class="nav-item">
                <span class="nav-icon">"🔔"</span>
                <span class="nav-label">"Inbox"</span>
            </a>
            <a href="/profile" class="nav-item">
                <span class="nav-icon">"👤"</span>
                <span class="nav-label">"Profile"</span>
            </a>
        </nav>
    }
}
