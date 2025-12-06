/**
 * Formats a date string to a relative time string
 * Examples: "Just now", "5 minutes ago", "Yesterday, 2:30 PM", "Jan 15, 2:30 PM"
 */
export function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    // Less than 1 minute ago
    if (diffInMinutes < 1) {
        return "Just now";
    }

    // Less than 1 hour ago
    if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
    }

    // Less than 24 hours ago
    if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
    }

    // Today (same day)
    const isToday =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();

    if (isToday) {
        return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        });
    }

    // Yesterday
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday =
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear();

    if (isYesterday) {
        return `Yesterday, ${date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
        })}`;
    }

    // Less than 7 days ago
    if (diffInDays < 7) {
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            hour: "numeric",
            minute: "2-digit",
        });
    }

    // Same year
    if (date.getFullYear() === now.getFullYear()) {
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });
    }

    // Different year
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
}

/**
 * Formats a date string to a short time string (e.g., "2:30 PM")
 */
export function formatTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
    });
}

/**
 * Formats a date string to a date string (e.g., "Jan 15, 2024")
 */
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

