export function getUid(): string {
  if (typeof window === "undefined") return "";
  let uid = localStorage.getItem("pkingdom_uid");
  if (!uid) {
    uid = crypto.randomUUID();
    localStorage.setItem("pkingdom_uid", uid);
  }
  return uid;
}

export function shortCode(uid: string): string {
  return uid.replace(/-/g, "").slice(0, 8).toUpperCase();
}
