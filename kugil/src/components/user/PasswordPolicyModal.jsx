import React, { useState, useEffect } from 'react';
import { useAutoI18n } from '../../i18n/useAutoI18n';
import '../../css/UserModals.css';

export default function PasswordPolicyModal({ isOpen, onClose }) {
  const { translate } = useAutoI18n();

  const [reqs, setReqs] = useState({
    upper: true,
    lower: true,
    number: true,
    special: true
  });

  useEffect(() => {
    if (isOpen) {
      const saved = localStorage.getItem('passwordPolicyReqs');
      if (saved) {
        try {
          setReqs(JSON.parse(saved));
        } catch(e) {}
      }
    }
  }, [isOpen]);

  const handleToggle = (key) => {
    setReqs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    localStorage.setItem('passwordPolicyReqs', JSON.stringify(reqs));
    alert(translate('Saved successfully') || 'Saved successfully');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="user-modal-overlay" onClick={onClose}>
      <div className="user-modal user-modal--policy" onClick={e => e.stopPropagation()}>
        
        <div className="user-modal__header">
          <span>PasswordPolicySettings</span>
          <button className="user-modal__close" onClick={onClose}>✕</button>
        </div>

        <div className="user-modal__body">
          <div className="policy-form-group">
            <label className="form-label">PasswordDuration</label>
            <input type="text" />
          </div>
          <div className="policy-form-group">
            <label className="form-label">MinimumLength</label>
            <input type="text" />
          </div>
          <div className="policy-form-group">
            <label className="form-label">MaximumLength</label>
            <input type="text" />
          </div>
          <div className="policy-form-group">
            <label className="form-label">MaxFailedLogins</label>
            <input type="text" />
          </div>

          <div className="policy-reqs">
            <div className="policy-reqs__title">Requirements</div>
            <label className="policy-checkbox">
              <input 
                type="checkbox" 
                checked={reqs.upper} 
                onChange={() => handleToggle('upper')} 
              />
              Uppercase (A-Z)
            </label>
            <label className="policy-checkbox">
              <input 
                type="checkbox" 
                checked={reqs.lower} 
                onChange={() => handleToggle('lower')} 
              />
              Lowercase (a-z)
            </label>
            <label className="policy-checkbox">
              <input 
                type="checkbox" 
                checked={reqs.number} 
                onChange={() => handleToggle('number')} 
              />
              Number (0-9)
            </label>
            <label className="policy-checkbox">
              <input 
                type="checkbox"  
                checked={reqs.special} 
                onChange={() => handleToggle('special')} 
              />
              Special char (!@#$...)
            </label>
          </div>
        </div>

        <div className="user-modal__footer">
          <button className="btn-cancel" onClick={onClose}>{translate('Cancel') || 'Cancel'}</button>
          <button className="btn-save" onClick={handleSave}>{translate('Save') || 'lưu' || '저장'}</button>
        </div>

      </div>
    </div>
  );
}
