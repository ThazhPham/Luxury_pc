import React, { useState } from 'react';
import { useAutoI18n } from '../../i18n/useAutoI18n';
import { EyeIcon, EyeSlashIcon } from '../common/Icons';
import '../../css/UserModals.css';

export default function ChangePasswordModal({ isOpen, onClose }) {
  const { translate } = useAutoI18n();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Reset state when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setPassword('');
      setConfirmPassword('');
      setErrorMsg('');
    }
  }, [isOpen]);

  const MIN_CHARS = 6;
  const MAX_CHARS = 20;

  const isMinValid = password.length >= MIN_CHARS;
  const isMaxValid = password.length > 0 && password.length <= MAX_CHARS;

  const handleChange = () => {
    setErrorMsg('');
    if (!isMinValid || !isMaxValid) {
      setErrorMsg(`Password must be between ${MIN_CHARS} and ${MAX_CHARS} characters.`);
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    
    // Call API here...
    alert('Password changed successfully!');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="user-modal-overlay" onClick={onClose}>
      <div className="user-modal" onClick={e => e.stopPropagation()}>
        <div className="user-modal__header">
          <span>ChangePassword</span>
          <button className="user-modal__close" onClick={onClose}>✕</button>
        </div>
        <div className="user-modal__body">
          <div className="change-password-layout">
            
            {/* Left Column: Requirements */}
            <div className="change-password-layout__left">
              <div className="req-title">Password Requirements</div>
              <div className={`req-item ${isMinValid ? 'valid' : 'invalid'}`}>
                {isMinValid ? '✓' : '✕'} Min chars ({MIN_CHARS})
              </div>
              <div className={`req-item ${isMaxValid ? 'valid' : 'invalid'}`}>
                {isMaxValid ? '✓' : '✕'} Max chars ({MAX_CHARS})
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="change-password-layout__right">
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <label className="form-label" style={{ width: 120, marginBottom: 0 }}>
                  Password <span className="req">*</span>
                </label>
                <div className="input-with-icon" style={{ flex: 1 }}>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMsg('');
                    }}
                  />
                  <button type="button" className="input-icon-btn" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeIcon width={16} /> : <EyeSlashIcon width={16} />} 
                  </button>
                </div>
              </div>

              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <label className="form-label" style={{ width: 120, marginBottom: 0 }}>
                  ConfirmPassword <span className="req">*</span>
                </label>
                <div className="input-with-icon" style={{ flex: 1 }}>
                  <input 
                    type={showConfirm ? "text" : "password"} 
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setErrorMsg('');
                    }}
                  />
                  <button type="button" className="input-icon-btn" onClick={() => setShowConfirm(!showConfirm)}>
                     {showConfirm ? <EyeIcon width={16} /> : <EyeSlashIcon width={16} />} 
                  </button>
                </div>
              </div>

              {errorMsg && (
                <div style={{ color: '#e74c3c', fontSize: '12px', marginLeft: 130, marginBottom: 10 }}>
                  {errorMsg}
                </div>
              )}

              <button className="btn-change" style={{ marginLeft: 130 }} onClick={handleChange}>
                {translate('Change') || 'Change'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
