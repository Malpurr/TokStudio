use leptos::prelude::*;

#[component]
pub fn MessagesPage() -> impl IntoView {
    view! {
        <div class="page messages-page">
            <h1 class="page-title">"Messages"</h1>
            <p class="placeholder-text">"No messages yet"</p>
        </div>
    }
}
