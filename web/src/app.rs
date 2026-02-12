use leptos::prelude::*;
use leptos_router::components::*;
use leptos_router::path;
use crate::pages::*;
use crate::components::bottom_nav::BottomNav;

#[component]
pub fn App() -> impl IntoView {
    view! {
        <Router>
            <main class="app-container">
                <Routes fallback=|| view! { <p>"404"</p> }>
                    <Route path=path!("/") view=HomePage />
                    <Route path=path!("/discover") view=DiscoverPage />
                    <Route path=path!("/create") view=CreatePage />
                    <Route path=path!("/notifications") view=NotificationsPage />
                    <Route path=path!("/profile") view=ProfilePage />
                    <Route path=path!("/messages") view=MessagesPage />
                </Routes>
            </main>
            <BottomNav />
        </Router>
    }
}
