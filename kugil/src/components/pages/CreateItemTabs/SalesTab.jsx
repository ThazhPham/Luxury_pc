import React from 'react';
import { useAutoI18n } from "../../../i18n/useAutoI18n";
import CustomCombobox from "../../common/CustomCombobox";

export default function SalesTab() {
  const { translate } = useAutoI18n();

  return (
    <div className="create-panel-form-grid">
      <div className="form-group">
        <div className="floating-input-wrapper">
          <input type="text" className="floating-input" placeholder=" " />
          <label className="floating-label">{translate("Weight")}</label>
        </div>
      </div>
      <div className="form-group">
        <CustomCombobox placeholder={translate("Unit")} />
      </div>

      <div className="form-group">
        <div className="floating-input-wrapper">
          <input type="text" className="floating-input" placeholder=" " />
          <label className="floating-label">{translate("Width")}</label>
        </div>
      </div>
      <div className="form-group">
        <CustomCombobox placeholder={translate("Unit")} />
      </div>

      <div className="form-group">
        <div className="floating-input-wrapper">
          <input type="text" className="floating-input" placeholder=" " />
          <label className="floating-label">{translate("Length")}</label>
        </div>
      </div>
      <div className="form-group">
        <CustomCombobox placeholder={translate("Unit")} />
      </div>

      <div className="form-group">
        <div className="floating-input-wrapper">
          <input type="text" className="floating-input" placeholder=" " />
          <label className="floating-label">{translate("Height")}</label>
        </div>
      </div>
      <div className="form-group">
        <CustomCombobox placeholder={translate("Unit")} />
      </div>
    </div>
  );
}
