import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useAutoI18n } from "../../i18n/useAutoI18n";
import LanguagesDropDown from "../lang/LanguagesDropDown";
import ChangePasswordModal from "../user/ChangePasswordModal";
import PasswordPolicyModal from "../user/PasswordPolicyModal";
import ThemePopover from "./ThemePopover";
import "../../css/layout/Header.css";

// ── Icons ────────────────────────────────────────────────
import { GlobeIcon, UserCircleIcon, LogoutIcon, CloseIcon, PaletteIcon, FullscreenIcon, KeyIcon, SettingsIcon } from "../common/Icons";

// ── HEADER ───────────────────────────────────────────────
export default function Header({ openTabs = [], activeTabId = null, onCloseTab, onSelectTab }) {
  const navigate = useNavigate();
  const { user, tokenPayload, logout } = useAuth();
  const { translate } = useAutoI18n();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showPasswordPolicy, setShowPasswordPolicy] = useState(false);
  const [showThemeSettings, setShowThemeSettings] = useState(false);

  const displayName = user?.userName || tokenPayload?.sub || "User";
  const deptName    = user?.deptNm || "";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  // Đóng tất cả tab
  const handleCloseAll = () => {
    openTabs.forEach(t => onCloseTab?.(t.id));
  };

  return (
    <header className="dashboard-header">
      {/* ── Tabs (trái) ─────────────────────────────── */}
      <div className="header-tabs-area">
        {openTabs.map((tab) => (
          <div
            key={tab.id}
            className={`header-tab ${tab.id === activeTabId ? "active" : ""}`}
            onClick={() => onSelectTab?.(tab.id)}
          >
            <span>{tab.name}</span>
            <button
              className="header-tab__close"
              onClick={(e) => { e.stopPropagation(); onCloseTab?.(tab.id); }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* ── Actions (phải) ──────────────────────────── */}
      <div className="header-actions">
        {/* Language */}
        <div className="language-dropdown--header">
          <LanguagesDropDown 
          showFlag = {false} 
          shortLabel = {true}
          showIcon = {true}
          />
        </div>

        {/* Close all tabs */}
        {/* {openTabs.length > 0 && ( */}
          <button className="header-icon-btn" onClick={handleCloseAll} title="Đóng tất cả tab">
            <CloseIcon />
          </button>
        {/* )} */}

        {/* Theme */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <button 
            className="header-icon-btn theme-toggle" 
            title="Giao diện"
            onClick={() => setShowThemeSettings(!showThemeSettings)}
          >
            <PaletteIcon />
          </button>
          {showThemeSettings && (
            <ThemePopover onClose={() => setShowThemeSettings(false)} />
          )}
        </div>

        {/* Fullscreen */}
        <button className="header-icon-btn" onClick={handleFullscreen} title="Toàn màn hình">
          <FullscreenIcon />
        </button>

        <div className="header-divider" />

        {/* User */}
        <div className="header-user" onClick={() => setUserMenuOpen(!userMenuOpen)}>
          <div className="header-user__avatar">
            <UserCircleIcon />
          </div>
          <div className="header-user__info">
            <div className="header-user__name">{displayName}</div>
          </div>

          {/* User Menu Popup */}
          {userMenuOpen && (
            <div className="header-user__menu">
              <div 
                className="header-user__menu-item" 
                onClick={() => {
                  setShowChangePassword(true);
                  setUserMenuOpen(false);
                }}
              >
                <KeyIcon />
                <span>{translate('ChangePassword') || 'ChangePassword'}</span>
              </div>
              <div 
                className="header-user__menu-item"
                onClick={() => {
                  setShowPasswordPolicy(true);
                  setUserMenuOpen(false);
                }}
              >
                <SettingsIcon />
                <span>{translate('PasswordPolicySettings') || 'PasswordPolicySettings'}</span>
              </div>
            </div>
          )}
        </div>

        {/* LogOut */}
        <button id="btn-logout" className="header-logout-btn" onClick={handleLogout}>
          {translate('LogOut') || 'LogOut'} <LogoutIcon />
        </button>
      </div>

      {/* ── User Modals ───────────────────────────────── */}
      <ChangePasswordModal 
        isOpen={showChangePassword} 
        onClose={() => setShowChangePassword(false)} 
      />
      
      <PasswordPolicyModal 
        isOpen={showPasswordPolicy} 
        onClose={() => setShowPasswordPolicy(false)} 
      />

    </header>
  );
}
