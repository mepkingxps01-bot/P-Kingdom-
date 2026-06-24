export function getCode(): string {
  if (typeof window === "undefined") return "";
  let code = localStorage.getItem("pkingdom_code");
  if (!code) {
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const digits = String(Math.floor(1000 + Math.random() * 9000));
    code = letter + digits;
    localStorage.setItem("pkingdom_code", code);
  }
  return code;
}
