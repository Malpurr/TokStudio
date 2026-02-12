use leptos::prelude::*;

#[component]
pub fn ProfilePage() -> impl IntoView {
    view! {
        <div class="page profile-page">
            <div class="profile-header">
                <div class="avatar-large"></div>
                <h1 class="username">"@tokstudio"</h1>
                <div class="stats-row">
                    <div class="stat"><span class="stat-num">"0"</span><span class="stat-label">"Following"</span></div>
                    <div class="stat"><span class="stat-num">"0"</span><span class="stat-label">"Followers"</span></div>
                    <div class="stat"><span class="stat-num">"0"</span><span class="stat-label">"Likes"</span></div>
                </div>
            </div>
        </div>
    }
}
