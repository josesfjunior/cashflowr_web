// src/utils/user.ts
export function getDisplayName(user: {
    name: string;
    nickname?: string | null;
}) {
    if (user.nickname?.trim()) return user.nickname;

    return user.name.split(" ")[0];
}

export function getAvatarInitials(name: string) {
    const ignore = ["de", "da", "do", "dos", "das"];

    const parts = name
        .toLowerCase()
        .split(" ")
        .filter((p) => !ignore.includes(p));

    if (parts.length === 0) return "";

    const first = parts[0][0];
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";

    return (first + last).toUpperCase();
}
