
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, get_mock_feed])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! Welcome to TokStudio", name)
}

#[tauri::command]
fn get_mock_feed() -> Vec<serde_json::Value> {
    vec![
        serde_json::json!({
            "username": "@creator1",
            "description": "Check out this amazing sunset 🌅",
            "music": "Sunset Vibes - Lofi Beats",
            "likes": "245.3K",
            "comments": "1,432",
            "shares": "5,678"
        }),
        serde_json::json!({
            "username": "@dancer_pro",
            "description": "New choreography drop 💃🔥",
            "music": "Original Sound - dancer_pro",
            "likes": "1.2M",
            "comments": "45.2K",
            "shares": "89.1K"
        }),
    ]
}
