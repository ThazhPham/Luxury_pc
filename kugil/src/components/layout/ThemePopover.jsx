import React, { useRef, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import "../../css/layout/ThemePopover.css";

export default function ThemePopover({ onClose }) {
  const { primaryColor, setPrimaryColor, fontFamily, setFontFamily, PRESET_COLORS } = useTheme();
  const popoverRef = useRef(null);

  useEffect(() => {
    // Close popover when clicking outside
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        // Prevent immediate close if clicking the toggle button
        if (!event.target.closest('.header-icon-btn.theme-toggle')) {
          onClose();
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const presetThemes = [
    { name: "Coral Red", value: PRESET_COLORS.coral },
    { name: "Fresh Mint", value: PRESET_COLORS.mint },
    { name: "Navy Blue", value: PRESET_COLORS.navy },
    { name: "Sky Blue", value: PRESET_COLORS.sky },
    { name: "Sunny Yellow", value: PRESET_COLORS.yellow },
    { name: "Magenta", value: PRESET_COLORS.magenta },
    { name: "Coffee Brown", value: PRESET_COLORS.coffee },
  ];

  const fonts = ["Pretendard", "Roboto", "NanumGothic", "NotoSans", "SUIT"];

  const handleCustomColorChange = (e) => {
    setPrimaryColor(e.target.value);
  };

  return (
    <div className="theme-popover" ref={popoverRef}>
      <div className="theme-popover__notch"></div>
      
      {/* ── COLORS ── */}
      <div className="theme-section">
        <h3 className="theme-section__title">Color:</h3>
        
        <div className="theme-subsection">
          <label className="theme-subsection__label">Preset Themes</label>
          <div className="preset-colors-grid">
            {presetThemes.map((theme) => {
              const isActive = primaryColor.toUpperCase() === theme.value.toUpperCase();
              return (
                <div 
                  key={theme.name} 
                  className={`preset-color-item ${isActive ? "active" : ""}`}
                  onClick={() => setPrimaryColor(theme.value)}
                  style={{ borderColor: isActive ? theme.value : "transparent" }}
                >
                  <div className="preset-color-box" style={{ backgroundColor: theme.value }}></div>
                  <span className="preset-color-name">{theme.name}</span>
                  {isActive && (
                    <div className="preset-color-check" style={{ backgroundColor: "#1ABC9C" }}>
                      ✓
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="theme-subsection custom-color-section">
          <label className="theme-subsection__label">Custom Color</label>
          <div className="custom-color-control">
            <div className="color-picker-wrapper">
              <input 
                type="color" 
                value={primaryColor} 
                onChange={handleCustomColorChange}
                className="color-picker-input"
              />
            </div>
            <input 
              type="text" 
              value={primaryColor.toUpperCase()} 
              onChange={handleCustomColorChange}
              className="color-hex-input"
            />
          </div>
        </div>
      </div>

      {/* ── FONTS ── */}
      <div className="theme-section">
        <h3 className="theme-section__title">Font:</h3>
        <div className="font-options-list">
          {fonts.map((font) => (
            <div 
              key={font} 
              className={`font-option-item ${fontFamily === font ? "active" : ""}`}
              onClick={() => setFontFamily(font)}
            >
              #{font.toUpperCase()}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
