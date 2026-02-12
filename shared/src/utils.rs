/// Format large numbers: 1200 → "1.2K", 1500000 → "1.5M"
pub fn format_count(n: u64) -> String {
    if n >= 1_000_000_000 {
        format!("{:.1}B", n as f64 / 1_000_000_000.0)
    } else if n >= 1_000_000 {
        format!("{:.1}M", n as f64 / 1_000_000.0)
    } else if n >= 1_000 {
        format!("{:.1}K", n as f64 / 1_000.0)
    } else {
        n.to_string()
    }
}

/// Format relative time: "2m ago", "3h ago", "1d ago"
pub fn format_relative_time(secs_ago: i64) -> String {
    if secs_ago < 60 {
        "just now".into()
    } else if secs_ago < 3600 {
        format!("{}m ago", secs_ago / 60)
    } else if secs_ago < 86400 {
        format!("{}h ago", secs_ago / 3600)
    } else if secs_ago < 604800 {
        format!("{}d ago", secs_ago / 86400)
    } else {
        format!("{}w ago", secs_ago / 604800)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_format_count() {
        assert_eq!(format_count(999), "999");
        assert_eq!(format_count(1200), "1.2K");
        assert_eq!(format_count(1_500_000), "1.5M");
    }
}
