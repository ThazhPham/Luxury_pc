import React, { useState } from 'react';
import '../../css/CreateItemPanel.css';
import { ChevronLeftIcon, ChevronRightIcon, CloseFillIcon, SaveIcon } from "../common/Icons";
import GeneralTab from './CreateItemTabs/GeneralTab';
import ProductionTab from './CreateItemTabs/ProductionTab';
import InventoryTab from './CreateItemTabs/InventoryTab';
import PurchasingTab from './CreateItemTabs/PurchasingTab';
import SalesTab from './CreateItemTabs/SalesTab';
import SCMTab from './CreateItemTabs/SCMTab';
import { useAutoI18n } from "../../i18n/useAutoI18n";

export default function CreateItemPanel({ onClose, isExpanded, onToggleExpand, initialData, mode = 'create' }) {
  const [activeTab, setActiveTab] = useState('General');
  const { translate } = useAutoI18n();

  const tabs = ['General', 'Production', 'Inventory', 'Purchasing', 'Sales', 'SCM'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'General': return <GeneralTab initialData={initialData} />;
      case 'Production': return <ProductionTab />;
      case 'Inventory': return <InventoryTab />;
      case 'Purchasing': return <PurchasingTab />;
      case 'Sales': return <SalesTab />;
      case 'SCM': return <SCMTab />;
      default: return <div>{translate("Màn hình đang xây dựng...")}</div>;
    }
  };

  return (
    <div className="create-panel">
      <div className="create-panel-header">
        <h3 className="create-panel-title">{mode === 'edit' ? translate('DETAIL') : translate('CREATE')}</h3>
        <div className="create-panel-actions">
          <button className="create-panel-btn" onClick={onToggleExpand} title={isExpanded ? translate("Thu nhỏ") : translate("Phóng to")}>
            {isExpanded ? (
              <ChevronLeftIcon width="16" height="16" />
            ) : (
              <ChevronRightIcon width="16" height="16" />
            )}
          </button>
          <button className="create-panel-btn create-panel-btn--close" onClick={onClose} title={translate("Đóng")}>
            <CloseFillIcon width="16" height="16" />
          </button>
        </div>
      </div>

      <div className="create-panel-tabs">
        {tabs.map((tab) => (
          <div 
            key={tab} 
            className={`create-panel-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {translate(tab)}
          </div>
        ))}
      </div>

      <div className="create-panel-content">
        {renderTabContent()}
      </div>

      <div className="create-panel-footer">
        <button className="create-panel-save-btn">
          <SaveIcon width="16" height="16" fill="currentColor" />
          {translate("Save")}
        </button>
      </div>
    </div>
  );
}
