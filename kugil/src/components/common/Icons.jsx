import React from 'react';

export const CheckIcon = ({ className, width = 18, height = 18, fill = "none", stroke = "var(--primary-color)", strokeWidth = "3", strokeLinecap = "round", strokeLinejoin = "round", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" width={width} height={height} fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeLinejoin={strokeLinejoin} {...props}>
    <path d="M5 12l5 5L19 7" />
  </svg>
);

export const EditIcon = ({ className, width = 16, height = 16, fill = "var(--primary-color)", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" width={width} height={height} fill={fill} {...props}>
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1.001 1.001 0 0 0 0-1.41l-2.34-2.34a1.001 1.001 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
);


export const ImageIcon = ({ className, width = 20, height = 20, fill = "#ccc", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" width={width} height={height} fill={fill} {...props}>
    <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
  </svg>
);

export const GlobeIcon = ({ className, width = 14, height = 14, fill = "none", stroke = "currentColor", strokeWidth = "2", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" width={width} height={height} fill={fill} stroke={stroke} strokeWidth={strokeWidth} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export const UserCircleIcon = ({ className, width = 16, height = 16, fill = "currentColor", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" width={width} height={height} fill={fill} {...props}>
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
  </svg>
);

export const LogoutIcon = ({ className, width = 14, height = 14, fill = "currentColor", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" width={width} height={height} fill={fill} {...props}>
    <path d="M16 13v-2H7V8l-5 4 5 4v-3z" />
    <path d="M20 3h-9c-1.1 0-2 .9-2 2v4h2V5h9v14h-9v-4H9v4c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  </svg>
);

export const CloseIcon = ({ className, width = 14, height = 14, stroke = "currentColor", strokeWidth = "2.5", fill = "none", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" width={width} height={height} stroke={stroke} strokeWidth={strokeWidth} fill={fill} {...props}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export const CloseFillIcon = ({ className, width = 16, height = 16, fill = "currentColor", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" width={width} height={height} fill={fill} {...props}>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

export const PaletteIcon = ({ className, width = 16, height = 16, fill = "currentColor", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" width={width} height={height} fill={fill} {...props}>
    <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5S18.33 12 17.5 12z" />
  </svg>
);

export const FullscreenIcon = ({ className, width = 16, height = 16, fill = "currentColor", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" width={width} height={height} fill={fill} {...props}>
    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
  </svg>
);

export const ChevronDownIcon = ({ className, width = 14, height = 14, stroke = "currentColor", strokeWidth = "2.5", fill = "none", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" width={width} height={height} stroke={stroke} strokeWidth={strokeWidth} fill={fill} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const ChevronLeftIcon = ({ className, width = 16, height = 16, fill = "currentColor", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" width={width} height={height} fill={fill} {...props}>
    <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
  </svg>
);

export const ChevronRightIcon = ({ className, width = 16, height = 16, fill = "currentColor", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" width={width} height={height} fill={fill} {...props}>
    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
  </svg>
);

export const SearchIcon = ({ className, width = 14, height = 14, fill = "currentColor", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" width={width} height={height} fill={fill} {...props}>
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

export const CalendarIcon = ({ className, width = 14, height = 14, fill = "currentColor", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" width={width} height={height} fill={fill} {...props}>
    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
  </svg>
);

export const CheckMarkLineIcon = ({ className, width = 24, height = 24, stroke = "currentColor", strokeWidth = "2", fill = "none", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" width={width} height={height} stroke={stroke} strokeWidth={strokeWidth} fill={fill} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

export const SaveIcon = ({ className, width = 16, height = 16, fill = "currentColor", ...props }) => (
  <svg className={className} viewBox="0 0 24 24" width={width} height={height} fill={fill} {...props}>
    <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
  </svg>
);
// CheckIcon → ✔ Check / Success
// EditIcon → ✏ Edit / Pencil
// ImageIcon → 🖼 Image / Gallery
// GlobeIcon → 🌐 Globe / Language
// UserCircleIcon → 👤 User / Profile
// LogoutIcon → 🚪 Logout / Sign out
// CloseIcon → ❌ Close outline
// CloseFillIcon → ✖ Close fill
// PaletteIcon → 🎨 Palette / Theme
// FullscreenIcon → ⛶ Fullscreen
// ChevronDownIcon → ⌄ Dropdown arrow
// ChevronLeftIcon → ◀ Left arrow
// ChevronRightIcon → ▶ Right arrow
// SearchIcon → 🔍 Search
// CalendarIcon → 📅 Calendar / Date
// CheckMarkLineIcon → ✔ Check line
// SaveIcon → 💾 Save
// MenuIcon1 → ⏸ Dashboard / Pause style
// MenuIcon2 → 📋 List / Menu
// MenuIcon3 → 🕒 Clock / History
// MenuIconB → 📑 Sidebar / List menu
// MenuIconP → 👤 Profile / User card
// MenuIconV → 📦 Inventory / Box
// MenuIconD → 🚚 Delivery / Truck
// MenuIconQ → ✔ Confirm / Done
// MenuIconE → 🔧 Tool / Wrench
// MenuIconC → ⚙ Settings / Gear
export const KeyIcon = ({ className, width = 16, height = 16, fill = "currentColor", ...props }) => (<svg 
className={className} viewBox="0 0 24 24" fill={fill} width={width} height={height} {...props}><path d="M22.7 
19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 
9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>);
export const SettingsIcon = ({ className, width = 16, height = 16, fill = "currentColor", ...props }) => (<svg 
className={className} viewBox="0 0 24 24" fill={fill} width={width} height={height} {...props}><path d="M19.14 
12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 
0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 
2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 
1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 
1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 
1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 
0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>);

export const EyeIcon = ({ className, width = 16, height = 16, fill = "currentColor", ...props }) => (<svg 
className={className} viewBox="0 0 24 24" fill={fill} width={width} height={height} {...props}><path d="M12 
4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 
17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 
3-3-1.34-3-3-3z"/></svg>);

export const EyeSlashIcon = ({ className, width = 16, height = 16, fill = "currentColor", ...props }) => (<svg 
className={className} viewBox="0 0 24 24" fill={fill} width={width} height={height} {...props}><path d="M12 
7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 
0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 
11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 
1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 
3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/></svg>);

export const MenuIcon1 = ({ className, width = 18, height = 18, fill = "currentColor", ...props }) => (<svg className={className} viewBox="0 0 24 24" fill={fill} width={width} height={height} {...props}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>);
export const MenuIcon2 = ({ className, width = 18, height = 18, fill = "currentColor", ...props }) => (<svg className={className} viewBox="0 0 24 24" fill={fill} width={width} height={height} {...props}><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>);
export const MenuIcon3 = ({ className, width = 18, height = 18, fill = "currentColor", ...props }) => (<svg className={className} viewBox="0 0 24 24" fill={fill} width={width} height={height} {...props}><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zm1-11h-2v5l4.28 2.54.72-1.21-3-1.78V8z"/></svg>);
export const MenuIconB = ({ className, width = 18, height = 18, fill = "currentColor", ...props }) => (<svg className={className} viewBox="0 0 24 24" fill={fill} width={width} height={height} {...props}><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>);
export const MenuIconP = ({ className, width = 18, height = 18, fill = "currentColor", ...props }) => (<svg className={className} viewBox="0 0 24 24" fill={fill} width={width} height={height} {...props}><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/></svg>);
export const MenuIconV = ({ className, width = 18, height = 18, fill = "currentColor", ...props }) => (<svg className={className} viewBox="0 0 24 24" fill={fill} width={width} height={height} {...props}><path d="M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2zm-5 12H9v-2h6v2zm5-7H4V4h16v3z"/></svg>);
export const MenuIconD = ({ className, width = 18, height = 18, fill = "currentColor", ...props }) => (<svg className={className} viewBox="0 0 24 24" fill={fill} width={width} height={height} {...props}><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9 1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>);
export const MenuIconQ = ({ className, width = 18, height = 18, fill = "currentColor", ...props }) => (<svg className={className} viewBox="0 0 24 24" fill={fill} width={width} height={height} {...props}><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>);
export const MenuIconE = ({ className, width = 18, height = 18, fill = "currentColor", ...props }) => (<svg className={className} viewBox="0 0 24 24" fill={fill} width={width} height={height} {...props}><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/></svg>);
export const MenuIconC = ({ className, width = 18, height = 18, fill = "currentColor", ...props }) => (<svg className={className} viewBox="0 0 24 24" fill={fill} width={width} height={height} {...props}><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>);
