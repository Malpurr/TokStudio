use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct User {
    pub id: Uuid,
    pub username: String,
    pub display_name: String,
    pub avatar_url: Option<String>,
    pub bio: Option<String>,
    pub follower_count: u64,
    pub following_count: u64,
    pub like_count: u64,
    pub verified: bool,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Video {
    pub id: Uuid,
    pub author: UserSummary,
    pub video_url: String,
    pub thumbnail_url: Option<String>,
    pub description: String,
    pub music: Option<MusicTrack>,
    pub like_count: u64,
    pub comment_count: u64,
    pub share_count: u64,
    pub view_count: u64,
    pub hashtags: Vec<String>,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserSummary {
    pub id: Uuid,
    pub username: String,
    pub display_name: String,
    pub avatar_url: Option<String>,
    pub verified: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MusicTrack {
    pub id: Uuid,
    pub title: String,
    pub artist: String,
    pub cover_url: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Comment {
    pub id: Uuid,
    pub video_id: Uuid,
    pub author: UserSummary,
    pub text: String,
    pub like_count: u64,
    pub replies: Vec<Comment>,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Like {
    pub id: Uuid,
    pub user_id: Uuid,
    pub video_id: Uuid,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Notification {
    pub id: Uuid,
    pub user_id: Uuid,
    pub kind: NotificationKind,
    pub from_user: UserSummary,
    pub video_id: Option<Uuid>,
    pub read: bool,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum NotificationKind {
    Like,
    Comment,
    Follow,
    Mention,
    Share,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Message {
    pub id: Uuid,
    pub from_user: Uuid,
    pub to_user: Uuid,
    pub text: String,
    pub read: bool,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FeedResponse {
    pub videos: Vec<Video>,
    pub cursor: Option<String>,
    pub has_more: bool,
}
