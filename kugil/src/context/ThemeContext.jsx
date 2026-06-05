import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);
 
const PRESET_COLORS = {
  coral: "#E05A5B",
  mint: "#1ABC9C",
  navy: "#2C3E50",
  sky: "#3498DB",
  yellow: "#F1C40F",
  magenta: "#ff00cc", // Matches the project's current accent pink
  coffee: "#795548",
};

const DEFAULT_COLOR = PRESET_COLORS.navy;
const DEFAULT_FONT = "Roboto";

export const ThemeProvider = ({ children }) => {
  const [primaryColor, setPrimaryColor] = useState(() => {
    return localStorage.getItem("kugil-primary-color") || DEFAULT_COLOR;
  });

  const [fontFamily, setFontFamily] = useState(() => {
    return localStorage.getItem("kugil-font-family") || DEFAULT_FONT;
  });

  // Apply changes to document
  useEffect(() => {
    const hexToRgba = (hex, alpha) => {
      let r = parseInt(hex.slice(1, 3), 16),
          g = parseInt(hex.slice(3, 5), 16),
          b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const root = document.documentElement;
    root.style.setProperty("--primary-color", primaryColor);
    
    try {
      root.style.setProperty("--primary-color-light", hexToRgba(primaryColor, 0.08));
    } catch(e) {}
    
    // We map font names to correct css font-family strings
    let cssFontFamily = fontFamily;
    if (fontFamily === "Pretendard") cssFontFamily = "'Pretendard', sans-serif";
    else if (fontFamily === "Roboto") cssFontFamily = "'Roboto', sans-serif";
    else if (fontFamily === "NanumGothic") cssFontFamily = "'Nanum Gothic', sans-serif";
    else if (fontFamily === "NotoSans") cssFontFamily = "'Noto Sans KR', sans-serif";
    else if (fontFamily === "SUIT") cssFontFamily = "'SUIT', sans-serif";

    root.style.setProperty("--font-main", cssFontFamily);
    
    // Apply font to body as well just in case
    document.body.style.fontFamily = cssFontFamily;

    // Save to local storage
    localStorage.setItem("kugil-primary-color", primaryColor);
    localStorage.setItem("kugil-font-family", fontFamily);
  }, [primaryColor, fontFamily]);

  return (
    <ThemeContext.Provider value={{ primaryColor, setPrimaryColor, fontFamily, setFontFamily, PRESET_COLORS }}>
      {children}
    </ThemeContext.Provider>
  );
};
