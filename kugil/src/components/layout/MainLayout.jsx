import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ItemPage from "../pages/ItemPage";
import "../../css/layout/MainLayout.css";

/**
 * MainLayout — bố cục chính với:
 *  - Sidebar (accordion, collapsed/expanded)
 *  - Header (tabs + actions)
 *  - Content area — render page dựa trên activeTabId
 *
 * Tab management: khi user chọn menu item → thêm tab mới
 */

/* ── Map menuCd → component ──────────────────────────────── */
const PAGE_MAP = {
  B009: ItemPage,   // Item
};

export default function MainLayout({ menuItems, menuLoading, menuError, children }) {
  const [collapsed,   setCollapsed]   = useState(false);
  const [openTabs,    setOpenTabs]    = useState([]);
  const [activeTabId, setActiveTabId] = useState(null);

  // Người dùng chọn menu item → mở tab
  const handleSelectItem = (item) => {
    const exists = openTabs.find(t => t.id === item.id);
    if (!exists) {
      setOpenTabs(prev => [...prev, { id: item.id, name: item.name }]);
    }
    setActiveTabId(item.id);
  };

  // Đóng tab
  const handleCloseTab = (tabId) => {
    setOpenTabs(prev => {
      const next = prev.filter(t => t.id !== tabId);
      // Nếu đóng tab đang active → active tab cuối
      if (activeTabId === tabId) {
        setActiveTabId(next.length > 0 ? next[next.length - 1].id : null);
      }
      return next;
    });
  };

  // Render content dựa trên active tab
  const renderContent = () => {
    if (!activeTabId) {
      return children; // Default content (dashboard)
    }

    const PageComponent = PAGE_MAP[activeTabId];
    if (PageComponent) {
      return <PageComponent />;
    }

    // Tab chưa có page → placeholder
    return (
      <div style={{ padding: 40, color: "#aaa", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🚧</div>
        <div style={{ fontSize: 16 }}>Page "{activeTabId}" is under development</div>
      </div>
    );
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        menuItems={menuItems}
        loading={menuLoading}
        error={menuError}
        collapsed={collapsed}
        onToggle={() => setCollapsed(c => !c)}
        onSelectItem={handleSelectItem}
      />

      <div className="dashboard-main">
        <Header
          openTabs={openTabs}
          activeTabId={activeTabId}
          onCloseTab={handleCloseTab}
          onSelectTab={setActiveTabId}
        />
        <main className="dashboard-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

