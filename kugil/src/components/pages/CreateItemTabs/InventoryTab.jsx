import React from 'react';
import { useAutoI18n } from "../../../i18n/useAutoI18n";
import CustomCombobox from "../../common/CustomCombobox";

export default function InventoryTab() {
  const { translate } = useAutoI18n();

  return (
    <div className="create-panel-form-grid">
      <div className="form-group">
        <div className="floating-input-wrapper">
          <input type="text" className="floating-input" placeholder=" " />
          <label className="floating-label">{translate("Safety Stock")}</label>
        </div>
      </div>
      <div className="form-group">
        <div className="floating-input-wrapper">
          <input type="text" className="floating-input" placeholder=" " />
          <label className="floating-label">{translate("Max Inventory Qty")}</label>
        </div>
      </div>

      <div className="form-group">
        <CustomCombobox placeholder={translate("Valuation Method")} />
      </div>
      <div className="form-group">
        <div className="floating-input-wrapper">
          <input type="text" className="floating-input" placeholder=" " />
          <label className="floating-label">{translate("Temporary Unit Price")}</label>
        </div>
      </div>

      <div className="form-group">
        <div className="floating-input-wrapper">
          <input type="text" className="floating-input" placeholder=" " />
          <label className="floating-label">{translate("Price Per Unit")}</label>
        </div>
      </div>
      <div className="form-group">
        <CustomCombobox placeholder={translate("Currency")} />
      </div>
    </div>
  );
}
