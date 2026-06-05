/**
 * Giải mã JWT token (không verify signature — chỉ đọc payload).
 * Dùng để lấy thông tin user: name, sub, menu, roles, v.v.
 *
 * @param {string} token  - JWT string từ localStorage
 * @returns {object|null} payload object, hoặc null nếu token lỗi
 */
export function decodeJwt(token) {
  try {
    if (!token) return null;

    const parts = token.split(".");
    if (parts.length !== 3) return null;

    // Base64url → Base64 → decode
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(json);
  } catch {
    return null;
  }
}

/**
 * Lấy token từ localStorage và decode ngay.
 * @returns {object|null}
 */
export function getTokenPayload() {
  const token = localStorage.getItem("token");
  return decodeJwt(token);
}
