import React from 'react';
import '../../css/FilterPopup.css';
import CustomCombobox from './CustomCombobox';
import { useAutoI18n } from '../../i18n/useAutoI18n';

export default function FilterPopup({ isOpen, onClose, fields = [], filterValues = {}, onFilterChange, onSearch }) {
  const { translate } = useAutoI18n();
  if (!isOpen) return null;

  return (
    <div className="filter-anchor">

  {/* POPUP */}
  {isOpen && (
    <div className="filter-popup">

      <div className="filter-popup__header">
        <button
          className="filter-popup__close"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <div className="filter-popup__body">
        {fields.map((field, idx) => (
          <div className="filter-row" key={idx}>

            <div className="filter-input-wrap">

              {field.type === "select" || field.type === "combobox" ? (
                <CustomCombobox
                  options={field.options || []}
                  placeholder={field.placeholder}
                  value={filterValues[field.name || field.placeholder] || ''}
                  onChange={(val) => onFilterChange(field.name || field.placeholder, val)}
                />
              ) : (
                <div className="floating-input-wrapper">
                  <input
                    type="text"
                    className="floating-input"
                    placeholder=" "
                    value={filterValues[field.name || field.placeholder] || ''}
                    onChange={(e) => onFilterChange(field.name || field.placeholder, e.target.value)}
                  />

                  <label className="floating-label">
                    {field.placeholder}
                  </label>
                </div>
              )}

            </div>

            <div
              className="filter-type-box"
              tabIndex="0"
            >
              <span className="filter-type-box__legend">{translate("Filter Type")}</span>

              <span className="filter-type-box__val">
                {field.filterType || translate("Contains")}
              </span>

              <div className="filter-type-box__actions">
                <span>✕</span>
                <span>▾</span>
              </div>
            </div>

          </div>
        ))}
      </div>

      <div className="filter-popup__footer">
        <button className="filter-search-btn" onClick={onSearch}>{translate("Search Condition")}</button>
      </div>

    </div>
  )}

</div>
  );
}
