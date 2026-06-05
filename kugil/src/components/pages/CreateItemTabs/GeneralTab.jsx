import React from 'react';
import { SearchIcon, CheckMarkLineIcon, CalendarIcon } from "../../common/Icons";
import { useAutoI18n } from "../../../i18n/useAutoI18n";
import CustomCombobox from "../../common/CustomCombobox";

export default function GeneralTab({ initialData }) {
  const { translate } = useAutoI18n();

  return (
    <div className="create-panel-form-grid">
      <div className="form-group">
        <div className="floating-input-wrapper">
          <input type="text" className="floating-input" placeholder=" " defaultValue={initialData?.ItemCode || ''} />
          <label className="floating-label">{translate("Item")} *</label>
        </div>
      </div>
      <div className="form-group">
        <div className="floating-input-wrapper">
          <input type="text" className="floating-input" placeholder=" " defaultValue={initialData?.ItemName || initialData?.name || ''} />
          <label className="floating-label">{translate("Item Name")} *</label>
        </div>
      </div>

      <div className="form-group">
        <CustomCombobox placeholder={translate("ItemsGroupCode") + " *"} />
      </div>
      <div className="form-group">
        <CustomCombobox placeholder={translate("Manufacturer(OEM)")} />
      </div>

      <div className="form-group form-work-center">
        <div className="floating-input-wrapper" style={{ flex: 1 }}>
          <input type="text" className="floating-input" placeholder=" " defaultValue={initialData?.WorkCenter || ''} />
          <label className="floating-label">{translate("Work Center")} *</label>
          <SearchIcon className="form-work-center-search-icon" width="14" height="14" fill="currentColor" style={{ top: '50%', transform: 'translateY(-50%)' }} />
        </div>
        <div className="form-input-disabled"></div>
      </div>
      
      <div className="form-group">
        <CustomCombobox placeholder={translate("Item Class 1")} />
      </div>
      <div className="form-group">
        <CustomCombobox placeholder={translate("Item Class 2")} />
      </div>
      <div className="form-group">
        <CustomCombobox placeholder={translate("Item Class 3")} />
      </div>
      <div className="form-group">
        <CustomCombobox placeholder={translate("Item Class 4")} />
      </div>
      <div className="form-group">
        <CustomCombobox placeholder={translate("Item Class 5")} />
      </div>

      <div className="form-checkbox-group" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <label className="form-checkbox">
          <input type="checkbox" />
          <div className="form-checkbox-box"><CheckMarkLineIcon /></div>
          {translate("Purchase Item")}
        </label>
        <label className="form-checkbox">
          <input type="checkbox" defaultChecked />
          <div className="form-checkbox-box"><CheckMarkLineIcon /></div>
          {translate("Inventory (Y/N)")}
        </label>
        <label className="form-checkbox">
          <input type="checkbox" />
          <div className="form-checkbox-box"><CheckMarkLineIcon /></div>
          {translate("Sale Item")}
        </label>
        <label className="form-checkbox">
          <input type="checkbox" />
          <div className="form-checkbox-box"><CheckMarkLineIcon /></div>
          {translate("Manage Batch")}
        </label>

        <label className="form-checkbox">
          <input type="checkbox" />
          <div className="form-checkbox-box"><CheckMarkLineIcon /></div>
          {translate("Manage Serial")}
        </label>
        <label className="form-checkbox">
          <input type="checkbox" defaultChecked />
          <div className="form-checkbox-box"><CheckMarkLineIcon /></div>
          {translate("Active")}
        </label>
      </div>

      <div className="form-group">
        <div className="floating-input-wrapper">
          <input type="text" className="floating-input" placeholder=" " />
          <label className="floating-label">{translate("Using From")}</label>
          <CalendarIcon className="form-date-icon" width="14" height="14" fill="currentColor" style={{ top: '50%', transform: 'translateY(-50%)' }} />
        </div>
      </div>
      <div className="form-group">
        <div className="floating-input-wrapper">
          <input type="text" className="floating-input" placeholder=" " />
          <label className="floating-label">{translate("Using To")}</label>
        </div>
      </div>

      <div className="form-group">
        <div className="floating-input-wrapper">
          <input type="text" className="floating-input" placeholder=" " disabled defaultValue={initialData?.CreateDate || ''} />
          <label className="floating-label">{translate("Create Date")}</label>
        </div>
      </div>
      <div className="form-group">
        <div className="floating-input-wrapper">
          <input type="text" className="floating-input" placeholder=" " disabled defaultValue={initialData?.LastUpdatedDate || ''} />
          <label className="floating-label">{translate("Last Updated Date")}</label>
        </div>
      </div>
    </div>
  );
}
