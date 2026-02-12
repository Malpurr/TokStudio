use leptos::prelude::*;

#[component]
pub fn CreatePage() -> impl IntoView {
    view! {
        <div class="page create-page">
            <div class="create-container">
                <div class="record-button">
                    <div class="record-button-inner"></div>
                </div>
                <p class="placeholder-text">"Tap to record"</p>
            </div>
        </div>
    }
}
