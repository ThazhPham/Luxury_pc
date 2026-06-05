import React from 'react';
import { useAutoI18n } from "../../../i18n/useAutoI18n";
import CustomCombobox from "../../common/CustomCombobox";

export default function ProductionTab() {
  const { translate } = useAutoI18n();

  return (
    <div className="create-panel-form-grid">
      <div className="form-group">
        <div className="floating-input-wrapper">
          <input type="text" className="floating-input" placeholder=" " />
          <label className="floating-label">{translate("Routing")}</label>
        </div>
      </div>
      <div className="form-group">
        <CustomCombobox placeholder={translate("Default Barcode")} />
      </div>

      <div className="form-group span-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        
        {/* Process Detail Section */}
        <div className="sub-section">
          <div className="sub-section-header">
            <h4>{translate("PROCESS DETAIL")}</h4>
            <div className="sub-section-actions">
              <button className="circle-btn" title={translate("Add")}>+</button>
              <button className="circle-btn" title={translate("Delete")}>🗑</button>
            </div>
          </div>
          <div className="sub-section-table-wrap">
            <table className="sub-section-table">
              <thead>
                <tr>
                  <th>{translate("Process")}</th>
                  <th>{translate("Process C...")}</th>
                  <th>{translate("Process N...")}</th>
                  <th>{translate("Inspectio...")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="4" className="sub-section-nodata">{translate("noData")}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="sub-section-pagination">
            <div className="page-sizes">
              <span className="active">20</span><span>50</span><span>100</span><span>200</span><span>500</span><span>{translate("All")}</span>
            </div>
            <div className="page-nav">
              <span className="nav-arrow">‹</span>
              <span className="page-num active">1</span>
              <span className="nav-arrow">›</span>
            </div>
          </div>
        </div>

        {/* Inspection Section */}
        <div className="sub-section">
          <div className="sub-section-header">
            <h4>{translate("INSPECTION")}</h4>
          </div>
          <div className="sub-section-table-wrap">
            <table className="sub-section-table">
              <thead>
                <tr>
                  <th>{translate("Sort")}</th>
                  <th>{translate("Inspectio...")}</th>
                  <th>{translate("Inspectio...")}</th>
                  <th>{translate("Des...")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="4" className="sub-section-nodata">{translate("noData")}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="sub-section-pagination">
            <div className="page-sizes">
              <span className="active">20</span><span>50</span><span>100</span><span>200</span><span>500</span><span>{translate("All")}</span>
            </div>
            <div className="page-nav">
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
