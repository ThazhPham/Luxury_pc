import React from 'react';
import { SearchIcon } from "../../common/Icons";
import { useAutoI18n } from "../../../i18n/useAutoI18n";
import CustomCombobox from "../../common/CustomCombobox";

export default function PurchasingTab() {
  const { translate } = useAutoI18n();

  return (
    <div className="create-panel-form-grid">
      <div className="form-group">
        <div className="floating-input-wrapper">
          <input type="text" className="floating-input" placeholder=" " />
          <label className="floating-label">{translate("Purchase Qty Per Unit")}</label>
        </div>
      </div>
      <div className="form-group">
        <div className="floating-input-wrapper">
          <input type="text" className="floating-input" placeholder=" " />
          <label className="floating-label">{translate("Purchase Quantity Per Pack")}</label>
        </div>
      </div>

      <div className="form-group form-work-center">
        <div className="floating-input-wrapper" style={{ flex: 1 }}>
          <input type="text" className="floating-input" placeholder=" " />
          <label className="floating-label">{translate("Vendor")}</label>
          <SearchIcon className="form-work-center-search-icon" width="14" height="14" fill="currentColor" style={{ top: '50%', transform: 'translateY(-50%)' }} />
        </div>
        <div className="form-input-disabled"></div>
      </div>
      <div className="form-group">
        <div className="floating-input-wrapper">
          <input type="text" className="floating-input" placeholder=" " />
          <label className="floating-label">{translate("Lead Time")}</label>
        </div>
      </div>

      <div className="form-group">
        <div className="floating-input-wrapper">
          <input type="text" className="floating-input" placeholder=" " />
          <label className="floating-label">{translate("MOQ")}</label>
        </div>
      </div>
      <div></div>

      <div className="form-group span-2">
        <div className="sub-section">
          <div className="sub-section-header">
            <h4>{translate("LIST FILES")}</h4>
            <div className="sub-section-actions">
              <button className="circle-btn" title={translate("Attach")}>📎</button>
              <button className="circle-btn" title={translate("Delete")}>🗑</button>
            </div>
          </div>
          <div className="sub-section-table-wrap">
            <table className="sub-section-table">
              <thead>
                <tr>
                  <th style={{width: '60px'}}>{translate("No.")}</th>
                  <th>{translate("File")}</th>
                  <th>{translate("Length")}</th>
                  <th>{translate("Description")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="4" className="sub-section-nodata" style={{height: '150px'}}>{translate("noData")}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="sub-section-pagination" style={{justifyContent: 'space-between', padding: '10px 0'}}>
            <div className="page-sizes">
              <span className="active">20</span><span>50</span><span>100</span><span>200</span><span>500</span><span>{translate("All")}</span>
            </div>
            <div className="page-nav">
              <span style={{marginRight: '10px', color: '#888'}}>{translate("page #1. total: 1 (0 items)")}</span>
              <span className="nav-arrow">‹</span>
              <span className="page-num active">1</span>
              <span className="nav-arrow">›</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
