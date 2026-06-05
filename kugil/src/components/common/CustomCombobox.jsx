import { useState, useRef, useEffect } from 'react';
import '../../css/CustomCombobox.css';

export default function CustomCombobox({ options = [], placeholder = '', onChange, value }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [value]);

  // Filter options based on input value
  const filteredOptions = options.filter(option => 
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsOpen(true);
    if (onChange) onChange(e.target.value);
  };

  const handleOptionClick = (option) => {
    setInputValue(option.label);
    setIsOpen(false);
    if (onChange) onChange(option.value);
  };

  return (
    <div className="custom-combobox" ref={wrapperRef}>
      <div className="custom-combobox__input-wrapper floating-input-wrapper">
        <input 
          type="text" 
          className="custom-combobox__input floating-input"
          placeholder=" "
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
        />
        <label className="floating-label">{placeholder}</label>
        <div className="custom-combobox__caret" onClick={() => setIsOpen(!isOpen)}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      {isOpen && filteredOptions.length > 0 && (
        <ul className="custom-combobox__dropdown">
          {filteredOptions.map((option, index) => (
            <li 
              key={index} 
              className="custom-combobox__option"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
