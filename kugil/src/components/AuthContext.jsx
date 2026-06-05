import { createContext, useContext, useState } from "react";
import { decodeJwt } from "../utils/jwtUtils";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // user = full login API response: { access_token, userName, menus, permissions, deptNm, ... }
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  // tokenPayload = JWT claims: { sub, roles, rolesName, ConnectionId, ... }
  const [tokenPayload, setTokenPayload] = useState(() => {
    const token = localStorage.getItem("token");
    return decodeJwt(token);
  });

  const login = (data) => {
    // data = full response từ /connect/token
    // Lưu toàn bộ vào localStorage để reload vẫn có
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("token", data.access_token);
    setUser(data);
    setTokenPayload(decodeJwt(data.access_token));
  };

  const logout = () => {
    setUser(null);
    setTokenPayload(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, tokenPayload, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}