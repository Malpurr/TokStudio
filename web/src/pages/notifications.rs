use leptos::prelude::*;

#[component]
pub fn NotificationsPage() -> impl IntoView {
    view! {
        <div class="page notifications-page">
            <h1 class="page-title">"Notifications"</h1>
            <p class="placeholder-text">"No new notifications"</p>
        </div>
    }
}
