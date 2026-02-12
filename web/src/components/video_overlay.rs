use leptos::prelude::*;

#[component]
pub fn VideoOverlay(
    username: &'static str,
    description: &'static str,
    music: &'static str,
    likes: &'static str,
    comments: &'static str,
    shares: &'static str,
) -> impl IntoView {
    let (liked, set_liked) = signal(false);

    view! {
        <div class="video-overlay">
            // Right action buttons
            <div class="action-buttons">
                <div class="avatar-button">
                    <div class="avatar-small"></div>
                    <div class="follow-badge">"+"</div>
                </div>
                <button class="action-btn" class:liked=liked on:click=move |_| set_liked.update(|v| *v = !*v)>
                    <span class="action-icon">"♥"</span>
                    <span class="action-count">{likes}</span>
                </button>
                <button class="action-btn">
                    <span class="action-icon">"💬"</span>
                    <span class="action-count">{comments}</span>
                </button>
                <button class="action-btn">
                    <span class="action-icon">"↗"</span>
                    <span class="action-count">{shares}</span>
                </button>
                <button class="action-btn">
                    <span class="action-icon">"🔖"</span>
                </button>
            </div>

            // Bottom info
            <div class="video-info">
                <p class="video-username">{username}</p>
                <p class="video-description">{description}</p>
                <div class="music-ticker">
                    <span class="music-icon">"♪"</span>
                    <span class="music-name">{music}</span>
                </div>
            </div>
        </div>
    }
}
