use crate::models::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct AppState {
    pub current_user: Option<User>,
    pub feed: FeedState,
    pub active_tab: Tab,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct FeedState {
    pub videos: Vec<Video>,
    pub current_index: usize,
    pub cursor: Option<String>,
    pub loading: bool,
    pub has_more: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default, PartialEq)]
pub enum Tab {
    #[default]
    Home,
    Discover,
    Create,
    Notifications,
    Profile,
    Messages,
}
