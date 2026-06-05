import { useState } from "react";
import {
  ChevronDownIcon,
  MenuIcon1, MenuIcon2, MenuIcon3,
  MenuIconB, MenuIconP, MenuIconV, MenuIconD,
  MenuIconQ, MenuIconE, MenuIconC
} from "../common/Icons";

import { useAutoI18n } from "../../i18n/useAutoI18n";
import "../../css/layout/Sidebar.css";

// ── ICON MAP ───────────────────────────────────────────────
const NumericIconMap = {
  "1": <MenuIcon1 />,
  "2": <MenuIcon2 />,
  "3": <MenuIcon3 />,
};

const PrefixIconMap = {
  B: <MenuIconB />,
  M: <MenuIconB />,
  P: <MenuIconP />,
  V: <MenuIconV />,
  D: <MenuIconD />,
  Q: <MenuIconQ />,
  E: <MenuIconE />,
  C: <MenuIconC />,
  I: <MenuIconV />,
  DEFAULT: <MenuIconB />,
};

function getMenuIcon(item) {
  if (item.icon != null) {
    const iconStr = String(item.icon);

    if (iconStr.startsWith("/") || iconStr.startsWith("http")) {
      return (
        <img
          src={iconStr}
          alt=""
          width={18}
          height={18}
          style={{ objectFit: "contain" }}
        />
      );
    }

    if (NumericIconMap[iconStr]) {
      return NumericIconMap[iconStr];
    }
  }

  const prefix = String(item.id ?? "").charAt(0).toUpperCase();
  return PrefixIconMap[prefix] || PrefixIconMap.DEFAULT;
}

// ── SIDEBAR ───────────────────────────────────────────────
export default function Sidebar({
  menuItems = [],
  loading = false,
  error = null,
  collapsed = false,
  onToggle,
  onSelectItem,
}) {
  const { translate } = useAutoI18n(); // ✅ FIX ĐÚNG CHỖ

  const [activeId, setActiveId] = useState(null);
  const [openIds, setOpenIds] = useState(new Set());

  const toggleParent = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectItem = (item) => {
    setActiveId(item.id);
    if (onSelectItem) onSelectItem(item);
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      
      {/* Logo */}
      <div className="sidebar__logo-area">
        <img
          className="sidebar__logo"
          src="/images/logos/KugilLogo.png"
          alt="Kugil"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/logos/kugil.png";
          }}
        />
      </div>

      {/* Menu */}
      <nav className="sidebar__menu-scroll">
        
        {loading && (
          <div className="sidebar-loading">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="sidebar-loading__item" />
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="sidebar-error">⚠ {error}</div>
        )}

        {!loading &&
          !error &&
          menuItems.map((parent) => {
            const hasChildren = parent.children?.length > 0;
            const isOpen = openIds.has(parent.id);

            return (
              <div key={parent.id} className="menu-group">
                
                {/* ── Parent ── */}
                <div
                  className={`menu-parent ${
                    isOpen ? "open" : ""
                  } ${activeId?.startsWith(parent.id) ? "active" : ""}`}
                  onClick={() =>
                    hasChildren
                      ? toggleParent(parent.id)
                      : selectItem(parent)
                  }
                >
                  <span className="menu-parent__icon">
                    {getMenuIcon(parent)}
                  </span>

                  {!collapsed && (
                    <span className="menu-parent__label">
                      {translate(parent.name)}
                    </span>
                  )}

                  {collapsed && (
                    <span className="menu-parent__mini" title={translate(parent.name)}>
                      {translate(parent.name)}
                    </span>
                  )}

                  {!collapsed && hasChildren && (
                    <span
                      className={`menu-parent__arrow ${
                        isOpen ? "open" : ""
                      }`}
                    >
                      <ChevronDownIcon />
                    </span>
                  )}
                </div>

                {/* ── Children ── */}
                {hasChildren && (
                  <div
                    className={
                      collapsed ? "menu-flyout" : "menu-children"
                    }
                    style={
                      !collapsed && !isOpen
                        ? { display: "none" }
                        : {}
                    }
                  >
                    {parent.children.map((child) => (
                      <div
                        key={child.id}
                        className={`menu-child ${
                          activeId === child.id ? "active" : ""
                        }`}
                        onClick={() => selectItem(child)}
                      >
                        {translate(child.name)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
      </nav>

      {/* Footer */}
      <div className="sidebar__footer">
        <button
          className="sidebar__toggle-btn"
          onClick={onToggle}
          title={collapsed ? "Mở rộng" : "Thu gọn"}
        >
          «
        </button>

        <div className="sidebar__copyright">
          <p style={{ margin: 0 }}>Copyright @isc 2025</p>
          <p style={{ margin: 0 }}>Ver 1.0.6</p>
        </div>
      </div>
    </aside>
  );
}