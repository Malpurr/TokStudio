use crate::models::*;
use uuid::Uuid;

/// Core API trait — implement per-platform (REST, mock, etc.)
pub trait TokStudioApi {
    type Error: std::fmt::Debug;

    fn get_feed(&self, cursor: Option<&str>, limit: u32)
        -> impl std::future::Future<Output = Result<FeedResponse, Self::Error>> + Send;

    fn get_video(&self, id: Uuid)
        -> impl std::future::Future<Output = Result<Video, Self::Error>> + Send;

    fn get_user(&self, id: Uuid)
        -> impl std::future::Future<Output = Result<User, Self::Error>> + Send;

    fn like_video(&self, video_id: Uuid)
        -> impl std::future::Future<Output = Result<(), Self::Error>> + Send;

    fn unlike_video(&self, video_id: Uuid)
        -> impl std::future::Future<Output = Result<(), Self::Error>> + Send;

    fn post_comment(&self, video_id: Uuid, text: &str)
        -> impl std::future::Future<Output = Result<Comment, Self::Error>> + Send;

    fn get_comments(&self, video_id: Uuid, cursor: Option<&str>)
        -> impl std::future::Future<Output = Result<Vec<Comment>, Self::Error>> + Send;

    fn follow_user(&self, user_id: Uuid)
        -> impl std::future::Future<Output = Result<(), Self::Error>> + Send;

    fn get_notifications(&self)
        -> impl std::future::Future<Output = Result<Vec<Notification>, Self::Error>> + Send;

    fn get_messages(&self, user_id: Uuid)
        -> impl std::future::Future<Output = Result<Vec<Message>, Self::Error>> + Send;
}
