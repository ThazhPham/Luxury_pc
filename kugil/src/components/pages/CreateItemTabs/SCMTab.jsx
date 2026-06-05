import React from 'react';
import { SearchIcon, CheckMarkLineIcon, ImageIcon } from "../../common/Icons";
import { useAutoI18n } from "../../../i18n/useAutoI18n";
import CustomCombobox from "../../common/CustomCombobox";

export default function SCMTab() {
  const { translate } = useAutoI18n();

  return (
    <div className="create-panel-form-grid">
      {/* Row 1 */}
      <div className="form-group">
        <CustomCombobox placeholder={translate("Unit Weight")} />
      </div>
      <div className="form-group">
        <CustomCombobox placeholder={translate("Inner Pack Qty")} />
      </div>

      {/* Row 2 */}
      <div className="form-group">
        <CustomCombobox placeholder={translate("Outer Pack Qty")} />
      </div>
      <div className="form-group">
        <CustomCombobox placeholder={translate("Qty per Carton")} />
      </div>

      {/* Row 3 */}
      <div className="form-group">
        <CustomCombobox placeholder={translate("Boxes per Pallet")} />
      </div>
      <div className="form-group">
        <div className="floating-input-wrapper">
          <input type="text" className="floating-input" placeholder=" " />
          <label className="floating-label">{translate("Box Size")}</label>
        </div>
      </div>

      {/* Row 4 */}
      <div className="form-group">
        <div className="floating-input-wrapper">
          <input type="text" className="floating-input" placeholder=" " />
          <label className="floating-label">{translate("Packaging Method")}</label>
        </div>
      </div>
      <div className="form-checkbox-group" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginTop: '0', marginBottom: '0' }}>
        <label className="form-checkbox">
          <input type="checkbox" />
          <div className="form-checkbox-box"><CheckMarkLineIcon /></div>
          {translate("Incoming Inspection")}
        </label>
        <label className="form-checkbox">
          <input type="checkbox" />
          <div className="form-checkbox-box"><CheckMarkLineIcon /></div>
          {translate("Outgoing Inspection")}
        </label>
        <label className="form-checkbox">
          <input type="checkbox" />
          <div className="form-checkbox-box"><CheckMarkLineIcon /></div>
          {translate("VINA Production")}
        </label>
      </div>

      {/* Row 5 */}
      <div className="form-group">
        <CustomCombobox placeholder={translate("Coating Method")} />
      </div>
      <div className="form-group">
        <CustomCombobox placeholder={translate("Gloss Method")} />
      </div>

      {/* Row 6 */}
      <div className="form-group">
        <CustomCombobox placeholder={translate("Printing Technique")} />
      </div>
      <div className="form-group">
        <CustomCombobox placeholder={translate("Number of Colors")} />
      </div>

      {/* Row 7 */}
      <div className="form-group">
        <CustomCombobox placeholder={"☒ " + translate("Color")} />
      </div>
      <div className="form-group">
        <CustomCombobox placeholder={translate("Cavity")} />
      </div>

      {/* Row 8 */}
      <div className="form-group">
        <div className="floating-input-wrapper">
          <input type="text" className="floating-input" placeholder=" " />
          <label className="floating-label">{translate("Customer PIC")}</label>
        </div>
      </div>
      <div className="form-group">
        <div className="floating-input-wrapper">
          <input type="text" className="floating-input" placeholder=" " />
          <label className="floating-label">{translate("Customer Phone")}</label>
        </div>
      </div>

      {/* Row 9 */}
      <div className="form-group">
        <div className="floating-input-wrapper">
          <input type="text" className="floating-input" placeholder=" " />
          <label className="floating-label">{translate("Remarks")}</label>
        </div>
      </div>
      <div className="form-group">
        <CustomCombobox placeholder={translate("Purchase Unit Name")} />
      </div>

      {/* Row 10 */}
      <div className="form-group">
        <CustomCombobox placeholder={translate("Sales Unit Name")} />
      </div>
      <div className="form-group">
        <CustomCombobox placeholder={translate("Inventory Unit") + " *"} />
      </div>

      {/* Row 11 */}
      <div className="form-group form-work-center">
        <div className="floating-input-wrapper" style={{ flex: 1 }}>
          <input type="text" className="floating-input" placeholder=" " />
          <label className="floating-label">{translate("Default Warehouse")} *</label>
          <SearchIcon className="form-work-center-search-icon" width="14" height="14" fill="currentColor" style={{ top: '50%', transform: 'translateY(-50%)' }} />
        </div>
        <div className="form-input-disabled"></div>
      </div>
      <div className="form-group">
        {/* Empty to match grid */}
      </div>

      {/* Photo Section */}
      <div className="span-2">
        <h4 style={{ margin: '10px 0', fontSize: '15px', color: '#444' }}>{translate("Photo")}</h4>
        <div className="photo-upload-grid">
          <div className="photo-upload-box dropzone">
            <div className="photo-upload-icon" style={{ background: '#e6f0ff', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
              <ImageIcon width="24" height="24" fill="#3b82f6" />
            </div>
            <p className="photo-upload-text">
              {translate("Drop images here or")} <span style={{color: '#3b82f6', cursor: 'pointer'}}>{translate("click")}</span>
            </p>
            <p className="photo-upload-subtext">
              {translate("Supports JPEG, PNG, JPG and all sizes.")}
            </p>
          </div>
          
          <div className="photo-upload-box dropzone-small">
            <span style={{ fontSize: '24px', color: '#ccc' }}>+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
